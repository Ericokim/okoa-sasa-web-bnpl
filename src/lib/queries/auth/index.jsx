import * as React from 'react'
import api from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useSnackbar } from 'notistack'
import { useStateContext } from '@/context/state-context'
import { queryKeys } from '../queryKeys'
import { setStorageData, getStorageData, clearStorageData } from '@/lib/utils'

// Login mutation (matching reference Auth.jsx pattern)
export const useLogin = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useStateContext()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: queryKeys.auth.login(),
    mutationFn: async (formData) => {
      // Following exact reference pattern from Auth.jsx
      const { data } = await api.post('/api/v1.0/auth/login', formData)
      return data
    },
    onMutate: () => {
      // USER_LOGIN_REQUEST equivalent
      queryClient.setQueryData(queryKeys.auth.user(), (old) => ({
        ...old,
        loading: true,
        error: null,
      }))
    },
    onSuccess: (payload) => {
      const dataItem = payload?.data
      // USER_LOGIN_SUCCESS equivalent - following exact reference logic
      if (dataItem.validLogin) {
        // Store auth data
        setStoredAuthData(dataItem)

        // Update context state with API response
        dispatch({
          type: 'SET_USER',
          payload: dataItem,
        })

        // Invalidate all auth queries
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() })

        // Show success notification
        // enqueueSnackbar('Login successful! Redirecting to dashboard...', {
        //   variant: 'success',
        // })

        // Navigate to dashboard using React Router (preserves SPA behavior)
        navigate({ to: '/dashboard' })
      } else {
        // Clear data on invalid login
        clearStorageData()
        dispatch({
          type: 'SET_USER',
          payload: null,
        })
        navigate({ to: '/login' })
      }
    },
    onError: (error) => {
      // USER_LOGIN_FAIL equivalent
      const errorMessage = error.response?.data?.message || error.message

      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })

      queryClient.setQueryData(queryKeys.auth.user(), {
        isAuthenticated: false,
        userInfo: null,
        token: null,
        loading: false,
        error: errorMessage,
      })

      // Clear any partial auth data
      clearStorageData()
      dispatch({
        type: 'SET_USER',
        payload: null,
      })
    },
  })
}

// Logout mutation (matching reference Auth.jsx pattern)
export const useLogout = () => {
  const { dispatch } = useStateContext()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: queryKeys.auth.logout(),
    mutationFn: async () => {
      // Clear storage first
      clearStorageData()

      // Try to call logout API endpoint if it exists
      try {
        await api.post('/api/v1.0/auth/logout')
      } catch {
        console.log('Logout API call failed, continuing with local cleanup')
      }

      return true
    },
    onSuccess: () => {
      // Clear context state
      dispatch({
        type: 'SET_USER',
        payload: null,
      })

      // Navigate to login after logout using React Router
      navigate({ to: '/login' })
    },
    onError: () => {
      // Even if logout fails, clear local data
      clearStorageData()
      dispatch({
        type: 'SET_USER',
        payload: null,
      })
      navigate({ to: '/login' })
    },
  })
}

// Reset password mutation (matching reference Auth.jsx pattern)
export const useResetPassword = () => {
  return useMutation({
    mutationKey: queryKeys.auth.resetPassword(),
    mutationFn: async (formData) => {
      // Following exact reference pattern from AuthResetPassword
      const { data } = await api.post('/api/v1.0/auth/resetPassword', formData)
      return data
    },
    onMutate: () => {
      // RESET_PASSWORD_REQUEST equivalent
      return { loading: true, error: null }
    },
    onSuccess: (data) => {
      // RESET_PASSWORD_SUCCESS equivalent
      return {
        loading: false,
        resetPasswordInfo: data,
        success: data.success === true ? data.message : null,
        error: null,
      }
    },
    onError: (error) => {
      // RESET_PASSWORD_FAIL equivalent
      const errorMessage = error.response?.data?.message || error.message
      return {
        loading: false,
        error: errorMessage,
        success: null,
      }
    },
  })
}

// Change password mutation (matching reference Auth.jsx pattern)
export const useChangePassword = () => {
  return useMutation({
    mutationKey: queryKeys.auth.changePassword(),
    mutationFn: async (formData) => {
      // Following exact reference pattern from AuthchangePassword
      const { data } = await api.post('/api/v1.0/auth/changePassword', formData)
      return data
    },
    onMutate: () => {
      // CHANGE_PASSWORD_REQUEST equivalent
      return { loading: true, error: null }
    },
    onSuccess: (data) => {
      // CHANGE_PASSWORD_SUCCESS equivalent
      return {
        loading: false,
        changePasswordInfo: data,
        success: data.success === true ? data.message : null,
        error: null,
      }
    },
    onError: (error) => {
      // CHANGE_PASSWORD_FAIL equivalent
      const errorMessage = error.response?.data?.message || error.message
      return {
        loading: false,
        error: errorMessage,
        success: null,
      }
    },
  })
}

