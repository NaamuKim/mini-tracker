export const BASE_URL = process.env["NEXT_PUBLIC_API_DASHBOARD_URL"];

export const fetcher = <T>({
  url,
  method,
  body,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}): Promise<T> => {
  try {
    return fetch(BASE_URL + url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json());
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
