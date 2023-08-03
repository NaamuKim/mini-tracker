import { useQuery, UseQueryOptions } from "react-query";
import { fetcher } from "@/app.module/fetcher";

export const useQueryFn = <T>(
  queryKeys: [string, ...object[]],
  options: UseQueryOptions<T> & { customQueryKeys?: any } = {},
) =>
  useQuery<T>(queryKeys, () => fetcher({ url: queryKeys[0], method: "GET" }), {
    ...options,
  });

export default useQueryFn;
