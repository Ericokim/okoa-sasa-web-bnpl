// src/lib/queryKeys.js
export const queryKeys = {
  masoko: {
    products: ({ amount, organization, channel }) => [
      'masoko-products',
      amount,
      organization,
      channel,
    ],
  },
}

export const backendQueryKeys = {
  // Orders
  orders: {
    // orders query keys
    ORDER_GET: 'getOrders',
    ORDER_GET_BY_ID: 'getOrderByID',
  },
}
