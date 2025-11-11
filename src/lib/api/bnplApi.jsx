// src/api/bnplApi.js
import axios from 'axios'
import { getAccessToken } from './tokens'
import { useApiAuthStore } from '@/lib/store/authStore'
import { logger } from '@/lib/logger'

const trimEndingSlash = (value = '') =>
  value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value

const normalizeBaseUrl = () => trimEndingSlash(import.meta.env.VITE_BNPL_BASE_URL?.trim() || '')

const normalizePrefix = () => {
  const hasExplicitBase = Boolean(import.meta.env.VITE_BNPL_BASE_URL?.trim())
  const raw = trimEndingSlash((hasExplicitBase ? '/v1' : '/v1/bnpl').trim())
  if (!raw) return '/'
  return raw.startsWith('/') ? raw : `/${raw}`
}

const buildBnplBaseUrl = () => {
  const base = normalizeBaseUrl()
  const prefix = normalizePrefix()

  if (!base) {
    logger.warn(
      '[bnplApi] Missing VITE_BNPL_BASE_URL. Requests will use a relative path.',
    )
    return prefix
  }

  return `${base}${prefix}`
}

const bnplApi = axios.create({
  baseURL: buildBnplBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

bnplApi.interceptors.request.use(async (config) => {
  const token = await getAccessToken('bnpl')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

bnplApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useApiAuthStore.getState().clearService('bnpl')
    }
    return Promise.reject(err)
  },
)

export default bnplApi
