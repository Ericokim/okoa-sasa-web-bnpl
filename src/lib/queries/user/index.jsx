import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import masokoApi from '@/lib/api/api'
import { queryKeys } from '@/lib/queryKeys'

/**
 * useUpdateUser
 * PUT /users
 * Updates or synchronizes user information.
 */
export function useUpdateUser(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.users.update(),

    mutationFn: async (payload) => {
      const { data } = await masokoApi.put('/users', payload)
      return data
    },

    onSuccess: (response) => {
      const message = response?.status?.message || 'User updated successfully'
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 4000 })

      // Invalidate every possible list cache
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
        'Failed to update user'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })
    },

    ...options,
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

  return useMutation({
    mutationKey: queryKeys.masoko.users.addressUpdate(),

    mutationFn: async (payload) => {
      const { data } = await masokoApi.put('/users/address', payload)
      return data
    },

    onSuccess: (response, payload) => {
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
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update address'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })
    },

    ...options,
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

  return useMutation({
    mutationKey: queryKeys.masoko.users.notificationPreferenceUpdate(),

    mutationFn: async (payload) => {
      const { data } = await masokoApi.put(
        '/users/notification-preference',
        payload,
      )
      return data
    },

    onSuccess: (response, payload) => {
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
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update notification preferences'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })
    },

    ...options,
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

  return useMutation({
    mutationKey: queryKeys.masoko.users.profilePhotoUpdate(),

    mutationFn: async (payload) => {
      const { data } = await masokoApi.put('/users/profile-photo', payload)
      return data
    },

    onSuccess: (response, payload) => {
      const message =
        response?.status?.message || 'Profile photo updated successfully'
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 4000 })

      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.users.all(),
        type: 'all',
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.masoko.users.me() })
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update profile photo'

      enqueueSnackbar(errMsg, { variant: 'error', autoHideDuration: 4000 })
    },

    ...options,
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
      const { data } = await masokoApi.patch(
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
      const { data } = await masokoApi.delete(`/users/${userId}`)
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
