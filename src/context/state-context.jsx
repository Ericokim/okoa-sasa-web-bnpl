import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react'
import {
  safeLocalStorage,
  getStorageData as getEncryptedItem,
  setStorageData as setEncryptedItem,
  clearStorageData as clearEncryptedStorage,
} from '@/lib/utils'

const StateContext = createContext(null)

const buildInitialCart = () => []

const normalizeProductId = (value) =>
  value === undefined || value === null ? '' : String(value)

export function ContextProvider({ children }) {
  const initialCart = useMemo(() => buildInitialCart(), [])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(initialCart)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTermState] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const searchDebounceRef = useRef()
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [checkoutFormData, setCheckoutFormData] = useState({})
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false)

  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }

    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim())
    }, 300)

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current)
      }
    }
  }, [searchTerm])

  const setSearchTerm = useCallback((value) => {
    setSearchTermState(typeof value === 'string' ? value : String(value ?? ''))
  }, [])

  const parseStoredJSON = useCallback((value) => {
    if (!value) return null
    try {
      if (typeof value === 'string') {
        return JSON.parse(value)
      }
      return value
    } catch {
      return null
    }
  }, [])

  const persistUserSession = useCallback(
    (userPayload) => {
      if (!userPayload) return
      try {
        safeLocalStorage.setItem('isAuthenticated', 'true')
        safeLocalStorage.setItem('user', JSON.stringify(userPayload))
      } catch {
        // Ignore persistence errors (e.g., private mode)
      }

      try {
        setEncryptedItem('userInfo', userPayload)
        const authRaw = getEncryptedItem('auth')
        const authData = parseStoredJSON(authRaw)
        if (authData) {
          setEncryptedItem('auth', {
            ...authData,
            user: userPayload,
          })
        }
      } catch {
        // Ignore encrypted storage errors
      }
    },
    [parseStoredJSON],
  )

  // Check for stored auth on mount
  useEffect(() => {
    try {
      const storedAuthFlag = safeLocalStorage.getItem('isAuthenticated')
      const storedUserRaw = safeLocalStorage.getItem('user')
      let hydratedUser = parseStoredJSON(storedUserRaw)
      let isSessionValid = storedAuthFlag === 'true'

      if (!hydratedUser) {
        hydratedUser = parseStoredJSON(getEncryptedItem('userInfo'))
      }

      const encryptedAuth = parseStoredJSON(getEncryptedItem('auth'))
      if (!isSessionValid && encryptedAuth?.token) {
        isSessionValid = true
        hydratedUser = hydratedUser || encryptedAuth?.user || null
      }

      if (isSessionValid) {
        setIsAuthenticated(true)
        if (hydratedUser) {
          setUser(hydratedUser)
          persistUserSession(hydratedUser)
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, [parseStoredJSON, persistUserSession])

  const login = useCallback(
    (userData = {}) => {
      const sanitizedUser = { ...userData }
      setIsAuthenticated(true)
      setUser(sanitizedUser)
      persistUserSession(sanitizedUser)
    },
    [persistUserSession],
  )

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
    try {
      safeLocalStorage.removeItem('isAuthenticated')
      safeLocalStorage.removeItem('user')
    } catch {
      // Ignore
    }

    try {
      clearEncryptedStorage()
    } catch {
      // Ignore
    }
  }, [])

  const syncProductCartState = useCallback((productId, changes) => {
    const normalizedId = normalizeProductId(productId)
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        normalizeProductId(product.id) === normalizedId ||
        normalizeProductId(product.sku) === normalizedId
          ? {
              ...product,
              ...(changes.inCart !== undefined
                ? { inCart: changes.inCart }
                : {}),
              ...(changes.cartQuantity !== undefined
                ? { cartQuantity: changes.cartQuantity }
                : {}),
            }
          : product,
      ),
    )
  }, [])

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      if (!quantity || quantity <= 0) return
      const normalizedQuantity = Math.max(1, Number(quantity) || 0)
      const normalizedId = normalizeProductId(productId)
      setCart((prevCart) => {
        const existing = prevCart.find(
          (item) => normalizeProductId(item.productId) === normalizedId,
        )

        if (existing) {
          const updatedQuantity = existing.quantity + normalizedQuantity

          if (updatedQuantity === existing.quantity) {
            return prevCart
          }

          const nextCart = prevCart.map((item) =>
            normalizeProductId(item.productId) === normalizedId
              ? { ...item, quantity: updatedQuantity }
              : item,
          )

          syncProductCartState(normalizedId, {
            inCart: true,
            cartQuantity: updatedQuantity,
          })

          return nextCart
        }

        syncProductCartState(normalizedId, {
          inCart: true,
          cartQuantity: normalizedQuantity,
        })

        return [
          ...prevCart,
          { productId: normalizedId, quantity: normalizedQuantity },
        ]
      })
    },
    [syncProductCartState],
  )

  const updateCartQuantity = useCallback(
    (productId, quantity) => {
      const normalizedId = normalizeProductId(productId)
      setCart((prevCart) => {
        const sanitizedQuantity = Math.max(0, Number(quantity) || 0)
        const clampedQuantity = sanitizedQuantity
        const exists = prevCart.find(
          (item) => normalizeProductId(item.productId) === normalizedId,
        )

        if (!exists && clampedQuantity <= 0) {
          syncProductCartState(normalizedId, {
            inCart: false,
            cartQuantity: 0,
          })
          return prevCart
        }

        if (clampedQuantity <= 0) {
          syncProductCartState(normalizedId, {
            inCart: false,
            cartQuantity: 0,
          })
          return prevCart.filter(
            (item) => normalizeProductId(item.productId) !== normalizedId,
          )
        }

        const nextCart = exists
          ? prevCart.map((item) =>
              normalizeProductId(item.productId) === normalizedId
                ? { ...item, quantity: clampedQuantity }
                : item,
            )
          : [...prevCart, { productId: normalizedId, quantity: clampedQuantity }]

        syncProductCartState(normalizedId, {
          inCart: true,
          cartQuantity: clampedQuantity,
        })

        return nextCart
      })
    },
    [syncProductCartState],
  )

  const removeFromCart = useCallback(
    (productId) => {
      const normalizedId = normalizeProductId(productId)
      setCart((prevCart) =>
        prevCart.filter(
          (item) => normalizeProductId(item.productId) !== normalizedId,
        ),
      )
      syncProductCartState(normalizedId, { inCart: false, cartQuantity: 0 })
    },
    [syncProductCartState],
  )

  const clearCart = useCallback(() => {
    setCart([])
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        inCart: false,
        cartQuantity: 0,
      })),
    )
  }, [])

  const toggleProductInCart = useCallback(
    (productId) => {
      const normalizedId = normalizeProductId(productId)
      if (
        cart.some(
          (item) => normalizeProductId(item.productId) === normalizedId,
        )
      ) {
        removeFromCart(productId)
      } else {
        addToCart(productId, 1)
      }
    },
    [cart, addToCart, removeFromCart],
  )

  const addProductToCart = useCallback(
    (productId, quantity = 1) => {
      addToCart(productId, quantity)
    },
    [addToCart],
  )

  const removeProductFromCart = useCallback(
    (productId) => {
      removeFromCart(productId)
    },
    [removeFromCart],
  )

  const isProductInCart = useCallback(
    (productId) => {
      const normalizedId = normalizeProductId(productId)
      return cart.some(
        (item) => normalizeProductId(item.productId) === normalizedId,
      )
    },
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const cartProducts = useMemo(() => {
    if (!Array.isArray(cart) || !Array.isArray(products)) {
      return []
    }

    return cart
      .map((item) => {
        const targetId = String(item.productId)
        const product = products.find((p) => {
          if (!p) return false
          const idMatch =
            p.id !== undefined && String(p.id) === targetId
          const skuMatch =
            p.sku !== undefined && String(p.sku) === targetId
          return idMatch || skuMatch
        })

        if (!product) return null

        return {
          ...product,
          quantity: item.quantity,
        }
      })
      .filter(Boolean)
  }, [cart, products])

  const getCartCount = useCallback(() => cartCount, [cartCount])

  const getCartProducts = useCallback(() => cartProducts, [cartProducts])

  const clearProductCart = useCallback(() => {
    clearCart()
  }, [clearCart])

  const findProductById = useCallback(
    (productId) => {
      if (productId === undefined || productId === null) {
        return undefined
      }

      const targetId = String(productId)
      return products.find((product) => {
        const productIdMatch = product?.id !== undefined
        const productSkuMatch = product?.sku !== undefined
        return (
          (productIdMatch && String(product.id) === targetId) ||
          (productSkuMatch && String(product.sku) === targetId)
        )
      })
    },
    [products],
  )

  const saveCheckoutFormData = useCallback((stepId, data) => {
    setCheckoutFormData((prev) => ({
      ...prev,
      [stepId]: data,
    }))
  }, [])

  const getCheckoutFormData = useCallback(
    (stepId) => {
      return checkoutFormData[stepId] || {}
    },
    [checkoutFormData],
  )

  const resetCheckout = useCallback(() => {
    setCheckoutStep(1)
    setCheckoutFormData({})
    setIsCheckoutCompleted(false)
  }, [])

  const goToCheckoutStep = useCallback((step) => {
    setCheckoutStep(step)
  }, [])

  const value = {
    isAuthenticated,
    user,
    cart,
    cartCount,
    cartProducts,
    login,
    logout,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartQuantity,
    products,
    setProducts,
    toggleProductInCart,
    addProductToCart,
    removeProductFromCart,
    isProductInCart,
    getCartCount,
    getCartProducts,
    clearProductCart,
    findProductById,
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    checkoutStep,
    setCheckoutStep,
    checkoutFormData,
    saveCheckoutFormData,
    getCheckoutFormData,
    isCheckoutCompleted,
    setIsCheckoutCompleted,
    resetCheckout,
    goToCheckoutStep,
  }

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export function useStateContext() {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error('useStateContext must be used within ContextProvider')
  }
  return context
}
