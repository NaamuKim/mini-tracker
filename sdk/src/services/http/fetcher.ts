import { BASE_URL } from "@/constants/api";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type FetcherOptions = {
  method: Method;
  body?: unknown;
  headers?: Record<string, string>;
};

export const fetcher = (url: string, options: FetcherOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, BASE_URL + url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      }
    };

    if (options.headers) {
      for (const key in options.headers) {
        if (Object.hasOwn(options.headers, key)) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(options.body ? JSON.stringify(options.body) : null);
  });
};
