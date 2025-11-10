import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import bnplApi from '@/lib/api/bnplApi'
import { queryKeys } from '@/lib/queryKeys'

const resolveUserIdentifier = (...candidates) => {
  for (const value of candidates) {
    if (value !== undefined && value !== null && value !== '') {
      return value
    }
  }
  return undefined
}

/**
 * useFetchUserDetail
 * GET /v1/users/:id
 * Fetches a user's detailed information by ID.
 */
export function useFetchUserDetail(userId, options = {}) {
  const { enqueueSnackbar } = useSnackbar()

  return useQuery({
    queryKey: queryKeys.masoko.users.detail(userId),
    queryFn: async () => {
      const { data } = await bnplApi.get(`/users/${userId}`)
      return data
    },
    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch user details'
      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })
    },
    enabled: !!userId, // only runs if ID is provided
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    retry: 1,

    ...options,
  })
}

/**
 * useUpdateUser
 * PUT /users
 * Updates or synchronizes user information.
 */
export function useUpdateUser(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOverrides
  } = options

  return useMutation({
    mutationKey: queryKeys.masoko.users.update(),

    mutationFn: async (payload) => {
      const { data } = await bnplApi.put('/users', payload)
      return data
    },

    onSuccess: (response, payload, context) => {
      const message = response?.status?.message || 'User updated successfully'
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 4000 })

      const resolvedUserId = resolveUserIdentifier(
        payload?.userId,
        payload?.id,
        payload?.idNumber,
        response?.data?.userId,
        response?.data?.id,
      )

      if (resolvedUserId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.masoko.users.detail(resolvedUserId),
        })
        queryClient.invalidateQueries({
          queryKey: queryKeys.masoko.users.addresses(resolvedUserId),
        })
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.me(),
      })

      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.all(),
        type: 'all',
      })

      onSuccessOverride?.(response, payload, context)
    },

    onError: (error, payload, context) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update user'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })

      onErrorOverride?.(error, payload, context)
    },

    ...mutationOverrides,
  })
}

/**
 * useUpdateUserAddress
 * PUT /users/address
 * Updates or adds a user's address record.
 */
export function useUpdateUserAddress(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOverrides
  } = options

  return useMutation({
    mutationKey: queryKeys.masoko.users.addressUpdate(),

    mutationFn: async (payload) => {
      const { data } = await bnplApi.put('/users/address', payload)
      return data
    },

    onSuccess: (response, payload, context) => {
      const message =
        response?.status?.message || 'Address updated successfully'
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 4000 })

      // Refresh user address-related data
      queryClient.invalidateQueries({ queryKey: queryKeys.masoko.users.list() })
      queryClient.invalidateQueries({ queryKey: queryKeys.masoko.users.all() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.addresses(payload?.userId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.detail(payload?.userId),
      })

      onSuccessOverride?.(response, payload, context)
    },

    onError: (error, payload, context) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update address'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })

      onErrorOverride?.(error, payload, context)
    },

    ...mutationOverrides,
  })
}

/**
 * useUpdateUserNotificationPreference
 * PUT /users/notification-preference
 * Updates a user's notification preferences.
 */
export function useUpdateUserNotificationPreference(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOverrides
  } = options

  return useMutation({
    mutationKey: queryKeys.masoko.users.notificationPreferenceUpdate(),

    mutationFn: async (payload) => {
      const { data } = await bnplApi.put(
        '/users/notification-preference',
        payload,
      )
      return data
    },

    onSuccess: (response, payload, context) => {
      const message =
        response?.status?.message ||
        'Notification preferences updated successfully'
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 4000 })

      // Refresh related caches
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.detail(payload?.userId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.masoko.users.all() })
      queryClient.invalidateQueries({ queryKey: queryKeys.masoko.users.me() })

      onSuccessOverride?.(response, payload, context)
    },

    onError: (error, payload, context) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update notification preferences'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })

      onErrorOverride?.(error, payload, context)
    },

    ...mutationOverrides,
  })
}

/**
 * useUpdateUserProfilePhoto
 * PUT /users/profile-photo
 * Updates or uploads a user's profile photo.
 */
export function useUpdateUserProfilePhoto(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOverrides
  } = options

  return useMutation({
    mutationKey: queryKeys.masoko.users.profilePhotoUpdate(),

    mutationFn: async (payload) => {
      const { data } = await bnplApi.put('/users/profile-photo', payload)
      return data
    },

    onSuccess: (response, payload, context) => {
      const message =
        response?.status?.message || 'Profile photo updated successfully'
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 4000 })

      const resolvedUserId = resolveUserIdentifier(
        payload?.userId,
        payload?.id,
        response?.data?.userId,
        response?.data?.id,
      )

      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.all(),
        type: 'all',
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.masoko.users.me() })
      if (resolvedUserId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.masoko.users.detail(resolvedUserId),
        })
      }

      onSuccessOverride?.(response, payload, context)
    },

    onError: (error, payload, context) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update profile photo'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })

      onErrorOverride?.(error, payload, context)
    },

    ...mutationOverrides,
  })
}

/**
 * useUploadUserDocuments
 * PATCH /users/{userId}/upload-document
 * Uploads multiple documents for a user and returns success status per file.
 */
export function useUploadUserDocuments(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.users.uploadDocuments(),

    mutationFn: async ({ userId, documents }) => {
      const { data } = await bnplApi.patch(
        `/users/${userId}/upload-document`,
        documents,
      )
      return data
    },

    onSuccess: (response) => {
      const message =
        response?.status?.message || 'Documents uploaded successfully'
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 4000 })

      const userId = response?.userId ?? ''
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.detail(userId),
      })
      // Invalidate *every* user-related cache (list, search, etc.)
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.all(),
        type: 'all',
      })
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to upload documents'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })
    },

    ...options,
  })
}

/**
 * useCheckUserLoanAbility
 * POST /v1/users/loan-ability
 * Calculates or retrieves the user's loan eligibility based on pay details.
 */
export function useCheckUserLoanAbility(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.users.loanAbility(),

    // Expected payload:
    // { basicPay: number, netPay: number, term: number }
    mutationFn: async (payload) => {
      const { data } = await bnplApi.post('/users/loan-ability', payload)
      return data
    },

    onSuccess: (response) => {
      const message =
        response?.status?.message || 'Loan ability calculated successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      // Optional: revalidate related user or finance data
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.detail(),
      })
      // Invalidate related caches
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.all(),
        type: 'all',
      })
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to calculate loan ability'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })
    },

    ...options,
  })
}

/**
 * useDeleteUser
 * DELETE /users/:id
 * Deletes or deactivates a user account.
 */
export function useDeleteUser(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.users.delete(),

    mutationFn: async (userId) => {
      const { data } = await bnplApi.delete(`/users/${userId}`)
      return data
    },

    onSuccess: (response) => {
      const message = response?.status?.message || 'User deleted successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      // Invalidate related caches
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.all(),
        type: 'all',
      })
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to delete user'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })
    },

    ...options,
  })
}
