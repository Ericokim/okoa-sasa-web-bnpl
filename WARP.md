# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary
- React + Vite app (ESM, type: module) with Tailwind CSS v4
- Routing: TanStack Router; Data: TanStack Query; State: TanStack Store
- UI: shadcn/ui + Radix primitives; utilities in src/lib
- Testing: Vitest (unit) and Playwright (E2E)
- Lint/format: ESLint (flat config via @tanstack/eslint-config) + Prettier
- Package manager: npm (package-lock.json present); Node >= 18

Commands
- Install and run locally
  ```bash
  npm install
  npm run dev   # http://localhost:3000
  ```
- Build and preview
  ```bash
  npm run build
  npm run serve
  ```
- Lint/format/type-check
  ```bash
  npm run lint
  npm run lint:fix
  npm run format
  npm run format:check
  npm run check        # prettier write + eslint --fix
  npm run type-check   # tsc --noEmit
  ```
- Unit tests (Vitest)
  ```bash
  npm test                # run once
  npm run test:watch      # watch mode
  # run a single test file
  npm test -- src/App.test.jsx
  # run a single test by name
  npm test -- -t "renders"
  ```
- E2E tests (Playwright)
  ```bash
  npm run test:e2e            # headless
  npm run test:e2e:headed     # with browser UI
  npm run test:e2e:ui         # interactive UI mode
  # run a single spec or test
  npm run test:e2e -- e2e/app.spec.js -g "homepage loads correctly"
  # target a specific browser project
  npm run test:e2e -- --project=firefox
  # view HTML report after a run
  npx playwright show-report
  ```

Architecture and code structure
- Entry and build
  - index.html bootstraps /src/main.jsx; root DOM id is "app".
  - Vite aliases '@' to 'src' (see vite.config.js) for absolute-style imports.
  - TanStack Router Vite plugin auto-generates src/routeTree.gen.ts from src/routes/.
- Routing (TanStack Router - File-Based)
  - **File-based routing**: Each file in src/routes/ is a route. No manual route configuration needed.
  - src/routes/__root.tsx defines root layout with error boundary and 404 handling.
  - src/routes/_auth/ contains public auth routes (login, signup, otp, etc.).
  - src/routes/_protected/ contains authenticated routes (products, cart, checkout, orders, profile).
  - **To add a route**: Create a .tsx file in src/routes/ with createFileRoute() - the plugin handles the rest.
  - Route components are colocated IN route files (not in separate pages directory).
- Data fetching (TanStack Query)
  - QueryClient is created in src/config/root-provider.jsx.
  - Router context includes the QueryClient; the Provider wraps <RouterProvider /> in main.jsx.
  - Components use useQuery/useMutation as usual.
- Authentication
  - Auth context in src/context/state-context.jsx provides isAuthenticated, login, logout.
  - Protected routes use route-helpers.jsx guards that redirect to /signin if not authenticated.
- UI and styling
  - Tailwind v4 via @tailwindcss/vite; brand tokens (from Figma) in src/styles.css using rgb format.
  - Reusable primitives live under src/components/ui; the cn helper for class composition is in src/lib/utils.js.
  - Layouts in src/container/ (Layout, NotFound, ProtectedNotFound, ErrorPage).
- Testing layout
  - Unit tests are colocated with source (e.g., src/App.test.jsx) using Vitest + Testing Library.
  - E2E specs live under e2e/; playwright.config.js starts the dev server (npm run dev) and uses baseURL http://localhost:3000 with the HTML reporter.

Notes
- ESLint uses the flat config from @tanstack/eslint-config (eslint.config.js). If you add languages or globs, extend this file accordingly.
- Path alias '@' -> 'src' is widely used; prefer it for intra-app imports.
