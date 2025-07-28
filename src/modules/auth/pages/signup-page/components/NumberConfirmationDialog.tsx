"use client";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Modal, Space } from "antd";

interface NumberConfirmationDialogProps {
  open: boolean;
  handleOk: () => void;
  onCancel: () => void;
  phoneNumber: string;
}

const modalTheme = {
  components: {
    Modal: {
      titleFontSize: 18,
      titleLineHeight: 1.4,
      contentBg: "#ffffff",
      headerBg: "#ffffff",
    },
    Button: {
      borderRadius: 8,
      controlHeight: 44,
      fontSize: 14,
      fontWeight: 500,
    },
  },
};

export default function NumberConfirmationDialog({
  open,
  handleOk,
  onCancel,
  phoneNumber,
}: NumberConfirmationDialogProps) {
  return (
    <ConfigProvider theme={modalTheme}>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        centered
        closable={true}
        footer={null}
        title={null}
        styles={{
          content: {
            padding: "1rem",
          },
        }}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "#FEF3E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <ExclamationCircleFilled
                style={{
                  fontSize: "44px",
                  color: "#F59E0B",
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
                margin: "0 0 8px 0",
                lineHeight: "1.4",
              }}
            >
              Confirmar número{" "}
              <span style={{ fontWeight: "700" }}>de teléfono</span>
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              Está seguro de que desea continuar con el número{" "}
              <strong>{phoneNumber}</strong>?
            </p>
          </div>
          <Space
            size="middle"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              onClick={onCancel}
              style={{
                border: "1px solid #d9d9d9",
                color: "#666",
                background: "#fff",
                minWidth: "100px",
              }}
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={handleOk}
              style={{
                background: "#4f46e5",
                borderColor: "#4f46e5",
                minWidth: "100px",
              }}
            >
              Aceptar
            </Button>
          </Space>
        </Space>
      </Modal>
    </ConfigProvider>
  );
}
