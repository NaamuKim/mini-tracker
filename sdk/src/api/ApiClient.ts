import { BASE_URL } from "@/api/endPoint/api";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type FetcherOptions<T> = {
  method: Method;
  body?: unknown;
  headers?: Record<string, string>;
};

type OmitMethodFetcherOptions<T> = Omit<FetcherOptions<T>, "method">;

const XHR_READY_STATE = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4,
} as const;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get<T>(url: string, options: OmitMethodFetcherOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "GET" });
  }

  post<T>(url: string, options: OmitMethodFetcherOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "POST" });
  }

  put<T>(url: string, options: OmitMethodFetcherOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "PUT" });
  }

  delete<T>(url: string, options: OmitMethodFetcherOptions<T>): Promise<T> {
    return this.request(url, { ...options, method: "DELETE" });
  }

  request<T>(url: string, options: FetcherOptions<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, BASE_URL + url, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XHR_READY_STATE.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.response) as T;
            resolve(response);
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
  }
}

export const MINI_TRACKER_SERVER_API = new ApiClient(BASE_URL);
