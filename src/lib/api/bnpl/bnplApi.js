import axios from 'axios'
import { getBnplAccessToken, refreshBnplToken } from './bnplToken'
import { useBnplAuthStore } from '@/lib/store/bnplAuthStore'

const bnplApi = axios.create({
  baseURL: import.meta.env.VITE_BNPL_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

bnplApi.interceptors.request.use(async (config) => {
  let token = await getBnplAccessToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

bnplApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    // If 401 and not already retrying, try refresh
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Prevent infinite loop
      try {
        const newToken = await refreshBnplToken()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return bnplApi(originalRequest) // Retry with new token
      } catch (refreshError) {
        useBnplAuthStore.getState().clear() // Logout on refresh fail
      }
    }

    return Promise.reject(err)
  },
)

export default bnplApi
