import DashboardPage from "@/modules/dashboard/pages/dashboard-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Boxful",
  description: "Panel de control principal para gestionar tus órdenes y entregas.",
};

export default function Dashboard() {
  return <DashboardPage />;
}
