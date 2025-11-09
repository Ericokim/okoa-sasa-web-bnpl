import axios from 'axios'
import { useApiAuthStore } from '@/lib/store/authStore'

export const getAccessToken = async (service) => {
  const store = useApiAuthStore.getState()
  if (store.isValid(service)) return store.getToken(service)

  if (service === 'masoko') return await fetchMasokoToken()
  if (service === 'bnpl') return await fetchBnplToken()
  throw new Error(`Unknown service: ${service}`)
}

const fetchMasokoToken = async () => {
  const clientId = import.meta.env.VITE_CLIENT_ID
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET
  const tokenUrl = import.meta.env.VITE_TOKEN_ENDPOINT
  const auth = btoa(`${clientId}:${clientSecret}`)
  const proxyUrl = `${import.meta.env.VITE_TOKEN_PROXY}${encodeURIComponent(
    `${tokenUrl}?grant_type=client_credentials`,
  )}`

  const { data } = await axios.post(
    proxyUrl,
    { grant_type: 'client_credentials' },
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        'x-source-system': 'identity',
        'x-correlation-conversationid': crypto.randomUUID(),
        'x-messageid': crypto.randomUUID(),
        'x-app': 'USSD',
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
    },
  )

  const { access_token, expires_in } = data.body
  useApiAuthStore.getState().setToken('masoko', access_token, expires_in)
  return access_token
}

const fetchBnplToken = async () => {
  const { data } = await axios.post(
    import.meta.env.VITE_BNPL_AUTH_URL,
    {
      apiKey: import.meta.env.VITE_BNPL_API_KEY,
      appSecret: import.meta.env.VITE_BNPL_APP_SECRET,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: import.meta.env.VITE_BNPL_API_KEY,
      },
    },
  )

  const info = data.data[0]
  const expires_in = info.expires - Math.floor(Date.now() / 1000)
  useApiAuthStore.getState().setToken('bnpl', info.accessToken, expires_in)
  return info.accessToken
}
