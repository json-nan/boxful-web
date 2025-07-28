import CreateOrderPage from "@/modules/orders/pages/create-order-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Orden - Boxful",
  description: "Crea una nueva orden de entrega con información detallada del paquete.",
};

export default function CreateOrder() {
  return <CreateOrderPage />;
}