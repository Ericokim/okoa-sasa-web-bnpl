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
  formatCurrency,
} from '@/lib/utils'
import {
  normalizeKenyanPhoneNumber,
  formatKenyanMsisdn,
} from '@/lib/validation'
import { useAccountStore } from '@/data/accountStore'

const StateContext = createContext(null)

const normalizeProductId = (value) =>
  value === undefined || value === null ? '' : String(value)

const FALLBACK_PRODUCT_IMAGE = '/product.png'

const toNumber = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const sanitizeUserPayload = (userData = {}) => {
  if (!userData || typeof userData !== 'object') {
    return {}
  }

  const rawPhone =
    userData.phoneNumber || userData.phone || userData.msisdn || ''
  const normalizedPhone = normalizeKenyanPhoneNumber(rawPhone) || ''
  const msisdn = formatKenyanMsisdn(normalizedPhone || rawPhone || '')

  return {
    ...userData,
    ...(normalizedPhone ? { phoneNumber: normalizedPhone } : {}),
    ...(msisdn
      ? { msisdn }
      : userData.msisdn
        ? { msisdn: userData.msisdn }
        : {}),
  }
}

const buildProductSnapshot = (product) => {
  if (!product || typeof product !== 'object') return null
  const id = normalizeProductId(product.id ?? product.productId ?? product.sku)
  const priceValue =
    product.price ?? product.amount ?? product.priceValue ?? product.priceLabel
  const price = toNumber(priceValue)
  const primaryImage = (() => {
    if (typeof product.image === 'string' && product.image.trim()) {
      return product.image.trim()
    }
    if (Array.isArray(product.images) && product.images.length > 0) {
      const candidate = product.images[0]
      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate.trim()
      }
    }
    if (typeof product.thumbnail === 'string' && product.thumbnail.trim()) {
      return product.thumbnail.trim()
    }
    return FALLBACK_PRODUCT_IMAGE
  })()

  const title = product.title ?? product.name ?? product.productName ?? ''

  return {
    id,
    sku: product.sku ? String(product.sku) : undefined,
    title,
    name: product.name ?? title,
    brand: product.brand ?? '',
    category: product.category ?? '',
    description:
      product.description ?? product.descriptionText ?? product.summary ?? '',
    image: primaryImage,
    price,
    priceLabel:
      product.priceLabel ?? (price > 0 ? formatCurrency(price) : undefined),
  }
}

const sanitizeCartProductSnapshot = (value) => {
  if (!value || typeof value !== 'object') return null
  const price = toNumber(value.price)
  return {
    id: normalizeProductId(value.id ?? value.productId ?? value.sku),
    sku: value.sku ? String(value.sku) : undefined,
    title: value.title ?? value.name ?? '',
    name: value.name ?? value.title ?? '',
    brand: value.brand ?? '',
    category: value.category ?? '',
    description: value.description ?? '',
    image:
      typeof value.image === 'string' && value.image.trim()
        ? value.image.trim()
        : FALLBACK_PRODUCT_IMAGE,
    price,
    priceLabel: value.priceLabel ?? (price > 0 ? formatCurrency(price) : undefined),
  }
}

const CART_STORAGE_KEY = 'okoa-sasa-cart'
const CART_STORAGE_VERSION = 1

const normalizeStoredCartEntries = (entries) => {
  if (!Array.isArray(entries)) return []

  return entries
    .map((item) => {
      const productId = normalizeProductId(
        item?.productId ?? item?.id ?? item?.sku,
      )
      if (!productId) return null

      const quantity = Math.max(1, Number(item?.quantity) || 1)
      const productSnapshot = sanitizeCartProductSnapshot(
        item?.productSnapshot ?? item?.snapshot ?? null,
      )

      return productSnapshot
        ? { productId, quantity, productSnapshot }
        : { productId, quantity }
    })
    .filter(Boolean)
}

const readStoredCart = () => {
  try {
    const rawValue = safeLocalStorage.getItem(CART_STORAGE_KEY)
    if (!rawValue) return []
    const parsed = JSON.parse(rawValue)

    if (Array.isArray(parsed)) {
      // Legacy format (just an array)
      return normalizeStoredCartEntries(parsed)
    }

    if (
      parsed &&
      typeof parsed === 'object' &&
      Array.isArray(parsed.items)
    ) {
      return normalizeStoredCartEntries(parsed.items)
    }

    return []
  } catch {
    return []
  }
}

