export const API_BASE = (() => {
  const env = import.meta.env.VITE_OKOA_BASE_URL?.trim()
  if (env) {
    return env.endsWith('/') ? env.slice(0, -1) : env
  }
  // Auto-detect when deployed
  const origin = window.location.origin
  return `${origin}/api`
})()

// These are the exact paths your backend team gave you
export const AUTH_GATEWAY = `${API_BASE}/v1/auth`
export const MASOKO = `${API_BASE}/v1/masoko`
export const BNPL = `${API_BASE}/v1/bnpl`
