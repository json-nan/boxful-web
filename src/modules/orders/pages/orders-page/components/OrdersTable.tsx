"use client";

import { Button, DatePicker, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { Order, useGetOrders } from "../../../_api/orders";

const { RangePicker } = DatePicker;

export default function OrdersTable() {
  const [dateFrom, setDateFrom] = useQueryState("date_from");
  const [dateTo, setDateTo] = useQueryState("date_to");

  useEffect(() => {
    if (!dateFrom && !dateTo) {
      const today = dayjs();
      const thirtyDaysAgo = today.subtract(30, "day");
      setDateFrom(thirtyDaysAgo.format("YYYY-MM-DD"));
      setDateTo(today.format("YYYY-MM-DD"));
    }
  }, [dateFrom, dateTo, setDateFrom, setDateTo]);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetOrders({
    date_from: dateFrom || undefined,
    date_to: dateTo || undefined,
  });

  const columns: ColumnsType<Order> = [
    {
      title: "No. de orden",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => <span>{text.slice(-6)}</span>,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellidos",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Departamento",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Municipio",
      dataIndex: "municipality",
      key: "municipality",
    },
    {
      title: "Paquetes en orden",
      dataIndex: "items",
      key: "items",
      render: (items: Order["items"]) => (
        <span style={{ color: "#52c41a", fontWeight: "bold" }}>
          {items.length}
        </span>
      ),
    },
  ];

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null
  ) => {
    if (dates && dates[0] && dates[1]) {
      setDateFrom(dates[0].format("YYYY-MM-DD"));
      setDateTo(dates[1].format("YYYY-MM-DD"));
    } else {
      setDateFrom(null);
      setDateTo(null);
    }
  };

  const handleSearch = () => {
    refetch();
  };

  const handleDownload = () => {
    console.log("Download orders");
  };

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <RangePicker
          placeholder={["Fecha inicio", "Fecha fin"]}
          style={{ width: "250px" }}
          value={[
            dateFrom ? dayjs(dateFrom) : null,
            dateTo ? dayjs(dateTo) : null,
          ]}
          onChange={handleDateRangeChange}
        />
        <Button type="primary" onClick={handleSearch}>
          Buscar
        </Button>
        <Button onClick={handleDownload}>Descargar órdenes</Button>
      </div>

      <Table
        columns={columns}
        dataSource={orders}
        loading={isLoading}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
}
