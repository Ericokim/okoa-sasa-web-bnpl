import { bnplQueryKeys } from '@/lib/queryKeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

// Get Profile Information of a User
export const useGetProfile = (userId) => {
  return useQuery({
    queryKey: bnplQueryKeys.profile.PROFILE_GET_BY_ID(userId),
    queryFn: () => api.get(`v1/user/${userId}`).then((res) => res.data),
    enabled: !!userId,
  })
}

//Update User Details
export const useUpdateUserDetails = (options = {}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.invoices.update(),
    mutationFn: async ({ updates }) => {
      const { data } = await api.put(`/v1/user/edit`, updates)
      return data
    },
    onSuccess: (payload) => {
      const success =
        payload.success === true
          ? payload.message
          : 'Profile Details updated successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      queryClient.invalidateQueries({
        queryKey: bnplQueryKeys.profile.PROFILE_GET_BY_ID,
      })
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update invoice'
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
    },
    ...options,
  })
}

//Update User Address

export function useUpdateUserAddress(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationKey: [bnplQueryKeys.profile.UPDATE_USER_ADDRESS],
    mutationFn: async (payload) => {
      const formData = {
        userId: payload.userId,
        address: payload.address,
        type: payload.type,
      }
      const { data } = await api.put(`/v1/user/address/edit`, formData)
      return data
    },
    onSuccess: (payload) => {
      let success = payload.message.includes('successfully')
        ? payload.message
        : payload.message
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 4000,
      })
      setTimeout(() => {
        return queryClient.invalidateQueries({
          queryKey: [queryKeys.licenses.PROFILE_GET_BY_ID],
        })
      }, 2000)
    },
    onError: (error, payload, context) => {
      let err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err, {
        variant: 'error',
      })
    },
    ...options,
  })
}

//Update User Notification Preferences
export function useUpdateNotificationPreferences(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationKey: [
      bnplQueryKeys.profile.UPDATE_USER_NOTIFICATION_PREFERENCES,
    ],
    mutationFn: async (payload) => {
      const formData = {
        userId: payload.userId,
        isActive: payload.isActive,
        type: payload.type,
      }

      const { data } = await api.put(
        `/v1/user/notification-preference/edit`,
        formData,
      )
      return data
    },
    onSuccess: (payload) => {
      let success = payload.message.includes('successfully')
        ? payload.message
        : payload.message
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 4000,
      })
      setTimeout(() => {
        return queryClient.invalidateQueries({
          queryKey: [bnplQueryKeys.profile.PROFILE_GET_BY_ID],
        })
      }, 2000)
    },
    onError: (error, payload, context) => {
      let err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err, {
        variant: 'error',
      })
    },
    ...options,
  })
}
