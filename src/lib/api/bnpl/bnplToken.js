import axios from 'axios';
import { useBnplAuthStore } from '@/lib/store/bnplAuthStore';  

export const getBnplAccessToken = async (forceRefresh = false) => {
  const store = useBnplAuthStore.getState();

  // If valid and not forcing refresh, return cached
  if (!forceRefresh && store.isValid()) {
    return store.token;
  }

  const apiKey = import.meta.env.VITE_BNPL_API_KEY;
  const appSecret = import.meta.env.VITE_BNPL_APP_SECRET;
  const baseUrl = import.meta.env.VITE_BNPL_BASE_URL;

  try {
    // First, try to get new token
    const response = await axios.post(
      `${baseUrl}/v1/auth/token`,
      { apiKey, appSecret },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

  
    const { accessToken, expires } = response.data.data[0];  
    useBnplAuthStore.getState().setToken(accessToken, expires);
    return accessToken;
  } catch (error) {
    // If token fetch fails (e.g., expired credentials), throw
    console.error('BNPL token fetch failed:', error);
    throw new Error('Failed to get BNPL access token');
  }
};

// Separate refresh function (call when token is near expiry or 401)
export const refreshBnplToken = async () => {
  const appSecret = import.meta.env.VITE_BNPL_APP_SECRET;
  const baseUrl = import.meta.env.VITE_BNPL_BASE_URL;

  try {
    const response = await axios.post(
      `${baseUrl}/v1/auth/token/refresh`,
      { appSecret },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    const { accessToken, expires } = response.data.data[0];  // Adjust path
    useBnplAuthStore.getState().setToken(accessToken, expires);
    return accessToken;
  } catch (error) {
    console.error('BNPL token refresh failed:', error);
    useBnplAuthStore.getState().clear();  // Logout on fail
    throw new Error('Failed to refresh BNPL token');
  }
};