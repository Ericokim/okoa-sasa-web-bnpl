import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { productCatalog } from '@/data/products'

const StateContext = createContext(null)

export const MAX_CART_QUANTITY = 5

const buildInitialCart = () =>
  productCatalog
    .filter((product) => product.inCart)
    .map((product) => ({
      productId: product.id,
      quantity: Math.max(1, product.cartQuantity ?? 1),
    }))

const buildInitialProducts = (initialCart) =>
  productCatalog.map((product) => {
    const cartItem = initialCart.find((item) => item.productId === product.id)
    return {
      ...product,
      inCart: Boolean(cartItem),
      cartQuantity: cartItem?.quantity ?? 0,
    }
  })

export function ContextProvider({ children }) {
  const initialCart = useMemo(() => buildInitialCart(), [])
  const initialProducts = useMemo(
    () => buildInitialProducts(initialCart),
    [initialCart],
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(initialCart)
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')



  // Check for stored auth on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')

    if (storedAuth === 'true') {
      setIsAuthenticated(true)
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const login = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const syncProductCartState = useCallback((productId, changes) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...(changes.inCart !== undefined ? { inCart: changes.inCart } : {}),
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
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.productId === productId)

        if (existing) {
          const updatedQuantity = Math.min(
            MAX_CART_QUANTITY,
            existing.quantity + normalizedQuantity,
          )

          if (updatedQuantity === existing.quantity) {
            return prevCart
          }

          const nextCart = prevCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: updatedQuantity }
              : item,
          )

          syncProductCartState(productId, {
            inCart: true,
            cartQuantity: updatedQuantity,
          })

          return nextCart
        }

        const clampedQuantity = Math.min(MAX_CART_QUANTITY, normalizedQuantity)

        syncProductCartState(productId, {
          inCart: true,
          cartQuantity: clampedQuantity,
        })

        return [...prevCart, { productId, quantity: clampedQuantity }]
      })
    },
    [syncProductCartState],
  )

  const updateCartQuantity = useCallback(
    (productId, quantity) => {
      setCart((prevCart) => {
        const sanitizedQuantity = Math.max(0, Number(quantity) || 0)
        const clampedQuantity = Math.min(MAX_CART_QUANTITY, sanitizedQuantity)
        const exists = prevCart.find((item) => item.productId === productId)

        if (!exists && clampedQuantity <= 0) {
          syncProductCartState(productId, {
            inCart: false,
            cartQuantity: 0,
          })
          return prevCart
        }

        if (clampedQuantity <= 0) {
          syncProductCartState(productId, {
            inCart: false,
            cartQuantity: 0,
          })
          return prevCart.filter((item) => item.productId !== productId)
        }

        const nextCart = exists
          ? prevCart.map((item) =>
              item.productId === productId
                ? { ...item, quantity: clampedQuantity }
                : item,
            )
          : [...prevCart, { productId, quantity: clampedQuantity }]

        syncProductCartState(productId, {
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
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId),
      )
      syncProductCartState(productId, { inCart: false, cartQuantity: 0 })
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
      if (cart.some((item) => item.productId === productId)) {
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
    (productId) => cart.some((item) => item.productId === productId),
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const cartProducts = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.productId)
          if (!product) return null
          return {
            ...product,
            quantity: item.quantity,
          }
        })
        .filter(Boolean),
    [cart, products],
  )

  const getCartCount = useCallback(() => cartCount, [cartCount])

  const getCartProducts = useCallback(() => cartProducts, [cartProducts])

  const clearProductCart = useCallback(() => {
    clearCart()
  }, [clearCart])

  const findProductById = useCallback(
    (productId) => products.find((p) => p.id === Number(productId)),
    [products],
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
    setSearchTerm,
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
