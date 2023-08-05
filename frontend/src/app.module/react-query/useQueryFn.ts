import { useQuery, UseQueryOptions } from "react-query";
import { fetcher } from "@/app.module/fetcher";

export const useQueryFn = <ResponseData, SelectedData = ResponseData>(
  queryKeys: [string, ...object[]],
  options: UseQueryOptions<ResponseData, unknown, SelectedData> & {
    customQueryKeys?: any;
  } = {},
) =>
  useQuery<ResponseData, unknown, SelectedData>(
    queryKeys,
    () => fetcher({ url: queryKeys[0], method: "GET" }),
    {
      ...options,
    },
  );

export default useQueryFn;
