import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import masokoApi from '@/lib/api/api'
import { queryKeys } from '@/lib/queryKeys'
import { useSnackbar } from 'notistack'

export const useRegion = () => {
  return useQuery({
    queryKey: queryKeys.masoko.regions({}),

    queryFn: async () => {
      const response = await masokoApi.get(`/masoko/masoko-bnpl/regions`)
      return response.data
    },

    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  })
}

export const usePickUpPoint = () => {
  return useQuery({
    queryKey: queryKeys.masoko.pickUpPoints({}),

    queryFn: async () => {
      const response = await masokoApi.get(`/masoko/masoko-bnpl/pick-up-points`)
      return response.data
    },

    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  })
}
import { useQueryClient } from '@tanstack/react-query'
import { backendQueryKeys} from '@/lib/queryKeys'

export function useGetAllOrders(params, options) {
  const queryClient = useQueryClient()

  // Build query key memoized to prevent unnecessary re-fetch
  const queryKey = React.useMemo(
    () => [backendQueryKeys.orders.ORDER_GET, params],
    [params],
  )

  // Build URLSearchParams memoized to prevent unnecessary recalculations
  const queryParams = React.useMemo(() => {
    return new URLSearchParams({
      page: params.page,
      pageSize: params.pageSize,
      ...(params.customerId !== undefined && { customerId: params.customerId }),
      ...(params.regionId && { regionId: params.regionId }),
      ...(params.storeId && { storeId: params.storeId }),
      ...(params.employer && { employer: params.employer }),
      ...(params.status && { status: params.status }),
    })
  }, [params])

  // Build full endpoint URL
  let url = `/v1/order/list?${queryParams.toString()}`
  url = url.endsWith('?') ? url.slice(0, -1) : url

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get(url)
      const response = {
        rows: data?.data || [],
        message: data?.message,
        pageCount: data?.count ?? data?.length,
      }

      return response
    },
    select: (payload) => {
      return payload
    },
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    placeholderData: keepPreviousData,
    enabled: true,
    ...options,
  })
}

// create order
export function useCreateOrder(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationKey: queryKeys.masoko.oders.createOrder(),
    mutationFn: async (payload) => {
      const { data } = await masokoApi.post(`/orders`, payload) //change to point bnpl endpoint
      return data
    },
    onSuccess: (payload) => {
      const success = payload.message?.includes('Successfully')
        ? payload.message
        : 'Order created successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 4000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.oders.getAllOrders(),
      })
    },
    onError: (error) => {
      const err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err || 'Failed to create order', {
        variant: 'error',
      })
    },
    ...options,
  })
}

// Loan Limit
export function useSaveLoanLimit(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.oders.saveLoanLimit(),
    mutationFn: async (payload) => {
      const { data } = await masokoApi.post(`/loan-limit`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Loan limit saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      // Optionally invalidate related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.saveLoanLimit(),
      })
    },
    onError: (error) => {
      const err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err || 'Failed to save loan limit', {
        variant: 'error',
      })
    },
    ...options,
  })
}

//Personal Info
export function useSavePersonalInfo(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.oders.savePersonalInfo(),
    mutationFn: async (payload) => {
      const { data } = await masokoApi.post(`/personal-info`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Personal information saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.oders.savePersonalInfo(),
      })
    },
    onError: (error) => {
      const err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err || 'Failed to save personal information', {
        variant: 'error',
      })
    },
    ...options,
  })
}

// Save Delivery Details
export function useSaveDeliveryDetails(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.oders.saveDeliveryDetails(),
    mutationFn: async (payload) => {
      const { data } = await masokoApi.post(`/delivery-details`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Delivery details saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.oders.saveDeliveryDetails(),
      })
    },
    onError: (error) => {
      const err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err || 'Failed to save delivery details', {
        variant: 'error',
      })
    },
    ...options,
  })
}

//  Save Order Summary
export function useSaveOrderSummary(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.oders.saveOrderSummary(),
    mutationFn: async (payload) => {
      const { data } = await masokoApi.post(`/order-summary`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Order summary saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.oders.saveOrderSummary(),
      })
    },
    onError: (error) => {
      const err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err || 'Failed to save order summary', {
        variant: 'error',
      })
    },
    ...options,
  })
}

// Save Terms & Conditions Consents
export function useSaveTermsConsents(options) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.oders.saveTermsConsents(),
    mutationFn: async (payload) => {
      const { data } = await masokoApi.post(`/terms-consents`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Terms and consents saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.oders.saveTermsConsents(),
      })
    },
    onError: (error) => {
      const err = error.response ? error.response.data?.message : error.message
      enqueueSnackbar(err || 'Failed to save terms and consents', {
        variant: 'error',
      })
    },
    ...options,
  })
}
