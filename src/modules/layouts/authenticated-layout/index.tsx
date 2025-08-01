"use client";
import { IsoType } from "@/components/svg/IsoType";
import "./layout.css";

import { LogoType } from "@/components/svg/LogoType";
import { getFullNameFromToken } from "@/libs/jwt";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header, Content, Sider } = Layout;

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const name = getFullNameFromToken();
    setUserName(name);
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <UserOutlined />,
      label: "Dashboard",
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "/orders/create",
      icon: <PlusOutlined />,
      label: "Crear orden",
      onClick: () => router.push("/orders/create"),
    },
    {
      key: "/orders",
      icon: <SearchOutlined />,
      label: "Historial",
      onClick: () => router.push("/orders"),
    },
  ];

  const selectedKey =
    menuItems.find((item) => pathname.startsWith(item.key))?.key ||
    "/dashboard";

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    router.push("/auth/sign-in");
  };

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
            justifyContent: "space-between",
            padding: "40px 16px",
            gap: "32px",
            height: "100%",
          }}
        >
          {/* Top Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
              width: "100%",
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
              {!collapsed && (
                <Flex gap={4}>
                  <IsoType />
                  <LogoType />
                </Flex>
              )}
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
                      backgroundColor: isActive ? colorPrimary : "transparent",
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

          {/* Sign Out Button */}
          <div
            style={{
              width: collapsed ? 48 : 260,
              marginBottom: "16px",
            }}
          >
            <Button
              onClick={handleSignOut}
              icon={<LogoutOutlined />}
              block
              style={{
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              {!collapsed && "Cerrar sesión"}
            </Button>
          </div>
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 340,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          id="header"
        >
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {userName && (
              <span style={{ marginRight: 16, fontWeight: 500 }}>
                {userName}
              </span>
            )}
            <UserOutlined style={{ fontSize: 20 }} />
          </div>
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
