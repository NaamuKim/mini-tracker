type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type FetcherOptions = {
  method: Method;
  body?: any;
  headers?: Record<string, string>;
};

export const fetcher = (url: string, options: FetcherOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, url, true);
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
        if (options.headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(options.body ? JSON.stringify(options.body) : null);
  });
};