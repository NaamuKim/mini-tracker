"use client";

import "@/app.feature/dashboard.entry/style/reset.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRef } from "react";
import { queryClient } from "@/app.module/react-query/queryClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClientRef = useRef<QueryClient>();
  if (queryClientRef.current !== null) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
