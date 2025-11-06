import axios from "axios";
import { getAccessToken } from "./token";
import { useAuthStore } from "@/lib/store/authStore";  // ← FIX 1: Correct path

const masokoApi = axios.create({
  baseURL: import.meta.env.VITE_MASOKO_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Source-System": "liberty_bnpl",
  },
});

masokoApi.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

masokoApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().clear();  // ← FIX 2: Use .clear()
    }
    return Promise.reject(err);
  }
);

export default masokoApi;