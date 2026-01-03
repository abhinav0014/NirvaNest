export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  init = init || {};
  init.headers = init.headers || {};
  const access = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const refresh = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
  if (access) {
    // @ts-ignore
    init.headers = { ...init.headers, Authorization: `Bearer ${access}` };
  }

  let res = await fetch(input, init);
  if (res.status !== 401) return res;

  // try refresh
  if (!refresh) {
    // no refresh token, return original 401
    return res;
  }

  const rres = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refresh }),
  });

  if (!rres.ok) {
    // failed to refresh; clear tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return res;
  }

  const data = await rres.json();
  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  // retry original request with new token
  init.headers = { ...init.headers, Authorization: `Bearer ${data.access_token}` };
  return await fetch(input, init);
}
