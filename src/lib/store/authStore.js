import { create } from "zustand";
import { EncryptStorage } from "encrypt-storage";

const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY || "DEV-CHANGE-ME-64CHARS";

const encrypted = new EncryptStorage(SECRET_KEY, {
  prefix: "@okoa-api",
  storageType: "localStorage",
});

const STORAGE_KEY = "api_tokens";

export const useApiAuthStore = create((set, get) => ({
  masoko: { token: null, expiresAt: null },
  bnpl:   { token: null, expiresAt: null },

  // Load both tokens on app start
  __init: () => {
    const saved = encrypted.getItem(STORAGE_KEY);
    if (saved) {
      set(saved);
    }
  },

  // Save token for a specific service
  setToken: (service, access_token, expires_in) => {
    const expiresAt = Date.now() + expires_in * 1000 - 30_000; // 30s early refresh
    const update = { [service]: { token: access_token, expiresAt } };

    set(update);
    encrypted.setItem(STORAGE_KEY, { ...get(), ...update });
  },

  // Get token + expiry for a service
  getToken: (service) => {
    const data = get()[service];
    return data && data.token && Date.now() < data.expiresAt ? data.token : null;
  },

  // Check if token is valid
  isValid: (service) => {
    const token = get().getToken(service);
    return !!token;
  },

  // Clear everything
  clear: () => {
    encrypted.removeItem(STORAGE_KEY);
    set({ masoko: { token: null, expiresAt: null }, bnpl: { token: null, expiresAt: null } });
  },
}));

// Auto-init on import
useApiAuthStore.getState().__init();