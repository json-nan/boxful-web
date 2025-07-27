"use client";

import { Typography } from "antd";
import { useOrderFormStore } from "../../../stores/useOrderFormStore";
import {
  OrderData,
  OrderFormStep1Data,
  OrderFormStep2Data,
} from "../../../types/order";
import OrderStep1Form from "./OrderStep1Form";
import OrderStep2Form from "./OrderStep2Form";

const { Title, Text } = Typography;

interface CreateOrderFormProps {
  onSubmit?: (data: OrderData) => void;
}

export default function CreateOrderForm({ onSubmit }: CreateOrderFormProps) {
  const {
    currentStep,
    step1Data,
    step2Data,
    setStep1Data,
    setStep2Data,
    goToNextStep,
    resetForm,
  } = useOrderFormStore();

  const handleStep1Complete = (data: OrderFormStep1Data) => {
    setStep1Data(data);
    goToNextStep();
  };

  const handleStep2Complete = (data: OrderFormStep2Data) => {
    setStep2Data(data);

    if (step1Data) {
      const completeOrderData: OrderData = {
        ...step1Data,
        items: data.items,
      };

      if (onSubmit) {
        onSubmit(completeOrderData);
        resetForm();
      }
    }
  };

  return (
    <div style={{ padding: "0 16px" }}>
      {/* Header Section */}
      <div style={{}}>
        <Title
          level={3}
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#16163d",
            marginBottom: 12,
          }}
        >
          Crea una orden
        </Title>
        <Text style={{ fontSize: 16, color: "#4e4c4c" }}>
          Dale una ventaja competitiva a tu negocio con entregas{" "}
          <Text strong>el mismo día</Text> (Área Metropolitana) y{" "}
          <Text strong>el día siguiente</Text> a nivel nacional.
        </Text>
      </div>

      {/* Form Steps */}
      {currentStep === 1 && (
        <OrderStep1Form
          initialData={step1Data}
          onComplete={handleStep1Complete}
        />
      )}

      {currentStep === 2 && <OrderStep2Form onComplete={handleStep2Complete} />}
    </div>
  );
}
