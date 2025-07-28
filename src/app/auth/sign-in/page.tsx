import LoginPage from "@/modules/auth/pages/login-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión - Boxful",
  description: "Inicia sesión en tu cuenta de Boxful para gestionar tus órdenes de entrega.",
};

export default function SignInPage() {
  return <LoginPage />;
}
