import OrdersPage from "@/modules/orders/pages/orders-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historial de Órdenes - Boxful",
  description: "Consulta y gestiona todas tus órdenes de entrega.",
};

export default function Orders() {
  return <OrdersPage />;
}