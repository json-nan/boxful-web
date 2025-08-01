"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useLogin } from "@/modules/auth/_api/auth";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { App, Button, Flex, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  useAuthGuard(); // Redirect to dashboard if already authenticated
  
  const [form] = Form.useForm<LoginFormValues>();
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const { notification } = App.useApp();

  const onFinish = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        notification.error({
          message: "Error al iniciar sesión",
          description: getErrorMessage(error),
        });
      },
    });
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100%",
      }}
    >
      <div className="signup-form-container">
        <div className="signup-header">
          <h1 className="signup-title">
            <ArrowLeftOutlined />
            Iniciar sesión
          </h1>
          <p className="signup-subtitle">Ingresa tus credenciales</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={() => {
            // Prevent any default behavior on form validation failure
          }}
          requiredMark={false}
        >
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu correo",
              },
              {
                type: "email",
                message: "Por favor ingresa un correo válido",
              },
            ]}
          >
            <Input placeholder="Digitar correo" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu contraseña",
              },
              {
                min: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            ]}
          >
            <Input.Password
              placeholder="Digitar contraseña"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="signup-submit-button"
            loading={isPending}
          >
            Iniciar sesión
          </Button>
        </Form>
        
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Text style={{ color: "#666" }}>
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/sign-up" style={{ color: "#1890ff", textDecoration: "none" }}>
              Regístrate aquí
            </Link>
          </Text>
        </div>
      </div>
    </Flex>
  );
}
