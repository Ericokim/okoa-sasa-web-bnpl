# File-Based Routing Migration Project Plan

**Project:** Okoa Sasa Web BNPL  
**Purpose:** Migrate from config-based TanStack Router to file-based routing structure  
**Reference:** pavrisk_web_companion routing pattern  
**Date:** 2025-10-27

---

## 📋 Executive Summary

Currently, the app uses a **config-based routing setup** where all routes are defined in `src/config/routes.jsx`. This works but becomes harder to maintain as the app grows. We'll migrate to a **file-based routing structure** where each route is a file under `src/routes/`, making the system more intuitive and scalable.

### Key Constraints
- ✅ Keep existing `src/config/` logic (guards, layouts, providers)
- ✅ Zero breaking changes to existing pages
- ✅ Preserve authentication flow
- ✅ Simple, minimal changes only
- ✅ No new dependencies

---

## 🔍 Current State Analysis

### Existing Structure
```
src/
├── config/
│   ├── routes.jsx        # All route definitions (254 lines)
│   └── root-provider.jsx # Context providers
├── routes/
│   └── demo/             # Demo routes (table, store, tanstack-query)
├── main.jsx              # App entry
└── App.jsx               # Simple component
```

### Current Routing Setup (src/config/routes.jsx)
- **Root Layout**: Simple `<Outlet />` wrapper
- **Auth Layout**: For public routes (login, signup, otp, forgot-password)
- **Protected Layout**: Wraps authenticated routes with `<Layout />` + auth guard
- **Routes defined**:
  - **Protected**: `/dashboard`, `/businesses`, `/invoice`, `/license-detail`, `/applyLicense`, etc.
  - **Public**: `/login`, `/signup`, `/otp`, `/forgotPassword`, `/signin`, `/licenseAplication`
  - **Index**: `/` → redirects based on auth state

### Key Dependencies Referenced
- `@/components/shared/Loading` → ThemedSuspense
- `@/container/Layout` → Main layout wrapper
- `@/container/NotFound` → 404 page
- `@/container/ProtectedNotFound` → 404 for authenticated users
- `@/container/ErrorPage` → Error boundary
- `@/context/state-context` → Auth state (`isAuthenticated`)
- `@/pages/*` → Actual page components (Business, Invoice, License, Auth)

**⚠️ CRITICAL**: These dependencies don't currently exist in the codebase! We need to create placeholder/stub components first.

---

## 🎯 Goals

1. Move route definitions from `src/config/routes.jsx` to individual files under `src/routes/`
2. Keep `src/config/` for reusable logic (guards, providers, helpers)
3. Maintain exact same routing behavior
4. Use TanStack Router's standard file-based pattern
5. Match reference project structure (pavrisk_web_companion)

---

## 📁 Target Structure

```
src/
├── config/
│   ├── root-provider.jsx     # (unchanged) Providers
│   └── route-helpers.jsx     # (new) Extract ProtectedRoute, layouts, helpers
│
├── routes/
│   ├── __root.tsx            # Root layout + error boundary
│   ├── index.tsx             # Home redirect logic
│   │
│   ├── _auth/                # Auth layout group
│   │   ├── _layout.tsx       # Auth layout wrapper
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── signin.tsx
│   │   ├── otp.tsx
│   │   ├── forgotPassword.tsx
│   │   └── licenseAplication.tsx
│   │
│   └── _protected/           # Protected layout group
│       ├── _layout.tsx       # Protected layout + auth guard
│       ├── dashboard.tsx
│       ├── businesses/
│       │   ├── index.tsx
│       │   └── $businessId.tsx
│       ├── invoice/
│       │   ├── index.tsx
│       │   └── licenses.$id.tsx
│       ├── license-detail.tsx
│       ├── applyLicense.tsx
│       ├── licenseapply.tsx
│       ├── license.renew.$licenseId.tsx
│       └── change-password.tsx
│
├── container/                 # (new) Layout components
│   ├── Layout.jsx
│   ├── NotFound.jsx
│   ├── ProtectedNotFound.jsx
│   └── ErrorPage.jsx
│
├── pages/                     # (new) Page components
│   ├── Auth/
│   ├── Business/
│   ├── Invoice/
│   └── License/
│
├── context/                   # (new) Context providers
│   ├── state-context.jsx
│   └── theme-context.jsx
│
└── components/shared/         # (new) Shared components
    └── Loading.jsx
```

---

## ✅ Todo List

### Phase 1: Setup & Stubs (Minimal Risk) ✅ COMPLETE
- [x] **1.1** Create stub directories: `src/pages/`, `src/container/`, `src/context/`, `src/components/shared/`
- [x] **1.2** Create minimal stub components for missing dependencies:
  - `src/container/Layout.jsx` → Simple layout with header/footer placeholders
  - `src/container/NotFound.jsx` → 404 page
  - `src/container/ProtectedNotFound.jsx` → Auth'd 404 page
  - `src/container/ErrorPage.jsx` → Error boundary
  - `src/components/shared/Loading.jsx` → ThemedSuspense + LoadingSpinner components
  - `src/context/state-context.jsx` → Auth context with login/logout methods
  - `src/context/theme-context.jsx` → Theme provider with dark/light mode support
- [x] **1.3** Verify app still builds with stubs in place ✅ Build successful (1.37s)

