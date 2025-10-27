// Query key factory for consistent key management
export const queryKeys = {
  // Auth
  auth: {
    all: () => ['auth'],
    user: () => [...queryKeys.auth.all(), 'user'],
    login: () => [...queryKeys.auth.all(), 'login'],
    logout: () => [...queryKeys.auth.all(), 'logout'],
    resetPassword: () => [...queryKeys.auth.all(), 'resetPassword'],
    changePassword: () => [...queryKeys.auth.all(), 'changePassword'],
  },

  // Products
  products: {
    all: () => ['products'],
    list: (filters) => [...queryKeys.products.all(), 'list', filters],
    detail: (id) => [...queryKeys.products.all(), 'detail', id],
    search: (query) => [...queryKeys.products.all(), 'search', query],
    byCategory: (categoryId) => [...queryKeys.products.all(), 'category', categoryId],
    featured: () => [...queryKeys.products.all(), 'featured'],
    trending: () => [...queryKeys.products.all(), 'trending'],
    recommendations: (userId) => [...queryKeys.products.all(), 'recommendations', userId],
  },

  // Categories
  categories: {
    all: () => ['categories'],
    list: () => [...queryKeys.categories.all(), 'list'],
    detail: (id) => [...queryKeys.categories.all(), 'detail', id],
    tree: () => [...queryKeys.categories.all(), 'tree'],
  },

  // Cart
  cart: {
    all: () => ['cart'],
    user: (userId) => [...queryKeys.cart.all(), 'user', userId],
    add: () => [...queryKeys.cart.all(), 'add'],
    update: () => [...queryKeys.cart.all(), 'update'],
    remove: () => [...queryKeys.cart.all(), 'remove'],
    clear: () => [...queryKeys.cart.all(), 'clear'],
  },

  // Orders
  orders: {
    all: () => ['orders'],
    list: (filters) => [...queryKeys.orders.all(), 'list', filters],
    detail: (id) => [...queryKeys.orders.all(), 'detail', id],
    byUser: (userId) => [...queryKeys.orders.all(), 'user', userId],
    status: (status) => [...queryKeys.orders.all(), 'status', status],
    tracking: (orderId) => [...queryKeys.orders.all(), 'tracking', orderId],
  },

  // Customers
  customers: {
    all: () => ['customers'],
    list: (filters) => [...queryKeys.customers.all(), 'list', filters],
    detail: (id) => [...queryKeys.customers.all(), 'detail', id],
    search: (query) => [...queryKeys.customers.all(), 'search', query],
    addresses: (id) => [...queryKeys.customers.all(), 'addresses', id],
    wishlist: (id) => [...queryKeys.customers.all(), 'wishlist', id],
  },

  // Payments
  payments: {
    all: () => ['payments'],
    list: (filters) => [...queryKeys.payments.all(), 'list', filters],
    detail: (id) => [...queryKeys.payments.all(), 'detail', id],
    byOrder: (orderId) => [...queryKeys.payments.all(), 'order', orderId],
    methods: () => [...queryKeys.payments.all(), 'methods'],
    process: () => [...queryKeys.payments.all(), 'process'],
  },

  // Inventory
  inventory: {
    all: () => ['inventory'],
    levels: () => [...queryKeys.inventory.all(), 'levels'],
    lowStock: () => [...queryKeys.inventory.all(), 'lowStock'],
    byProduct: (productId) => [...queryKeys.inventory.all(), 'product', productId],
  },

  // Dashboard
  dashboard: {
    all: () => ['dashboard'],
    stats: () => [...queryKeys.dashboard.all(), 'stats'],
    sales: () => [...queryKeys.dashboard.all(), 'sales'],
    orders: () => [...queryKeys.dashboard.all(), 'orders'],
    customers: () => [...queryKeys.dashboard.all(), 'customers'],
  },

  // Reports
  reports: {
    all: () => ['reports'],
    sales: (params) => [...queryKeys.reports.all(), 'sales', params],
    products: (params) => [...queryKeys.reports.all(), 'products', params],
    customers: (params) => [...queryKeys.reports.all(), 'customers', params],
    analytics: () => [...queryKeys.reports.all(), 'analytics'],
  },

  // Settings
  settings: {
    all: () => ['settings'],
    user: () => [...queryKeys.settings.all(), 'user'],
    store: () => [...queryKeys.settings.all(), 'store'],
    shipping: () => [...queryKeys.settings.all(), 'shipping'],
    taxes: () => [...queryKeys.settings.all(), 'taxes'],
  },
};

export const QUERY_KEYS = {
  // Products
  PRODUCT_GET: 'fetchProducts',
  PRODUCT_SEARCH: 'searchProducts',
  PRODUCT_DETAIL: 'fetchProductDetail',
  PRODUCT_FEATURED: 'fetchFeaturedProducts',
  PRODUCT_TRENDING: 'fetchTrendingProducts',
  PRODUCT_RECOMMENDATIONS: 'fetchProductRecommendations',

  // Categories
  CATEGORY_GET: 'fetchCategories',
  CATEGORY_TREE: 'fetchCategoryTree',

  // Cart
  CART_GET: 'fetchCart',
  CART_ADD: 'addToCart',
  CART_UPDATE: 'updateCartItem',
  CART_REMOVE: 'removeFromCart',
  CART_CLEAR: 'clearCart',

  // Orders
  ORDER_GET: 'fetchOrders',
  ORDER_CREATE: 'createOrder',
  ORDER_DETAIL: 'fetchOrderDetail',
  ORDER_TRACKING: 'trackOrder',
  ORDER_UPDATE_STATUS: 'updateOrderStatus',

  // Customers
  CUSTOMER_GET: 'fetchCustomers',
  CUSTOMER_DETAIL: 'fetchCustomerDetail',
  CUSTOMER_ADDRESSES: 'fetchCustomerAddresses',
  CUSTOMER_WISHLIST: 'fetchCustomerWishlist',
  CUSTOMER_UPDATE: 'updateCustomer',

  // Payments
  PAYMENT_GET: 'fetchPayments',
  PAYMENT_METHODS: 'fetchPaymentMethods',
  PAYMENT_PROCESS: 'processPayment',
  PAYMENT_CREATE: 'createPayment',

  // Authentication
  AUTH_LOGIN: 'auth/login',
  AUTH_LOGOUT: 'auth/logout',
  AUTH_REGISTER: 'auth/register',
  AUTH_VALIDATE_OTP: 'auth/validate-otp',
  AUTH_RESET_PASSWORD: 'auth/reset-password',

  // Dashboard
  DASHBOARD_STATS: 'fetchDashboardStats',
  DASHBOARD_SALES: 'fetchDashboardSales',
  DASHBOARD_ORDERS: 'fetchDashboardOrders',

  // Inventory
  INVENTORY_LEVELS: 'fetchInventoryLevels',
  INVENTORY_LOW_STOCK: 'fetchLowStockItems',
};
