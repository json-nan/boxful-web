"use client";

import { Genders } from "@/catalogues/Genders";
import { PhoneCodes } from "@/catalogues/PhoneCodes";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useSignUp } from "@/modules/auth/_api/auth";
import { getErrorMessage } from "@/utils/errorHandler";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  App,
  Button,
  Cascader,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NumberConfirmationDialog from "./components/NumberConfirmationDialog";

const { Text } = Typography;

const eighteenYearsAgo = dayjs().subtract(18, "year");
const maxDate = dayjs().subtract(18, "year");

interface SignupFormValues {
  name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  useAuthGuard();

  const [form] = Form.useForm<SignupFormValues>();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const signUpMutation = useSignUp();
  const router = useRouter();
  const { notification } = App.useApp();

  const onFinish = async () => {
    setConfirmationDialogOpen(true);
  };

  const handleOk = async () => {
    setConfirmationDialogOpen(false);
    const formValues = form.getFieldsValue();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...signUpData } = formValues;

    signUpMutation.mutate(signUpData, {
      onSuccess: () => {
        notification.success({
          message: "Cuenta creada exitosamente",
          description: "Tu cuenta ha sido creada correctamente.",
        });

        router.push("/dashboard");
      },
      onError: (error) => {
        notification.error({
          message: "Error al crear la cuenta",
          description: getErrorMessage(error),
        });
      },
    });
  };

  return (
    <>
      <NumberConfirmationDialog
        open={confirmationDialogOpen}
        handleOk={handleOk}
        onCancel={() => setConfirmationDialogOpen(false)}
        phoneNumber={form.getFieldValue("phone")}
      />
      <Flex
        justify="center"
        align="center"
        style={{
          height: "100%",
        }}
      >
        <div className="signup-form-container">
          <div className="signup-header">
            <h1 className="signup-title ">
              <ArrowLeftOutlined />
              Cuéntanos de ti
            </h1>
            <p className="signup-subtitle">
              Completa la información de registro
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu nombre",
                    },
                  ]}
                >
                  <Input placeholder="Digita tu nombre" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Apellido"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu apellido",
                    },
                  ]}
                >
                  <Input placeholder="Digita tu apellido" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Sexo"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Por favor selecciona tu sexo",
                    },
                  ]}
                >
                  <Select placeholder="Seleccionar">
                    {Object.entries(Genders).map(([value, label]) => (
                      <Select.Option key={value} value={value}>
                        {label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Fecha de nacimiento"
                  name="birth_date"
                  initialValue={eighteenYearsAgo}
                  rules={[
                    {
                      required: true,
                      message: "Por favor selecciona tu fecha de nacimiento",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Seleccionar"
                    style={{ width: "100%" }}
                    disabledDate={(current) => {
                      return current && current.isAfter(maxDate, "day");
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Número de whatsapp"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu número de WhatsApp",
                    },
                    {
                      max: 8,
                      message: "El número debe tener 8 dígitos",
                    },
                  ]}
                >
                  <Flex className="phone-container">
                    <InputNumber
                      style={{ width: "100%" }}
                      addonBefore={
                        <Cascader
                          style={{ width: 80 }}
                          defaultValue={["503"]}
                          placeholder="503"
                          options={Object.entries(PhoneCodes).map(
                            ([code, label]) => ({
                              value: code,
                              label: `+${label}`,
                            })
                          )}
                        />
                      }
                    />
                  </Flex>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Repetir contraseña"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Por favor confirma tu contraseña",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Las contraseñas no coinciden")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Digitar contraseña"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              className="signup-submit-button"
              loading={signUpMutation.isPending}
            >
              Siguiente
            </Button>
          </Form>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Text style={{ color: "#666" }}>
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/auth/sign-in"
                style={{ color: "#1890ff", textDecoration: "none" }}
              >
                Inicia sesión aquí
              </Link>
            </Text>
          </div>
        </div>
      </Flex>
    </>
  );
}
