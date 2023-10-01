"use client";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { queryClient } from "@/app.module/react-query/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClientRef = useRef<QueryClient>();
  if (queryClientRef.current !== null) {
    queryClientRef.current = queryClient;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
