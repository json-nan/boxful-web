"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import "./auth-layout.css";

const theme = {
  components: {
    Form: {
      itemMarginBottom: 24,
      labelFontSize: 14,
      labelColor: "#333",
      labelFontWeight: 600,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 48,
      fontSize: 14,
      colorPlaceholder: "#bfbfbf",
    },
    InputNumber: {
      borderRadius: 8,
      controlHeight: 48,
      fontSize: 14,
      colorPlaceholder: "#bfbfbf",
    },
    Select: {
      borderRadius: 8,
      controlHeight: 48,
      fontSize: 14,
      colorPlaceholder: "#bfbfbf",
    },
    DatePicker: {
      borderRadius: 8,
      controlHeight: 48,
      fontSize: 14,
      colorPlaceholder: "#bfbfbf",
    },
    Button: {
      borderRadius: 8,
      controlHeight: 52,
      fontSize: 16,
      fontWeight: 600,
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <div className="signup-container">
          <div className="signup-left-column">{children}</div>

          <div className="signup-right-column" style={{}}>
            {/* Empty column for future image */}
          </div>
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
