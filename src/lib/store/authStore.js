import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  token: null,
  expiry: null,  // We'll store the expiry timestamp here

  setToken: (access_token, expires_in) => {
    const expiry = Date.now() + expires_in * 1000;  // Convert seconds to milliseconds
    set({ token: access_token, expiry });
  },

  isTokenValid: () => {
    const state = get();
    return state.token && state.expiry && Date.now() < state.expiry;
  },

  logout: () => {
    set({ token: null, expiry: null });
      // Add any other logout logic, like clearing localStorage if needed
      
    },
  
  
}));

export default useAuthStore;