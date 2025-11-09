// src/api/bnplApi.js
import axios from 'axios'
import { getAccessToken } from './tokens'
import { useApiAuthStore } from '@/lib/store/authStore'

const trimEndingSlash = (value = '') =>
  value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value

const normalizeBaseUrl = () => trimEndingSlash(import.meta.env.VITE_BNPL_BASE_URL?.trim() || '')

const normalizePrefix = () => {
  const fallback = import.meta.env.VITE_BNPL_BASE_URL ? '/v1' : '/v1/bnpl'
  const raw = trimEndingSlash(
    (import.meta.env.VITE_BNPL_API_PREFIX || fallback).trim(),
  )
  if (!raw) return '/'
  return raw.startsWith('/') ? raw : `/${raw}`
}

const buildBnplBaseUrl = () => {
  const base = normalizeBaseUrl()
  const prefix = normalizePrefix()

  if (!base) {
    console.warn(
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
