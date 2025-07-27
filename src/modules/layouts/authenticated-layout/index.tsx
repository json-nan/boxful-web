"use client";
import "./layout.css";

import { LogoType } from "@/components/svg/LogoType";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const { Header, Content, Sider } = Layout;

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <UserOutlined />,
      label: "Dashboard",
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "/create-order",
      icon: <PlusOutlined />,
      label: "Crear orden",
      onClick: () => router.push("/create-order"),
    },
    {
      key: "/orders",
      icon: <VideoCameraOutlined />,
      label: "Historial",
      onClick: () => router.push("/orders"),
    },
  ];

  const selectedKey =
    menuItems.find((item) => pathname.startsWith(item.key))?.key ||
    "/dashboard";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={340}
        collapsedWidth={80}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#f8f9fa",
          borderRight: "1px solid #ededed",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "40px 16px",
            gap: "32px",
            height: "100%",
          }}
        >
          {/* Logo */}
          <div
            style={{
              height: 40,
              width: 260,
              display: "flex",
              alignItems: "center",
            }}
          >
            {!collapsed && <LogoType />}
          </div>

          {/* Menu Items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              width: collapsed ? 48 : 260,
              alignItems: "stretch",
            }}
          >
            {menuItems.map((item) => {
              const isActive = selectedKey === item.key;
              return (
                <div
                  key={item.key}
                  onClick={item.onClick}
                  style={{
                    backgroundColor: isActive ? "#2e49ce" : "transparent",
                    borderRadius: 8,
                    padding: collapsed ? "12px" : "24px 32px",
                    display: "flex",
                    alignItems: "center",
                    gap: collapsed ? 0 : 24,
                    cursor: "pointer",
                    justifyContent: collapsed ? "center" : "flex-start",
                    transition: "all 0.2s",
                    minHeight: 48,
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#f0f0f0";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      color: isActive ? "#f6f6f6" : "#4e4c4c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <div
                      style={{
                        fontFamily: "'Mona Sans', sans-serif",
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 16,
                        color: isActive ? "#f6f6f6" : "#4e4c4c",
                        lineHeight: 1,
                        flex: 1,
                        textAlign: "left",
                      }}
                    >
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 340,
          transition: "margin-left 0.2s",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
