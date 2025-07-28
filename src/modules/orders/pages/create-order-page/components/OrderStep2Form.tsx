"use client";

import { Package } from "@/components/svg";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useOrderFormStore } from "../../../stores/useOrderFormStore";
import { OrderFormStep2Data, OrderItem } from "../../../types/order";

const { Title, Text } = Typography;

interface OrderStep2FormProps {
  onComplete: (data: OrderFormStep2Data) => void;
}

export default function OrderStep2Form({ onComplete }: OrderStep2FormProps) {
  const [addForm] = Form.useForm();
  const { step2Data, setStep2Data, goToPreviousStep } = useOrderFormStore();
  const [items, setItems] = useState<OrderItem[]>(step2Data?.items || []);

  useEffect(() => {
    if (step2Data?.items && step2Data.items.length > 0) {
      setItems(step2Data.items);
    }
  }, [step2Data]);

  useEffect(() => {
    setStep2Data({ items });
  }, [items, setStep2Data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddItem = (values: any) => {
    const newItem: OrderItem = {
      width: values.width,
      height: values.height,
      length: values.length,
      weight: values.weight,
      content: values.content,
    };

    setItems([...items, newItem]);
    addForm.resetFields();
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = () => {
    onComplete({ items });
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  return (
    <Card
      style={{ border: "1px solid #ededed", borderRadius: 12 }}
      styles={{ body: { padding: 32 } }}
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
        Agrega tus productos
      </Title>

      {/* Add Item Form */}
      <Card
        style={{
          background: "#f8f9fa",
          border: "none",
          borderRadius: 12,
          marginBottom: 24,
        }}
        styles={{ body: { padding: 20 } }}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddItem}
          initialValues={{}}
        >
          <Row gutter={20} align="bottom">
            {/* Package Icon and Dimensions */}
            <Col>
              <Flex align="center" gap={24}>
                <Package />

                <Space.Compact size="large">
                  <Form.Item
                    name="length"
                    label={"Largo"}
                    rules={[{ required: true, message: "Requerido" }]}
                  >
                    <InputNumber
                      suffix="cm"
                      controls={false}
                      style={{ height: 48 }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="height"
                    label={"Alto"}
                    rules={[{ required: true, message: "Requerido" }]}
                  >
                    <InputNumber
                      suffix="cm"
                      controls={false}
                      style={{ height: 48 }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="width"
                    label={"Ancho"}
                    rules={[{ required: true, message: "Requerido" }]}
                  >
                    <InputNumber
                      suffix="cm"
                      controls={false}
                      style={{ height: 48 }}
                    />
                  </Form.Item>
                </Space.Compact>
              </Flex>
            </Col>

            <Col>
              <Space.Compact size="large">
                <Form.Item
                  name="weight"
                  label={"Peso"}
                  rules={[{ required: true, message: "Requerido" }]}
                >
                  <InputNumber
                    suffix="libras"
                    controls={false}
                    style={{ height: 48 }}
                  />
                </Form.Item>
              </Space.Compact>
            </Col>

            {/* Content */}
            <Col flex="auto">
              <Space.Compact size="large" style={{ width: "100%" }}>
                <Form.Item
                  name="content"
                  label={"Contenido del paquete "}
                  rules={[{ required: true, message: "Campo requerido" }]}
                  style={{ width: "100%" }}
                >
                  <Input
                    placeholder="Describe el contenido del paquete"
                    style={{ height: 48 }}
                  />
                </Form.Item>
              </Space.Compact>
            </Col>
          </Row>
          <Row justify={"end"}>
            <Col>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="default"
                  htmlType="submit"
                  style={{
                    height: 47,
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 8,
                  }}
                  icon={<PlusOutlined />}
                  iconPosition="end"
                >
                  Agregar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        style={{
          marginBottom: 16,
          border: "1px solid #73bd28",
          borderRadius: 12,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {items.map((item, index) => (
            <AddedItem
              key={index}
              item={item}
              onRemove={() => handleRemoveItem(index)}
            />
          ))}
        </Space>
      </Card>
      {/* Action Buttons */}
      <Flex justify="space-between" style={{ marginTop: 40 }}>
        <Button
          onClick={handleBack}
          style={{
            height: 47,
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 8,
          }}
          icon={<ArrowLeftOutlined />}
        >
          Regresar
        </Button>

        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={items.length === 0}
          style={{
            backgroundColor: "#2e49ce",
            borderColor: "#2e49ce",
            height: 47,
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 8,
          }}
          icon={<ArrowRightOutlined />}
          iconPosition="end"
        >
          Enviar
        </Button>
      </Flex>
    </Card>
  );
}

const AddedItem = ({
  item,
  onRemove,
}: {
  item: OrderItem;
  onRemove: () => void;
}) => {
  return (
    <Flex align="center" gap={16}>
      <div>
        <Text>Peso</Text>
        <Input
          value={item.weight}
          readOnly
          style={{ height: 48 }}
          suffix="libras"
        />
      </div>
      <Flex vertical style={{ flexGrow: 1 }}>
        <Text>Contenido</Text>
        <Input value={item.content} readOnly style={{ height: 48 }} />
      </Flex>

      <Package />

      <Flex align="end" gap={16}>
        <Space.Compact size="large">
          <Flex vertical>
            <Text>Largo</Text>
            <InputNumber
              suffix="cm"
              controls={false}
              value={item.length}
              readOnly
              style={{ height: 48 }}
            />
          </Flex>
          <Flex vertical>
            <Text>Alto</Text>
            <InputNumber
              suffix="cm"
              controls={false}
              value={item.height}
              readOnly
              style={{ height: 48 }}
            />
          </Flex>
          <Flex vertical>
            <Text>Ancho</Text>
            <InputNumber
              suffix="cm"
              controls={false}
              value={item.width}
              readOnly
              style={{ height: 48 }}
            />
          </Flex>
        </Space.Compact>

        <Button
          danger
          onClick={() => onRemove()}
          icon={<DeleteOutlined />}
          style={{
            height: 48,
            width: 48,
          }}
        />
      </Flex>
    </Flex>
  );
};
