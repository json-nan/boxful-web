"use client";
import AuthenticatedLayout from "@/modules/layouts/authenticated-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { message } from "antd";
import React, { useMemo } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const Context = React.createContext({ name: "Default" });

export default function Layout({ children }: { children: React.ReactNode }) {
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const [, contextHolder] = message.useMessage();

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <QueryClientProvider client={queryClient}>
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      </QueryClientProvider>
    </Context.Provider>
  );
}
