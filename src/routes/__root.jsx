import { createRootRoute } from '@tanstack/react-router'
import Layout from '@/container/Layout'
import ErrorPage from '@/container/ErrorPage'
import NotFound from '@/container/NotFound'

export const Route = createRootRoute({
  component: Layout,
  errorComponent: ErrorPage,
  notFoundComponent: NotFound,
})
