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
  //profile
  profile: {
    //profile query keys
    PROFILE_GET_BY_ID: 'getProfileByID',
    UPDATE_USER_DETAILS: 'updateUserDetails',
    UPDATE_USER_ADDRESS: 'updateUserAddress',
    UPDATE_USER_NOTIFICATION_PREFERENCES: 'updateUserNotificationPreferences',
    UPDATE_PROFILE_PHOTO: 'updateProfilePhoto',
  }
}
