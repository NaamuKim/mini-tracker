import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from '@/app.module/fetcher';

const objectToQueryParamString = (obj: Record<string, string | number | boolean>) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    params.append(key, String(value));
  }
  return '?' + params.toString();
};

export const useQueryFn = <ResponseData, SelectedData = ResponseData>(
  queryKeys: [string, ...Record<string, any>[]],
  options: UseQueryOptions<ResponseData, unknown, SelectedData> & {
    customQueryKeys?: any;
  } = {}
) =>
  useQuery<ResponseData, unknown, SelectedData>(
    queryKeys,
    () => fetcher({ url: queryKeys[0] + objectToQueryParamString(queryKeys[1]), method: 'GET' }),
    {
      ...options,
    }
  );

export default useQueryFn;
