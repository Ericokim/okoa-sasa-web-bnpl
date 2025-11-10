import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import masokoApi from '@/lib/api/masokoApi'
import bnplApi from '@/lib/api/bnplApi'
import { queryKeys } from '@/lib/queryKeys'
import { useSnackbar } from 'notistack'
import { bnplQueryKeys } from '@/lib/queryKeys'

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

/**
 * useCreateOrder
 * POST /v1/orders
 * Creates a new BNPL order with all relevant customer, shipping, and credit data.
 */
export function useCreateOrder(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.orders.create(),
    mutationFn: async (payload) => {
      const { data } = await bnplApi.post('/orders', payload)
      return data
    },

    onSuccess: (response) => {
      const message = response?.status?.message || 'Order created successfully'
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      // Invalidate relevant order caches
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.list(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.all(),
      })
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to create order'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })
    },
    ...options,
  })
}

/**
 * useUploadOrderDocuments
 * PATCH /v1/orders/:id/upload-document
 * Uploads or updates documents attached to a specific order.
 */
export function useUploadOrderDocuments(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.orders.uploadDocuments(),
    mutationFn: async ({ orderId, documents }) => {
      const { data } = await bnplApi.patch(
        `/orders/${orderId}/upload-document`,
        documents,
      )
      return data
    },

    onSuccess: (response, { orderId }) => {
      const message =
        response?.status?.message || 'Documents uploaded successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      // Refresh related order data
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.detail(orderId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.list(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.all(),
      })
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to upload documents'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })
    },

    ...options,
  })
}

/**
 * useGetOrdersList
 * GET /v1/orders
 * Fetches all orders with optional filters.
 */
export function useGetOrdersList(filters = {}, options = {}) {
  const { enqueueSnackbar } = useSnackbar()

  return useQuery({
    queryKey: queryKeys.masoko.orders.list(filters),

    queryFn: async () => {
      const { data } = await bnplApi.get('/orders', { params: filters })
      return data
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to load orders list'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })
    },

    staleTime: 1000 * 60 * 2, // cache for 2 minutes
    retry: 1,
    ...options,
  })
}

/**
 * useGetOrderDetail
 * GET /v1/orders/:id
 * Fetches detailed information about a specific order.
 */
export function useGetOrderDetail(orderId, options = {}) {
  const { enqueueSnackbar } = useSnackbar()

  return useQuery({
    queryKey: queryKeys.masoko.orders.detail(orderId),

    queryFn: async () => {
      const { data } = await bnplApi.get(`/orders/${orderId}`)
      return data
    },

    enabled: !!orderId, // only run if orderId is provided
    retry: 1,
    staleTime: 1000 * 60 * 3, // 3 minutes cache

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to load order details'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
      })
    },

    ...options,
  })
}

/**
 * useUpdateOrder
 * PUT /v1/orders
 * Updates an existing order (shipping detail, credit data, documents, etc.).
 */
export function useUpdateOrder(options = {}) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationKey: queryKeys.masoko.orders.update('order'),

    mutationFn: async (payload) => {
      const { data } = await bnplApi.put('/orders', payload)
      return data
    },

    onSuccess: (response, payload) => {
      const message = response?.status?.message || 'Order updated successfully'

      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 4000,
      })

      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.detail(payload?.orderId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.list(),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.all(),
      })
    },

    onError: (error) => {
      const errMsg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update order'

      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 4000,
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
    mutationKey: queryKeys.masoko.orders.update('loan-limit'),
    mutationFn: async (payload) => {
      const { data } = await bnplApi.post(`/loan-limit`, payload)
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
        queryKey: queryKeys.masoko.orders.update('loan-limit'),
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
    mutationKey: queryKeys.masoko.orders.update('personal-info'),
    mutationFn: async (payload) => {
      const { data } = await bnplApi.post(`/personal-info`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Personal information saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.update('personal-info'),
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
    mutationKey: queryKeys.masoko.orders.update('delivery-details'),
    mutationFn: async (payload) => {
      const { data } = await bnplApi.post(`/delivery-details`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Delivery details saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.update('delivery-details'),
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
    mutationKey: queryKeys.masoko.orders.update('order-summary'),
    mutationFn: async (payload) => {
      const { data } = await bnplApi.post(`/order-summary`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Order summary saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.update('order-summary'),
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
    mutationKey: queryKeys.masoko.orders.update('terms-consents'),
    mutationFn: async (payload) => {
      const { data } = await bnplApi.post(`/terms-consents`, payload)
      return data
    },
    onSuccess: (data) => {
      const success = data.message || 'Terms and consents saved successfully'
      enqueueSnackbar(success, {
        variant: 'success',
        autoHideDuration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.masoko.orders.update('terms-consents'),
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
