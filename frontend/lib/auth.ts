export function setTokens(access: string, refresh: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

export function clearTokens() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export function getAccessToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

export function getRefreshToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refresh_token')
}

export async function logout(): Promise<void> {
  const refresh = getRefreshToken()
  if (refresh) {
    try {
      await fetch('/api/v1/auth/logout', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({refresh_token: refresh})})
    } catch (e) {
      // ignore network errors during logout
    }
  }
  clearTokens()
}
