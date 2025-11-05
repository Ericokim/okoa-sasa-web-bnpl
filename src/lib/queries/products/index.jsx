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
      const request_id = crypto.randomUUID(); // Fresh per request

      const params = new URLSearchParams({
        request_id,
        amount: amount.toString(),
        organization,
        channel,
      });

      const response = await masokoApi.get(`/masoko/masoko-bnpl/products?${params}`);
      return response.data; // ← Return data, not full response
    },

    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep in memory 10 min
  });
};