const writeStoredCart = (items) => {
  try {
    const payload = {
      version: CART_STORAGE_VERSION,
      updatedAt: Date.now(),
      items: normalizeStoredCartEntries(items),
    }
    safeLocalStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload))
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
  const isBrowserEnv = typeof window !== 'undefined'
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(() =>
    isBrowserEnv ? buildInitialCart() : [],
  )
  const [hasHydratedCart, setHasHydratedCart] = useState(isBrowserEnv)
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
    try {
      const syncPersonalInfo = useAccountStore.getState().syncFromUser
      syncPersonalInfo?.(user || null)
    } catch {
      // ignore syncing issues
    }
  }, [user])

  useEffect(() => {
    if (!isBrowserEnv) return

    let storageArea = null
    try {
      storageArea = window.localStorage
    } catch {
      storageArea = null
    }

    if (!storageArea) {
      setHasHydratedCart(true)
      return
    }

    if (!hasHydratedCart) {
      const storedCart = buildInitialCart()
      setCart(storedCart)
      setHasHydratedCart(true)
    }

    const handleStorage = (event) => {
      if (event.storageArea !== storageArea || event.key !== CART_STORAGE_KEY) {
        return
      }
      setCart(buildInitialCart())
    }

    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [isBrowserEnv, hasHydratedCart])

  useEffect(() => {
    if (!hasHydratedCart) return
    writeStoredCart(cart)
  }, [cart, hasHydratedCart])

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
          const sanitizedUser = sanitizeUserPayload(hydratedUser)
          setUser(sanitizedUser)
          persistUserSession(sanitizedUser)
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, [parseStoredJSON, persistUserSession])

  const login = useCallback(
    (userData = {}) => {
      const sanitizedUser = sanitizeUserPayload(userData)
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
    (productId, quantity = 1, productDetails = null) => {
      if (!quantity || quantity <= 0) return
      const normalizedQuantity = Math.max(1, Number(quantity) || 0)
      const normalizedId = normalizeProductId(productId)
      const resolvedProductDetails =
        productDetails ??
        products.find((product) => {
          if (!product) return false
          return (
            normalizeProductId(product.id) === normalizedId ||
            normalizeProductId(product.sku) === normalizedId
          )
        })
      const snapshot = buildProductSnapshot(resolvedProductDetails)
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
              ? {
                  ...item,
                  quantity: updatedQuantity,
                  productSnapshot: snapshot ?? item.productSnapshot,
                }
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
          {
            productId: normalizedId,
            quantity: normalizedQuantity,
            productSnapshot: snapshot,
          },
        ]
      })
    },
    [products, syncProductCartState],
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
          : [
              ...prevCart,
              {
                productId: normalizedId,
                quantity: clampedQuantity,
                productSnapshot: buildProductSnapshot(
                  products.find((product) => {
                    if (!product) return false
                    return (
                      normalizeProductId(product.id) === normalizedId ||
                      normalizeProductId(product.sku) === normalizedId
                    )
                  }),
                ),
              },
            ]

        syncProductCartState(normalizedId, {
          inCart: true,
          cartQuantity: clampedQuantity,
        })

        return nextCart
      })
    },
    [products, syncProductCartState],
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
        const productDetails = products.find((product) => {
          if (!product) return false
          return (
            normalizeProductId(product.id) === normalizedId ||
            normalizeProductId(product.sku) === normalizedId
          )
        })
        addToCart(productId, 1, productDetails)
      }
    },
    [cart, addToCart, products, removeFromCart],
  )

  const addProductToCart = useCallback(
    (productId, quantity = 1, productDetails = null) => {
      addToCart(productId, quantity, productDetails)
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

        const snapshot = item.productSnapshot
        const fallback = snapshot
          ? {
              ...snapshot,
              price: snapshot.price ?? 0,
              priceLabel:
                snapshot.priceLabel ??
                (snapshot.price ? formatCurrency(snapshot.price) : undefined),
            }
          : null

        const resolvedProduct = product ?? fallback

        if (!resolvedProduct) {
          return {
            id: item.productId,
            title: `Product ${item.productId}`,
            name: 'Product details unavailable',
            price: 0,
            priceLabel: formatCurrency(0),
            image: FALLBACK_PRODUCT_IMAGE,
            quantity: item.quantity,
          }
        }

        const priceValue = toNumber(resolvedProduct.price)

        return {
          ...resolvedProduct,
          id: resolvedProduct.id ?? item.productId,
          price: priceValue,
          priceLabel:
            resolvedProduct.priceLabel ?? formatCurrency(priceValue ?? 0),
          image:
            resolvedProduct.image && resolvedProduct.image.trim()
              ? resolvedProduct.image
              : FALLBACK_PRODUCT_IMAGE,
          title: resolvedProduct.title ?? resolvedProduct.name ?? 'Product',
          name:
            resolvedProduct.name ??
            resolvedProduct.description ??
            resolvedProduct.title ??
            '',
          quantity: item.quantity,
          cartQuantity: item.quantity,
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

  const goToCheckoutStep = useCallback(
    (step) => {
      setCheckoutStep(step)
    },
    [setCheckoutStep],
  )

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