### Phase 2: Extract Reusable Logic ✅ COMPLETE
- [x] **2.1** Create `src/config/route-helpers.jsx`:
  - Extract `ProtectedRoute` component with auth guard
  - Extract `lazyLoad` helper with Suspense
  - Export reusable layout wrappers (RootLayout, ProtectedLayout, AuthLayout)
- [x] **2.2** Test that extracted helpers work ✅ Build successful (1.35s)

### Phase 3: Create File-Based Route Structure ✅ COMPLETE
- [x] **3.1** Create `src/routes/__root.tsx` (root layout + error boundary)
- [x] **3.2** Create `src/routes/index.tsx` (home redirect logic)
- [x] **3.3** Create `src/routes/_auth.tsx` (auth layout)
- [x] **3.4** Migrate public routes to `src/routes/_auth/`:
  - [x] `login.tsx`
  - [x] `signup.tsx`
  - [x] `signin.tsx`
  - [x] `otp.tsx`
  - [x] `forgotPassword.tsx`
  - [x] `licenseAplication.tsx`
- [x] **3.5** Create `src/routes/_protected.tsx` (protected layout + guard)
- [x] **3.6** Migrate protected routes to `src/routes/_protected/`:
  - [x] `dashboard.tsx`
  - [x] `businesses/index.tsx`
  - [x] `businesses/$businessId.tsx`
  - [x] `invoice/index.tsx`
  - [x] `invoice/licenses.$id.tsx`
  - [x] `license-detail.tsx`
  - [x] `applyLicense.tsx`
  - [x] `licenseapply.tsx`
  - [x] `license/renew.$licenseId.tsx`
  - [x] `change-password.tsx`
- [x] Build verification ✅ Successful (1.46s)

### Phase 4: Update Router Configuration
- [ ] **4.1** Update `src/main.jsx` to use file-based routes
- [ ] **4.2** Remove or deprecate `src/config/routes.jsx`
- [ ] **4.3** Test all routes work correctly

### Phase 5: Create Actual Page Components
- [ ] **5.1** Replace stubs with real page components (Business, Invoice, License, Auth pages)
- [ ] **5.2** Implement proper layouts and navigation
- [ ] **5.3** Add authentication logic

### Phase 6: Testing & Documentation
- [ ] **6.1** Test navigation flow (public → auth → protected)
- [ ] **6.2** Test authentication guards
- [ ] **6.3** Test 404 handling
- [ ] **6.4** Run `npm run build` and verify
- [ ] **6.5** Run `npm run lint` and fix any issues
- [ ] **6.6** Create `docs/routing-guide.md` with usage instructions
- [ ] **6.7** Update `WARP.md` with routing architecture

---

## 🔧 Implementation Details

### File-Based Route Conventions

**Naming:**
- `__root.tsx` → Root layout
- `index.tsx` → Index/default route for that path
- `_layout.tsx` → Layout wrapper (doesn't create route segment)
- `$param.tsx` → Dynamic parameter
- `_group/` → Route group (doesn't create URL segment)

**Example:**
```
routes/
  _protected/
    _layout.tsx           # Wraps all protected routes
    dashboard.tsx         # → /dashboard
    businesses/
      index.tsx           # → /businesses
      $businessId.tsx     # → /businesses/:businessId
```

### Auth Guard Pattern
```tsx
// src/config/route-helpers.jsx
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useStateContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) navigate({ to: '/signin' });
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) return <LoadingSpinner />;
  return children;
}
```

### Layout Pattern
```tsx
// src/routes/_protected/_layout.tsx
import { ProtectedRoute } from '@/config/route-helpers';
import Layout from '@/container/Layout';

export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  );
}
```

---

## ⚠️ Risks & Mitigation

| Risk | Mitigation |
|------|-----------|
| Missing dependencies break build | Create stubs first, test incrementally |
| Routes don't match old behavior | Keep old config until full migration tested |
| Authentication guard fails | Extract guard logic early, test in isolation |
| Complex nested routes | Start with simple routes, add complexity gradually |

---

## 🧪 Testing Checklist

- [ ] App builds successfully (`npm run build`)
- [ ] Dev server runs (`npm run dev`)
- [ ] Can navigate to `/signin` (public route)
- [ ] Can navigate to `/dashboard` when authenticated
- [ ] Redirects to `/signin` when not authenticated
- [ ] 404 page shows for invalid routes
- [ ] Protected 404 shows for auth'd invalid routes
- [ ] Route params work (`/businesses/123`)
- [ ] Nested routes work (`/invoice/licenses/456`)

---

## 📊 Success Criteria

✅ All routes accessible via file-based structure  
✅ Authentication guards function correctly  
✅ Layouts render properly  
✅ No breaking changes to existing functionality  
✅ Code is simpler and more maintainable  
✅ Follows TanStack Router best practices  
✅ Matches reference project structure  

---

## 📝 Review Section

*(To be filled after implementation)*

### Files Changed
- TBD

### Summary of Changes
- TBD

### Challenges Encountered
- TBD

### Next Steps
- TBD

---

## 📚 References

- [TanStack Router File-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- Reference project: `/Users/eric/Developer/pavrisk_web_companion/src/App.jsx`
- Current config: `src/config/routes.jsx`