// AuthResetPassword query following the specific pattern requested
export const AuthResetPassword = {
  state: {},
  reducers: {
    RESET_PASSWORD_REQUEST: (state, payload) => {
      return {
        loading: true,
      }
    },
    RESET_PASSWORD_SUCCESS: (state, payload) => {
      return {
        loading: false,
        resetPasswordInfo: payload,
        success: payload.success === true ? payload.message : null,
      }
    },
    RESET_PASSWORD_FAIL: (state, payload) => {
      return {
        loading: false,
        // error: payload,
        error: payload.response
          ? payload.response.data?.message
          : payload.message,
      }
    },
  },
  effects: (dispatch) => {
    const { AuthResetPassword } = dispatch
    return {
      async resetUserPassword(formData) {
        try {
          AuthResetPassword.RESET_PASSWORD_REQUEST()

          const { data } = await api.post(
            `/api/v1.0/auth/resetPassword`,
            formData,
          )

          AuthResetPassword.RESET_PASSWORD_SUCCESS(data)
          return Promise.resolve(data)
        } catch (error) {
          AuthResetPassword.RESET_PASSWORD_FAIL(error)
        }
      },
    }
  },
}

// Hook to use AuthResetPassword with React Query integration
export const useAuthResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.auth.resetPassword(),
    mutationFn: async (formData) => {
      try {
        const { data } = await api.post(
          '/api/v1.0/auth/resetPassword',
          formData,
        )
        return data
      } catch (error) {
        throw error
      }
    },
    onMutate: () => {
      // RESET_PASSWORD_REQUEST equivalent
      return { loading: true, error: null }
    },
    onSuccess: (data) => {
      // RESET_PASSWORD_SUCCESS equivalent
      if (data.success) {
        enqueueSnackbar(data.message || 'Password reset successfully!', {
          variant: 'success',
        })
      }
      return {
        loading: false,
        resetPasswordInfo: data,
        success: data.success === true ? data.message : null,
        error: null,
      }
    },
    onError: (error) => {
      // RESET_PASSWORD_FAIL equivalent
      const errorMessage = error.response?.data?.message || error.message
      enqueueSnackbar(errorMessage || 'Failed to reset password', {
        variant: 'error',
      })
      return {
        loading: false,
        error: errorMessage,
        success: null,
      }
    },
  })
}

// AuthchangePassword query following the specific pattern requested
export const AuthchangePassword = {
  state: {},
  reducers: {
    CHANGE_PASSWORD_REQUEST: (state, payload) => {
      return {
        loading: true,
      }
    },
    CHANGE_PASSWORD_SUCCESS: (state, payload) => {
      return {
        loading: false,
        changePasswordInfo: payload,
        success: payload.success === true ? payload.message : null,
      }
    },
    CHANGE_PASSWORD_FAIL: (state, payload) => {
      return {
        loading: false,
        // error: payload,
        error: payload.response
          ? payload.response.data?.message
          : payload.message,
      }
    },
  },
  effects: (dispatch) => {
    const { AuthchangePassword } = dispatch
    return {
      async changeUserPassword(formData) {
        try {
          AuthchangePassword.CHANGE_PASSWORD_REQUEST()

          const { data } = await api.post(
            `/api/v1.0/auth/changePassword`,
            formData,
          )

          AuthchangePassword.CHANGE_PASSWORD_SUCCESS(data)
          return Promise.resolve(data)
        } catch (error) {
          AuthchangePassword.CHANGE_PASSWORD_FAIL(error)
        }
      },
    }
  },
}

// Hook to use AuthchangePassword with React Query integration
export const useAuthChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.auth.changePassword(),
    mutationFn: async (formData) => {
      try {
        const { data } = await api.post(
          '/api/v1.0/auth/changePassword',
          formData,
        )
        return data
      } catch (error) {
        throw error
      }
    },
    onMutate: () => {
      // CHANGE_PASSWORD_REQUEST equivalent
      return { loading: true, error: null }
    },
    onSuccess: (data) => {
      // CHANGE_PASSWORD_SUCCESS equivalent
      if (data.success) {
        enqueueSnackbar(data.message || 'Password changed successfully!', {
          variant: 'success',
        })
      }
      return {
        loading: false,
        changePasswordInfo: data,
        success: data.success === true ? data.message : null,
        error: null,
      }
    },
    onError: (error) => {
      // CHANGE_PASSWORD_FAIL equivalent
      const errorMessage = error.response?.data?.message || error.message
      enqueueSnackbar(errorMessage || 'Failed to change password', {
        variant: 'error',
      })
      return {
        loading: false,
        error: errorMessage,
        success: null,
      }
    },
  })
}
