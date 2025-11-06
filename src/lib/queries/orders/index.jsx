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
