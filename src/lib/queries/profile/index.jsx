import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import bnplApi from '@/lib/api/bnplApi'
import { bnplQueryKeys } from '@/lib/queryKeys'

const buildProfileQueryKey = (userId) => [
  bnplQueryKeys.profile.PROFILE_GET_BY_ID,
  userId,
]

export const useGetProfile = (userId, options = {}) => {
  return useQuery({
    queryKey: buildProfileQueryKey(userId),
    queryFn: async () => {
      const { data } = await bnplApi.get(`/user/${userId}`)
      return data
    },
    enabled: Boolean(userId),
    ...options,
  })
}

export const useUpdateUserDetails = (options = {}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOptions
  } = options

  return useMutation({
    mutationKey: [bnplQueryKeys.profile.UPDATE_USER_DETAILS],
    mutationFn: async (updates) => {
      const { data } = await bnplApi.put('/user/edit', updates)
      return data
    },
    onSuccess: (response, updates, context) => {
      const message =
        response?.message ||
        response?.status?.message ||
        'Profile details updated successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      if (updates?.userId) {
        queryClient.invalidateQueries({
          queryKey: buildProfileQueryKey(updates.userId),
        })
      }

      onSuccessOverride?.(response, updates, context)
    },
    onError: (error, updates, context) => {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.status?.message ||
        error?.message ||
        'Failed to update profile details'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })

      onErrorOverride?.(error, updates, context)
    },
    ...mutationOptions,
  })
}

export const useUpdateUserAddress = (options = {}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOptions
  } = options

  return useMutation({
    mutationKey: [bnplQueryKeys.profile.UPDATE_USER_ADDRESS],
    mutationFn: async ({ userId, address, type }) => {
      const payload = { userId, address, type }
      const { data } = await bnplApi.put('/user/address/edit', payload)
      return data
    },
    onSuccess: (response, variables, context) => {
      const message =
        response?.message ||
        response?.status?.message ||
        'Address updated successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      if (variables?.userId) {
        queryClient.invalidateQueries({
          queryKey: buildProfileQueryKey(variables.userId),
        })
      }

      onSuccessOverride?.(response, variables, context)
    },
    onError: (error, variables, context) => {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.status?.message ||
        error?.message ||
        'Failed to update address'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })

      onErrorOverride?.(error, variables, context)
    },
    ...mutationOptions,
  })
}

export const useUpdateNotificationPreferences = (options = {}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOptions
  } = options

  return useMutation({
    mutationKey: [
      bnplQueryKeys.profile.UPDATE_USER_NOTIFICATION_PREFERENCES,
    ],
    mutationFn: async ({ userId, isActive, type }) => {
      const payload = { userId, isActive, type }
      const { data } = await bnplApi.put(
        '/user/notification-preference/edit',
        payload,
      )
      return data
    },
    onSuccess: (response, variables, context) => {
      const message =
        response?.message ||
        response?.status?.message ||
        'Notification preferences updated successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      if (variables?.userId) {
        queryClient.invalidateQueries({
          queryKey: buildProfileQueryKey(variables.userId),
        })
      }

      onSuccessOverride?.(response, variables, context)
    },
    onError: (error, variables, context) => {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.status?.message ||
        error?.message ||
        'Failed to update notification preferences'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })

      onErrorOverride?.(error, variables, context)
    },
    ...mutationOptions,
  })
}

export const useDeleteUser = (options = {}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const {
    onSuccess: onSuccessOverride,
    onError: onErrorOverride,
    ...mutationOptions
  } = options

  return useMutation({
    mutationKey: [bnplQueryKeys.profile.DELETE_USER],
    mutationFn: async (userId) => {
      const { data } = await bnplApi.delete(`/user/${userId}/delete`)
      return data
    },
    onSuccess: (response, userId, context) => {
      const message =
        response?.message ||
        response?.status?.message ||
        'User deleted successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      if (userId) {
        queryClient.invalidateQueries({
          queryKey: buildProfileQueryKey(userId),
        })
      }

      onSuccessOverride?.(response, userId, context)
    },
    onError: (error, userId, context) => {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.status?.message ||
        error?.message ||
        'Failed to delete user'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })

      onErrorOverride?.(error, userId, context)
    },
    ...mutationOptions,
  })
}
