const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080/api";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

async function requestJSON<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000); // ⏱ 10s timeout

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal ?? controller.signal,
    });

    clearTimeout(id);

    if (!res.ok) {
      const errorText = await res.text();
      throw {
        status: res.status,
        message: errorText || "API request failed",
      };
    }

    return res.json();
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw { status: 408, message: "Request timed out" };
    }
    throw err;
  }
}

export const api = {
  get: <T>(path: string) => requestJSON<T>(path),
  post: <T>(path: string, body: unknown) => requestJSON<T>(path, { method: "POST", body }),
  put: <T>(path: string, body: unknown) => requestJSON<T>(path, { method: "PUT", body }),
  delete: <T>(path: string) => requestJSON<T>(path, { method: "DELETE" }),
};
