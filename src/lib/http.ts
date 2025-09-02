// src/lib/http.ts
const API = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080/api';

let inMemoryAccessToken: string | null = null;
let refreshToken: string | null = null;
let refreshing: Promise<string | null> | null = null;

export function setTokens(access?: string | null, refresh?: string | null) {
  inMemoryAccessToken = access || null;
  refreshToken = refresh || null;
}

async function refreshAccessToken() {
  if (!refreshToken) return null;
  if (!refreshing) {
    refreshing = (async () => {
      const res = await fetch(`${API}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (!res.ok) { refreshing = null; return null; }
      const data = await res.json(); // { accessToken }
      inMemoryAccessToken = data.accessToken;
      refreshing = null;
      return inMemoryAccessToken;
    })();
  }
  return refreshing;
}

export async function http<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers = new Headers(opts.headers || {});
  if (inMemoryAccessToken) headers.set('Authorization', `Bearer ${inMemoryAccessToken}`);
  if (!headers.has('Content-Type') && opts.body) headers.set('Content-Type', 'application/json');

  let res = await fetch(`${API}${path}`, { ...opts, headers });

  if (res.status === 401) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      headers.set('Authorization', `Bearer ${newAccess}`);
      res = await fetch(`${API}${path}`, { ...opts, headers });
    }
  }
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? (null as any) : res.json();
}
