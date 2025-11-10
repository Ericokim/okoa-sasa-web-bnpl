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

const normalizeProductId = (value) =>
  value === undefined || value === null ? '' : String(value)

const CART_STORAGE_KEY = 'okoa-sasa-cart'

const readStoredCart = () => {
  try {
    const rawValue = safeLocalStorage.getItem(CART_STORAGE_KEY)
    if (!rawValue) return []
    const parsed = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((item) => {
        const productId = normalizeProductId(
          item?.productId ?? item?.id ?? item?.sku,
        )
        const quantity = Math.max(1, Number(item?.quantity) || 1)
        return productId ? { productId, quantity } : null
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

const writeStoredCart = (items) => {
  try {
    safeLocalStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore persistence errors
  }
}

const buildInitialCart = () => readStoredCart()

const CHECKOUT_FORM_STORAGE_KEY = 'checkout-form-data'
const CHECKOUT_STEP_STORAGE_KEY = 'checkout-active-step'

const sanitizeForStorage = (value, seen = new WeakSet()) => {
  if (value === null || typeof value !== 'object') {
    return value
  }

  const FileCtor = typeof File !== 'undefined' ? File : null
  const BlobCtor = typeof Blob !== 'undefined' ? Blob : null

  if (FileCtor && value instanceof FileCtor) {
    return null
  }
  if (BlobCtor && value instanceof BlobCtor) {
    return null
  }
  if (value instanceof Date) {
    return value.toISOString()
  }

  if (seen.has(value)) {
    return null
  }
  seen.add(value)

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForStorage(item, seen))
  }

  return Object.entries(value).reduce((acc, [key, val]) => {
    acc[key] = sanitizeForStorage(val, seen)
    return acc
  }, {})
}

const loadCheckoutFormData = () => {
  try {
    const raw = safeLocalStorage.getItem(CHECKOUT_FORM_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const loadCheckoutStep = () => {
  try {
    const raw = safeLocalStorage.getItem(CHECKOUT_STEP_STORAGE_KEY)
    const parsed = Number(raw)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
  } catch {
    return 1
  }
}

export function ContextProvider({ children }) {
  const initialCart = useMemo(() => buildInitialCart(), [])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(initialCart)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTermState] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const searchDebounceRef = useRef()
  const [checkoutStep, setCheckoutStepState] = useState(() =>
    loadCheckoutStep(),
  )
  const [checkoutFormData, setCheckoutFormDataState] = useState(() =>
    loadCheckoutFormData(),
  )
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false)

  useEffect(() => {
    writeStoredCart(cart)
  }, [cart])

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

  const persistCheckoutFormData = useCallback((data) => {
    try {
      const sanitized = sanitizeForStorage(data)
      safeLocalStorage.setItem(
        CHECKOUT_FORM_STORAGE_KEY,
        JSON.stringify(sanitized),
      )
    } catch {
      // ignore persistence errors
    }
  }, [])

  const persistCheckoutStep = useCallback((step) => {
    try {
      safeLocalStorage.setItem(CHECKOUT_STEP_STORAGE_KEY, String(step))
    } catch {
      // ignore
    }
  }, [])

  const setCheckoutStep = useCallback(
    (value) => {
      setCheckoutStepState((prev) => {
        const nextValue = typeof value === 'function' ? value(prev) : value
        const normalized =
          Number.isFinite(nextValue) && nextValue > 0 ? nextValue : 1
        persistCheckoutStep(normalized)
        return normalized
      })
    },
    [persistCheckoutStep],
  )

  const saveCheckoutFormData = useCallback(
    (stepId, data) => {
      setCheckoutFormDataState((prev) => {
        const next = {
          ...prev,
          [stepId]: data,
        }
        persistCheckoutFormData(next)
        return next
      })
    },
    [persistCheckoutFormData],
  )

  const getCheckoutFormData = useCallback(
    (stepId) => {
      return checkoutFormData[stepId] || {}
    },
    [checkoutFormData],
  )

  const clearCheckoutPersistence = useCallback(() => {
    try {
      safeLocalStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY)
      safeLocalStorage.removeItem(CHECKOUT_STEP_STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const resetCheckout = useCallback(() => {
    setCheckoutStep(1)
    setCheckoutFormDataState({})
    setIsCheckoutCompleted(false)
    clearCheckoutPersistence()
  }, [setCheckoutStep, clearCheckoutPersistence])

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
