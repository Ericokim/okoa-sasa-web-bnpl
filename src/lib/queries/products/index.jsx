// src/hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import masokoApi from "@/lib/api/api";
import { queryKeys } from "@/lib/queryKeys";

export const useProducts = (filters = {}) => {
  const {
    amount = 20000,
    organization = "liberty",
    channel = "ussd",
  } = filters;

  return useQuery({
    queryKey: queryKeys.masoko.products({ amount, organization, channel }),

    queryFn: async () => {
      const request_id = crypto.randomUUID();

      const params = new URLSearchParams({
        request_id,
        amount: amount.toString(),
        organization,
        channel,
      });

      const response = await masokoApi.get(`/masoko/masoko-bnpl/products?${params}`);
      
      console.log('🔍 Products Fetch Success:', {
        request_id,
        filters: { amount, organization, channel },
        response: response.data
      });

      return response.data;
    },

    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10, // Fixed: gcTime (not cacheTime in v5)
    refetchOnWindowFocus: false, // Prevent excessive refetches
  });
};