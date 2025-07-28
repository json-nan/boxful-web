"use client";

import { App } from "antd";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "../../_api/orders";
import { OrderData } from "../../types/order";
import CreateOrderForm from "./components";

export default function CreateOrderPage() {
  const createOrderMutation = useCreateOrder();
  const router = useRouter();
  const { notification } = App.useApp();

  const handleOrderSubmit = (data: OrderData, resetForm: () => void) => {
    createOrderMutation.mutate(data, {
      onSuccess: () => {
        notification.success({
          message: "Orden creada correctamente",
          description: "La orden ha sido creada exitosamente.",
        });
        resetForm();
        router.push("/orders");
      },
      onError: (error) => {
        notification.error({
          message: "Error al crear la orden",
          description: error.message || "Ocurrió un error al crear la orden.",
        });
      },
    });
  };

  return <CreateOrderForm onSubmit={handleOrderSubmit} />;
}
