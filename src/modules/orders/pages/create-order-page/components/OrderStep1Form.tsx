"use client";

import { PhoneCodes } from "@/catalogues/PhoneCodes";
import { OrderFormStep1Data } from "@/modules/orders/types/order";
import { ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const phoneCodeOptions = Object.entries(PhoneCodes).map(([key, value]) => ({
  value: key,
  label: value,
}));

interface OrderStep1FormProps {
  initialData?: OrderFormStep1Data | null;
  onComplete: (data: OrderFormStep1Data) => void;
}

export default function OrderStep1Form({
  initialData,
  onComplete,
}: OrderStep1FormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formData: OrderFormStep1Data = {
      pickup_address: values.pickup_address,
      programmed_date: values.programmed_date?.format("YYYY-MM-DDTHH:mm:ss[Z]"),
      name: values.name,
      last_name: values.last_name,
      email: values.email,
      phone: `+${values.phone_code} ${values.phone}`,
      deliver_address: values.deliver_address,
      city: values.city,
      municipality: values.municipality,
      reference_place: values.reference_place,
      indications: values.indications,
    };

    onComplete(formData);
  };

  const initialValues = initialData
    ? {
        pickup_address: initialData.pickup_address,
        programmed_date: initialData.programmed_date
          ? dayjs(initialData.programmed_date)
          : undefined,
        name: initialData.name,
        last_name: initialData.last_name,
        email: initialData.email,
        phone_code: initialData.phone?.split(" ")[0]?.replace("+", "") || "503",
        phone: initialData.phone?.split(" ").slice(1).join(" ") || "",
        deliver_address: initialData.deliver_address,
        city: initialData.city,
        municipality: initialData.municipality,
        reference_place: initialData.reference_place,
        indications: initialData.indications,
      }
    : {
        pickup_address: "Colonia Las Magnolias, calle militar 1, San Salvador",
        name: "Gabriela Reneé",
        last_name: "Días López",
        email: "gabbydiaz@gmail.com",
        phone_code: "503",
        phone: "7777 7777",
        deliver_address:
          "Final 49 Av. Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador",
        city: "San Salvador",
        municipality: "San Salvador",
        reference_place: "Cerca de redondel Arbol de la Paz",
        indications: "Llamar antes de entregar",
      };

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #ededed",
        borderRadius: 12,
        padding: 32,
      }}
    >
      <Title
        level={4}
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#16163d",
          marginBottom: 40,
        }}
      >
        Completa los datos
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        style={{ width: "100%" }}
      >
        {/* First Row: Pickup Address and Scheduled Date */}
        <Row gutter={20}>
          <Col flex="auto">
            <Form.Item
              name="pickup_address"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Dirección de recolección
                </Text>
              }
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Dirección de recolección"
              />
            </Form.Item>
          </Col>
          <Col style={{ width: 313.33 }}>
            <Form.Item
              name="programmed_date"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Fecha programada
                </Text>
              }
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <DatePicker
                style={{ height: 48, width: "100%" }}
                format="DD/MM/YYYY"
                suffixIcon={<CalendarOutlined />}
                placeholder="Seleccionar fecha"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Second Row: Names, Last Name, Email */}
        <Row gutter={20}>
          <Col flex={1}>
            <Form.Item
              name="name"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Nombres
                </Text>
              }
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Nombres"
              />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="last_name"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Apellidos
                </Text>
              }
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Apellidos"
              />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="email"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Correo electrónico
                </Text>
              }
              rules={[
                { required: true, message: "Campo requerido" },
                { type: "email", message: "Email inválido" },
              ]}
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Correo electrónico"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Third Row: Phone and Delivery Address */}
        <Row gutter={20}>
          <Col style={{ width: 313.33 }}>
            <Form.Item
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Teléfono
                </Text>
              }
            >
              <Input.Group compact>
                <Form.Item name="phone_code" noStyle>
                  <Select
                    style={{
                      width: 80,
                      height: 48,
                      backgroundColor: "#f8f9fa",
                    }}
                    options={phoneCodeOptions}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  noStyle
                  rules={[{ required: true, message: "Campo requerido" }]}
                >
                  <Input
                    style={{
                      width: "calc(100% - 80px)",
                      height: 48,
                      fontSize: 14,
                    }}
                    placeholder="Número de teléfono"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              name="deliver_address"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Dirección del destinatario
                </Text>
              }
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Dirección del destinatario"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Fourth Row: City, Municipality, Reference Point */}
        <Row gutter={20}>
          <Col flex={1}>
            <Form.Item
              name="city"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Ciudad
                </Text>
              }
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Ciudad"
              />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="municipality"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Municipio
                </Text>
              }
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Municipio"
              />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              name="reference_place"
              label={
                <Text
                  style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}
                >
                  Punto de referencia
                </Text>
              }
            >
              <Input
                style={{ height: 48, fontSize: 14 }}
                placeholder="Punto de referencia"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Fifth Row: Instructions */}
        <Form.Item
          name="indications"
          label={
            <Text style={{ fontSize: 12, fontWeight: 600, color: "#050817" }}>
              Indicaciones
            </Text>
          }
        >
          <Input
            style={{ height: 48, fontSize: 14 }}
            placeholder="Indicaciones"
          />
        </Form.Item>

        {/* Submit Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 24,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#2e49ce",
              borderColor: "#2e49ce",
              height: 47,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 8,
              paddingLeft: 12,
              paddingRight: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Siguiente
            <ArrowRightOutlined />
          </Button>
        </div>
      </Form>
    </div>
  );
}
