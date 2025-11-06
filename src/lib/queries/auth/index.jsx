

// lib/api/auth/mutations.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { useStateContext } from "@/context/state-context";
import { queryKeys } from "@/lib/queryKeys";
import { setStorageData, clearStorageData, getStorageData } from "@/lib/utils";
import { backendFetch } from "../fetchers";

// Auth Storage
const AUTH_STORAGE_KEYS = { user: "userInfo", token: "token", name: "name" };

const setStoredAuthData = (payload) => {
  if (!payload) return;
  const user = payload.user ?? payload.userInfo ?? payload;
  if (user) setStorageData(AUTH_STORAGE_KEYS.user, user);
  if (payload.token) setStorageData(AUTH_STORAGE_KEYS.token, payload.token);
  const name = payload.name ?? user?.name ?? user?.fullName;
  if (name) setStorageData(AUTH_STORAGE_KEYS.name, name);
};

// ====================== LOGIN ======================
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: queryKeys.auth.login(),
    mutationFn: (formData) => backendFetch("/api/v1.0/auth/login", { method: "POST", data: formData }),
    onMutate: () => {
      queryClient.setQueryData(queryKeys.auth.user(), (old) => ({ ...old, loading: true, error: null }));
    },
    onSuccess: (payload) => {
      const data = payload?.data;
      if (data?.validLogin) {
        setStoredAuthData(data);
        dispatch({ type: "SET_USER", payload: data });
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
        navigate({ to: "/dashboard" });
      } else {
        clearStorageData();
        dispatch({ type: "SET_USER", payload: null });
        navigate({ to: "/signin" });
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.message;
      enqueueSnackbar(message, { variant: "error" });
      queryClient.setQueryData(queryKeys.auth.user(), {
        isAuthenticated: false,
        userInfo: null,
        token: null,
        loading: false,
        error: message,
      });
      clearStorageData();
      dispatch({ type: "SET_USER", payload: null });
    },
  });
};

// ====================== LOGOUT ======================
export const useLogout = () => {
  const { dispatch } = useStateContext();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: queryKeys.auth.logout(),
    mutationFn: async () => {
      clearStorageData();
      try { await backendFetch("/api/v1.0/auth/logout", { method: "POST" }); }
      catch (e) { console.warn("Logout API failed"); }
      return true;
    },
    onSuccess: () => {
      dispatch({ type: "SET_USER", payload: null });
      navigate({ to: "/signin" });
    },
    onError: () => {
      dispatch({ type: "SET_USER", payload: null });
      navigate({ to: "/signin" });
    },
  });
};

// ====================== RESET PASSWORD ======================
export const useResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: queryKeys.auth.resetPassword(),
    mutationFn: (formData) => backendFetch("/api/v1.0/auth/resetPassword", { method: "POST", data: formData }),
    onSuccess: (data) => {
      if (data.success) enqueueSnackbar(data.message || "Reset link sent!", { variant: "success" });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      enqueueSnackbar(msg || "Failed to reset password", { variant: "error" });
    },
  });
};

// ====================== CHANGE PASSWORD ======================
export const useChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: queryKeys.auth.changePassword(),
    mutationFn: (formData) => backendFetch("/api/v1.0/auth/changePassword", { method: "POST", data: formData }),
    onSuccess: (data) => {
      if (data.success) enqueueSnackbar(data.message || "Password changed!", { variant: "success" });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      enqueueSnackbar(msg || "Failed to change password", { variant: "error" });
    },
  });
};