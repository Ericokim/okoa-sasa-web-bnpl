// src/api/token.js
import authApi from './authApi';
import { useAuthStore } from '@/lib/store/authStore';

export const getAccessToken = async (service) => {
  const store = useAuthStore.getState();

  // Reuse valid Masoko token
  if (service === 'masoko' && store.isValid()) {
    return store.token;
  }

  const endpoint = service === 'masoko' 
    ? '/masoko/token' 
    : '/bnpl/token';

  try {
    const response = await authApi.post(endpoint); // ← hits /v1/auth/masoko/token

    const { access_token, expires_in } = response.data.body;

    if (service === 'masoko') {
      store.setToken(access_token, expires_in);
    }

    return access_token;
  } catch (error) {
    console.error(`Failed to get ${service} token:`, error.response?.data || error);
    throw error;
  }
};