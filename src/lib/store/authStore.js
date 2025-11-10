// src/lib/store/authStore.js
import { create } from 'zustand'
import { EncryptStorage } from 'encrypt-storage'

const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY || 'DEV-CHANGE-ME-64CHARS'
const encrypted = new EncryptStorage(SECRET_KEY, {
  prefix: '@okoa-api',
  storageType: 'localStorage',
})

const STORAGE_KEY = 'api_tokens'

export const useApiAuthStore = create((set, get) => ({
  masoko: { token: null, expiresAt: null },
  bnpl: { token: null, expiresAt: null },

  __init: () => {
    const saved = encrypted.getItem(STORAGE_KEY)
    if (saved) set(saved)
  },

  setToken: (service, token, expires_in) => {
    const expiresAt = Date.now() + expires_in * 1000 - 30_000
    const update = { [service]: { token, expiresAt } }
    set(update)
    encrypted.setItem(STORAGE_KEY, { ...get(), ...update })
  },

  getToken: (service) => {
    const data = get()[service]
    return data?.token && Date.now() < data.expiresAt ? data.token : null
  },

  isValid: (service) => !!get().getToken(service),

  clearService: (service) => {
    const update = { [service]: { token: null, expiresAt: null } }
    set(update)
    encrypted.setItem(STORAGE_KEY, { ...get(), ...update })
  },

  clear: () => {
    encrypted.removeItem(STORAGE_KEY)
    set({
      masoko: { token: null, expiresAt: null },
      bnpl: { token: null, expiresAt: null },
    })
  },
}))

useApiAuthStore.getState().__init()
