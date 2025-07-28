import SignupPage from "@/modules/auth/pages/signup-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro - Boxful",
  description: "Crea tu cuenta en Boxful para comenzar a gestionar tus entregas y órdenes.",
};

export default function SignupPageWrapper() {
  return <SignupPage />;
}
