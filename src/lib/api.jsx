import axios from 'axios';
import { clearStorageData, getStorageData } from '@/lib/utils';

// API base URL (using environment variable)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: 'http://localhost:4001', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token header to requests (fixed to use getStorageData)
api.interceptors.request.use(
  (config) => {
    const token = getStorageData('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// Response interceptor to handle token expiration (improved error handling)
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // Only logout on genuine auth failures, not network or temporary errors
    if (err.response?.status === 401) {
      const errorMessage = err.response?.data?.message?.toLowerCase() || '';
      const isTokenExpired =
        errorMessage.includes('token expired') ||
        errorMessage.includes('invalid token') ||
        errorMessage.includes('unauthorized access');

      // Only logout if it's a genuine token/auth issue
      if (isTokenExpired) {
        clearStorageData();
        sessionStorage.clear();
        window.location.href = '/signin';
      }
    }

    return Promise.reject(err);
  },
);

// Generic API request function for other queries (not auth)
export const apiRequest = async (endpoint, options = {}) => {
  const config = {
    url: endpoint,
    method: options.method || 'GET',
    ...options,
  };

  if (options.body) {
    config.data =
      typeof options.body === 'string'
        ? JSON.parse(options.body)
        : options.body;
  }

  const response = await api(config);
  return response.data;
};

export default api;
