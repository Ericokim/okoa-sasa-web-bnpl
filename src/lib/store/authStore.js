// src/store/authStore.js
import { create } from "zustand";
import { EncryptStorage } from "encrypt-storage";

// -----------------------------------------------------------
// 1. YOUR SECRET – NEVER commit this file!
//     Put this in .env → VITE_ENCRYPT_KEY=64-random-chars
// -----------------------------------------------------------
const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY || "DEV-CHANGE-ME-NOW-64-CHARS";

// -----------------------------------------------------------
// 2. Encrypted localStorage wrapper
// -----------------------------------------------------------
const encrypted = new EncryptStorage(SECRET_KEY, {
  prefix: "@masoko",
  encAlgorithm: "Rabbit",     
  storageType: "localStorage",
});


export const useAuthStore = create((set, get) => ({
  // Load encrypted data (or empty)
  token: null,
  expiresAt: null,

  // Initialise from storage on first run
  __init: () => {
    const raw = encrypted.getItem("auth");
    if (raw && raw.token && raw.expiresAt) {
      set({ token: raw.token, expiresAt: raw.expiresAt });
    }
  },

  // Save fresh token (encrypted)
  setToken: (access_token, expires_in) => {
    const expiresAt = Date.now() + expires_in * 1000 - 30_000; // 30 sec early
    const payload = { token: access_token, expiresAt };
    encrypted.setItem("auth", payload);
    set(payload);
  },

  // Wipe everything
  clear: () => {
    encrypted.removeItem("auth");
    set({ token: null, expiresAt: null });
  },

  // Is token still valid?
  isValid: () => {
    const { token, expiresAt } = get();
    return !!token && !!expiresAt && Date.now() < expiresAt;
  },
}));

useAuthStore.getState().__init();