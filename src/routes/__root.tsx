import { createRootRoute } from '@tanstack/react-router';
import { RootLayout } from '@/config/route-helpers';
import ErrorPage from '@/container/ErrorPage';
import NotFound from '@/container/NotFound';

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorPage,
  notFoundComponent: NotFound,
});
