export const fetcher = <T>({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body?: any;
}): Promise<T> => {
  try {
    return fetch(url, {
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
