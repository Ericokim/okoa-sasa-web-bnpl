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
      navigate({ to: '/' })
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
 * Protected Layout - Wraps authenticated routes with auth guard only (Layout comes from root)
 */
export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}

/**
 * Auth Layout - Simple outlet wrapper for authentication pages
 */
export function AuthLayout() {
  return <Outlet />
}

/** Public Layout (for /) */
export function PublicLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
