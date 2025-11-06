import axios from "axios";
import { getAccessToken } from "./token";
import { useAuthStore } from "@/lib/store/authStore";
const PROXY = import.meta.env.VITE_MASOKO_PROXY?.trim();
const masokoApi = axios.create({
  baseURL: PROXY
    ? `${PROXY}${encodeURIComponent(import.meta.env.VITE_MASOKO_BASE_URL)}`
    : import.meta.env.VITE_MASOKO_BASE_URL,
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
      useAuthStore.getState().clear();
    }
    return Promise.reject(err);
  }
);
export default masokoApi;

//Backend API instance

