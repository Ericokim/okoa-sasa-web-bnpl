import { useQuery } from '@tanstack/react-query'
import masokoApi from '@/lib/api/api'
import { queryKeys } from '@/lib/queryKeys'

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
