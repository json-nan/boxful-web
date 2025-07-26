"use client";

import { Genders } from "@/catalogues/Genders";
import { PhoneCodes } from "@/catalogues/PhoneCodes";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useState } from "react";
import NumberConfirmationDialog from "./components/NumberConfirmationDialog";

interface SignupFormValues {
  name: string;
  last_name: string;
  gender: string;
  birth_ate: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export default function SignupPage() {
  const [form] = Form.useForm<SignupFormValues>();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const onFinish = async (values: SignupFormValues) => {
    setConfirmationDialogOpen(true);
  };

  const handleOk = async () => {
    setConfirmationDialogOpen(false);
    // Here you would typically handle the form submission, e.g., send data to the server
    console.log("Form submitted with values:", form.getFieldsValue());
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
                  ]}
                >
                  <Flex className="phone-container">
                    <Input
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
            >
              Siguiente
            </Button>
          </Form>
        </div>
      </Flex>
    </>
  );
}
