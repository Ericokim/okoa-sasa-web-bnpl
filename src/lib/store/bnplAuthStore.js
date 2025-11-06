import { create } from "zustand";
import { EncryptStorage } from "encrypt-storage";

// Reuse your SECRET_KEY
const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY || "DEV-CHANGE-ME-NOW-64-CHARS";

const encrypted = new EncryptStorage(SECRET_KEY, {
  prefix: "@bnpl",  // Different prefix to separate from Masoko (@masoko)
  encAlgorithm: "Rabbit",
  storageType: "localStorage",
});

export const useBnplAuthStore = create((set, get) => ({
  token: null,
  expiresAt: null,

  // Load from encrypted storage on init
  __init: () => {
    const raw = encrypted.getItem("auth");
    if (raw && raw.token && raw.expiresAt) {
      set({ token: raw.token, expiresAt: raw.expiresAt });
    }
  },

  // Set new token
  setToken: (access_token, expires) => {  // Note: expires is absolute seconds, not expires_in
    const expiresAt = Date.now() + expires * 1000 - 30_000;  // 30 sec buffer
    const payload = { token: access_token, expiresAt };
    encrypted.setItem("auth", payload);
    set(payload);
  },

  // Clear token
  clear: () => {
    encrypted.removeItem("auth");
    set({ token: null, expiresAt: null });
  },

  // Check validity
  isValid: () => {
    const { token, expiresAt } = get();
    return !!token && !!expiresAt && Date.now() < expiresAt;
  },
}));

// Auto-init
useBnplAuthStore.getState().__init();