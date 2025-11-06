import axios from 'axios'
import { getAccessToken } from './tokens'
import { BNPL } from './config'

const bnplApi = axios.create({
  baseURL: BNPL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

bnplApi.interceptors.request.use(async (config) => {
  try {
    const token = await getAccessToken('bnpl') 
    config.headers.Authorization = `Bearer ${token}`
  } catch (error) {
    console.error(
      'Failed to get BNPL token!',
      error.response?.data || error,
    )
  }
  return config
})

bnplApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Clear only BNPL token
      const store = useApiAuthStore.getState()
      store.setToken('bnpl', null, 0)
    }
    return Promise.reject(err)
  },
)

export default bnplApi
