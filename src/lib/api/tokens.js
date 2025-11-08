import authApi from './authApi'
import { useApiAuthStore} from '@/lib/store/authStore'

export const getAccessToken = async (service) => {
  const store = useApiAuthStore.getState()

  // Reuse valid Masoko token
  if (service === 'masoko' && store.isValid()) {
    return store.token
  }

  const endpoint = service === 'masoko' ? '/masoko/token' : '/bnpl/token'
  try {
    const response = await authApi.post(endpoint)
    const { access_token, expires_in } = response.data.body

    // Save both tokens here
    store.setToken(service, access_token, expires_in)

    return access_token
  } catch (error) {
    console.error(
      `Failed to get ${service} token:`,
      error.response?.data || error,
    )
    throw error
  }
}
