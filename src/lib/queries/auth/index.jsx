// lib/api/auth/mutations.jsx
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useSnackbar } from 'notistack'
import { useStateContext } from '@/context/state-context'
import { queryKeys } from '@/lib/queryKeys'
import { setStorageData, clearStorageData } from '@/lib/utils'
import bnplApi from '@/lib/api/bnplApi'

// Auth Storage
const AUTH_STORAGE_KEYS = { user: 'userInfo', token: 'token', name: 'name' }

const setStoredAuthData = (payload) => {
  if (!payload) return
  const user = payload.user ?? payload.userInfo ?? payload
  if (user) setStorageData(AUTH_STORAGE_KEYS.user, user)
  if (payload.token) setStorageData(AUTH_STORAGE_KEYS.token, payload.token)
  const name = payload.name ?? user?.name ?? user?.fullName
  if (name) setStorageData(AUTH_STORAGE_KEYS.name, name)
}

/**
 * useLogin
 * POST /v1/users/otp
 * Requests an OTP for login using phone number or email.
 */
export function useLogin(options = {}) {
  const queryClient = useQueryClient()
  const { logout } = useStateContext()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: optionsOnSuccess,
    onError: optionsOnError,
    ...mutationOverrides
  } = options

  return useMutation({
    mutationKey: queryKeys.masoko.auth.login(),

    mutationFn: async (payload) => {
      const { data } = await bnplApi.post('/users/otp', payload)
      return data
    },

    onSuccess: (response, payload, context) => {
      const message =
        response?.status?.message || 'OTP sent successfully. Please verify.'
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      queryClient.invalidateQueries({ queryKey: queryKeys.masoko.auth.all() })

      setStorageData('pendingLogin', payload?.phoneNumberOrEmail)

      optionsOnSuccess?.(response, payload, context)
    },

    onError: (error, payload, context) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to send OTP'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })

      clearStorageData()
      logout?.()

      optionsOnError?.(error, payload, context)
    },

    ...mutationOverrides,
  })
}

/**
 * useOTP
 * POST /v1/users/otp/verify
 * Verifies OTP and sets user authentication state.
 */
export function useOTP(options = {}) {
  const queryClient = useQueryClient()
  const { login, logout } = useStateContext()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: optionsOnSuccess,
    onError: optionsOnError,
    ...mutationOverrides
  } = options

  return useMutation({
    mutationKey: queryKeys.masoko.auth.otp(),

    mutationFn: async (payload) => {
      const { data } = await bnplApi.post('/users/otp/verify', payload)
      return data
    },

    onSuccess: (response, payload, context) => {
      const item =
        response?.data?.find?.((x) => x?.accessToken) || response?.data?.[0]
      const success = !!item?.accessToken && (item?.isSuccessful ?? true)

      if (success) {
        const authPayload = {
          token: item.accessToken,
          expires: item.expires,
          user: item.user,
        }

        setStorageData('auth', authPayload)
        setStoredAuthData(authPayload)

        login?.({
          ...item?.user,
          accessToken: item?.accessToken,
          expires: item?.expires,
        })

        enqueueSnackbar(
          response?.status?.message || 'OTP verified successfully',
          { variant: 'success', autoHideDuration: 4000 },
        )

        queryClient.invalidateQueries({
          queryKey: queryKeys.masoko.auth.all(),
        })

        optionsOnSuccess?.(response, payload, context)
      } else {
        enqueueSnackbar('Invalid OTP', { variant: 'error' })
        clearStorageData()
        logout?.()
      }
    },

    onError: (error, payload, context) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'OTP verification failed'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })
      clearStorageData()
      logout?.()

      optionsOnError?.(error, payload, context)
    },

    ...mutationOverrides,
  })
}

// ====================== LOGOUT ======================
export const useLogout = () => {
  const { logout } = useStateContext()
  const navigate = useNavigate()

  const onSignOut = React.useCallback(() => {
    // Clear all data and redirect
    clearStorageData()
    logout?.()
    navigate({ to: '/login' })
  }, [navigate, logout])

  return onSignOut
}
