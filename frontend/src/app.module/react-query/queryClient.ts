import { ApiError } from "@/app.module/class/ApiError";
import { QueryClient } from "react-query";

const queryErrorHandler = (error: unknown): void => {
  const title =
    error instanceof Error ? error.message : "error connecting to server";
  const code = error instanceof ApiError ? error.code : 500;
  throw new ApiError(title, code);
};

export const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 15,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
};

export const queryClient = generateQueryClient();
