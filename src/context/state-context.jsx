import React, { createContext, useContext, useState, useEffect } from 'react'
import { productCatalog } from '@/data/products'

const StateContext = createContext(null)

export function ContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState(productCatalog)



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

  const clearCart = () => {
    setCart([])
  }

  // Toggle product's inCart property
  const toggleProductInCart = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, inCart: !product.inCart }
          : product
      )
    )
  }
const addToCart = (productId) => {
  setProducts(prevProducts =>
    prevProducts.map(product =>
      product.id === productId
        ? { ...product, inCart: true }
        : product
    )
  )
}

const removeFromCart = (productId) => {
  setProducts(prevProducts =>
    prevProducts.map(product =>
      product.id === productId
        ? { ...product, inCart: false }
        : product
    )
  )
}
  // Add product to cart (set inCart to true)
  const addProductToCart = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, inCart: true }
          : product
      )
    )
  }

  // Remove product from cart (set inCart to false)
  const removeProductFromCart = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, inCart: false }
          : product
      )
    )
  }

  // Check if product is in cart
  const isProductInCart = (productId) => {
    const product = products.find(p => p.id === productId)
    return product ? product.inCart : false
  }

  // Get cart count
  const getCartCount = () => {
    return products.filter(p => p.inCart).length
  }

  // Get all products in cart
  const getCartProducts = () => {
    return products.filter(p => p.inCart)
  }

  // Clear all products from cart
  const clearProductCart = () => {
    setProducts(prevProducts =>
      prevProducts.map(product => ({ ...product, inCart: false }))
    )
  }

  // Find product by ID
  const findProductById = (productId) => {
    return products.find(p => p.id === Number(productId))
  }

  const value = {
    isAuthenticated,
    user,
    cart,
    login,
    logout,
    addToCart,
    removeFromCart,
    clearCart,
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