// src/hooks/useProducts.js
import React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import api from '@/lib/api'
import masokoApi from '@/lib/api/api'
import { queryKeys } from '@/lib/queryKeys'
import { useProducts } from '@/lib/queries/products/index'

// Hook to get all invoices with filters

export function useProductList(params, options) {
  const queryClient = useQueryClient()

  // Memoize the query key and query parameters
  const queryKey = React.useMemo(
    () => queryKeys.masoko.products.list(params),
    [params],
  )

  // Memoize queryParams to ensure it is only recalculated when params change
  const queryParams = React.useMemo(() => {
    return new URLSearchParams({
      request_id: crypto.randomUUID(), // Fresh per request
      amount: params?.amount || '20000',
      organization: 'liberty',
      channel: 'ussd',
      ...params,
    })
  }, [params])

  // https://api.dxlsandbox.safaricom.co.ke/masoko/masoko-bnpl/products?request_id=123456&amount=20000&organization=liberty&channel=ussd

  let url = `/masoko/masoko-bnpl/products?${queryParams.toString()}`
  url = url.endsWith('?') ? url.slice(0, -1) : url // Removing the trailing '?' if exists and no parameters are added

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await masokoApi.get(url)
      const response = {
        rows: data?.data || [],
        message: data?.message,
        pageCount: data?.count ?? data?.length,
      }
      return response
    },
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    placeholderData: keepPreviousData,
    enabled: true,
    ...options,
  })
}

export const useProducts = (filters = {}) => {
  const { amount = 20000, organization = 'liberty', channel = 'ussd' } = filters

  return useQuery({
    queryKey: queryKeys.masoko.products({ amount, organization, channel }),

    queryFn: async () => {
      const request_id = crypto.randomUUID() // Fresh per request

      const params = new URLSearchParams({
        request_id,
        amount: amount.toString(),
        organization,
        channel,
      })

      const response = await masokoApi.get(
        `/masoko/masoko-bnpl/products?${params}`,
      )
      return response.data // ← Return data, not full response
    },

    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep in memory 10 min
  })
}
