// src/api/masokoApi.js
import axios from 'axios'
import { getAccessToken } from './tokens'
import { API_BASE } from './config.js'
import { useApiAuthStore } from '@/lib/store/authStore'

const trimTrailingSlash = (value = '') => {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\/+$/, '')
}

const stripLeadingSlash = (value = '') =>
  typeof value === 'string' ? value.replace(/^\/+/, '') : value

const isAbsoluteUrl = (value = '') => /^https?:\/\//i.test(value)

const normalizeBaseUrl = () => {
  const envBase = trimTrailingSlash(import.meta.env.VITE_MASOKO_BASE_URL || '')
  if (envBase) return envBase
  const apiBase = trimTrailingSlash(API_BASE || '')
  if (!apiBase) return '/v1'
  return `${apiBase}/v1`
}

const PROXY = import.meta.env.VITE_MASOKO_PROXY?.trim() || ''
const BASE_URL = normalizeBaseUrl()

const combineUrl = (base, path = '') => {
  if (!path) return base
  if (isAbsoluteUrl(path)) return path
  const sanitizedBase = trimTrailingSlash(base || '')
  const sanitizedPath = stripLeadingSlash(path)
  if (!sanitizedBase) {
    return `/${sanitizedPath}`
  }
  return `${sanitizedBase}/${sanitizedPath}`
}

const buildProxyUrl = (targetUrl) => {
  if (!PROXY) return targetUrl
  if (PROXY.includes('{target}')) {
    return PROXY.replace('{target}', encodeURIComponent(targetUrl))
  }
  return `${PROXY}${encodeURIComponent(targetUrl)}`
}

const masokoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Source-System': 'liberty_bnpl',
  },
})

masokoApi.interceptors.request.use(async (config) => {
  const token = await getAccessToken('masoko')
  config.headers.Authorization = `Bearer ${token}`
  if (PROXY) {
    const requestUrl = config.url || ''
    const targetUrl = combineUrl(BASE_URL, requestUrl)
    config.baseURL = undefined
    config.url = buildProxyUrl(targetUrl)
  }
  return config
})

masokoApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useApiAuthStore.getState().clearService('masoko')
    }
    return Promise.reject(err)
  },
)

export default masokoApi
