import React, { createContext, useContext, useState, useEffect } from 'react'

const StateContext = createContext(null)

export function ContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

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

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item])
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
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
