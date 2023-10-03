import { useQuery, UseQueryOptions } from "react-query";
import { useParams } from "next/navigation";
import { fetcher } from "@/app.module/fetcher";
import { ENV_CONSTANTS } from "@/app.module/constant/env";

const objectToQueryParamString = (
  obj?: Record<string, string | number | boolean>,
) => {
  if (!obj) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    params.append(key, String(value));
  }
  return "?" + params.toString();
};

const requestFn = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}) => {
  try {
    const response: {
      data: any;
      message: string;
    } = await fetcher({ url, method, body });
    return response?.data;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

export const useQueryFn = <ResponseData, SelectedData = ResponseData>(
  queryKeys: [string, ...Record<string, any>[]],
  options: UseQueryOptions<ResponseData, unknown, SelectedData> & {
    customQueryKeys?: any;
  } = {},
) => {
  return useQuery<ResponseData, unknown, SelectedData>(
    queryKeys,
    async () => {
      return await requestFn({
        url:
          queryKeys[0] +
          objectToQueryParamString({
            ...queryKeys[1],
            queriedUrl:
              queryKeys[1]?.queriedUrl ?? ENV_CONSTANTS.APP_EXAMPLE_PAGE_URL,
          }),
        method: "GET",
      });
    },
    {
      ...options,
    },
  );
};

export default useQueryFn;
