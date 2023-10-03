import { useQuery, UseQueryOptions } from "react-query";
import { useParams } from "next/navigation";
import { fetcher } from "@/app.module/fetcher";

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
  const queriedUrl =
    (useParams().queriedUrl as string | undefined) ||
    (process.env.NEXT_PUBLIC_APP_URL as string);

  return useQuery<ResponseData, unknown, SelectedData>(
    queryKeys,
    async () =>
      await requestFn({
        url:
          queryKeys[0] +
          objectToQueryParamString({
            queriedUrl,
            ...queryKeys[1],
          }),
        method: "GET",
      }),
    {
      ...options,
    },
  );
};

export default useQueryFn;
