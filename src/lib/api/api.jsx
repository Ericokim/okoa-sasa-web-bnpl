import axios from "axios";
import { getAccessToken } from "./token";
import useAuthStore from "@/lib/store/authStore";

const masokoApi = axios.create({
  baseURL: import.meta.env.VITE_MASOKO_BASE_URL, // ← NOW CORRECT
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
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

export default masokoApi;