// src/api/token.js   (or wherever you keep it)
import axios from 'axios'
import { useAuthStore } from '@/lib/store/authStore'   // ← ONLY THIS LINE CHANGED

export const getAccessToken = async () => {
  const store = useAuthStore.getState()

  // Reuse cached token if valid
  if (store.isValid()) {               
    return store.token
  }

  const clientId = import.meta.env.VITE_CLIENT_ID
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET
  const tokenUrl = import.meta.env.VITE_TOKEN_ENDPOINT
  const auth = btoa(`${clientId}:${clientSecret}`)

  const proxyUrl = `${import.meta.env.VITE_TOKEN_PROXY}${encodeURIComponent(
    `${tokenUrl}?grant_type=client_credentials`,
  )}`

  try {
    const response = await axios.post(
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

    const { access_token, expires_in } = response.data.body
    useAuthStore.getState().setToken(access_token, expires_in)
    return access_token
  } catch (error) {
    console.error('Token fetch failed:', error)
    throw new Error('Failed to get access token')
  }
}