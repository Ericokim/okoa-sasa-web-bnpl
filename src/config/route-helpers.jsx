import React, { lazy, Suspense } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { ThemedSuspense, LoadingSpinner } from '@/components/shared/Loading'
import { useStateContext } from '@/context/state-context'
import Layout from '@/container/Layout'

/**
 * Lazy load helper with suspense fallback
 * Usage: const MyPage = lazyLoad(() => import('@/pages/MyPage'))
 */
export const lazyLoad = (fn) => (props) => (
  <Suspense fallback={<ThemedSuspense />}>
    {React.createElement(lazy(fn), props)}
  </Suspense>
)

/**
 * Protected Route Wrapper - Redirects to signin if not authenticated
 */
export function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/signin' })
    }
  }, [navigate, isAuthenticated])

  // Show loading spinner while redirecting
  if (!isAuthenticated) {
    return <LoadingSpinner />
  }

  return children
}

/**
 * Root Layout - Simple outlet wrapper for top-level routes
 */
export function RootLayout() {
  return <Outlet />
}

/**
 * Protected Layout - Wraps authenticated routes with main layout + auth guard
 */
export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  )
}

/**
 * Auth Layout - Simple outlet wrapper for authentication pages
 */
export function AuthLayout() {
  return <Outlet />
}
