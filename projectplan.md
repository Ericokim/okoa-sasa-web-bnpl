# Project Plan: Fix Header Context Issue

## Problem Analysis

**Current State:**
- App uses `ContextProvider` from `/context/state-context.jsx` which provides: `user`, `isAuthenticated`, `login`, `logout`
- Header component is trying to use `useAppContext` from `/context/index.jsx`
- The `ContextProvider` does NOT provide `cart` data that Header expects
- Only Header component uses `useAppContext`, all other components use `useStateContext`

**Error:** `GET http://localhost:3000/src/context/index.jsx?t=1761599675246 net::ERR_ABORTED 404 (Not Found)`

**Root Cause:** Header component is importing `from '@/context'` but `/src/context/index.jsx` doesn't exist. The existing context files are `/src/context/state-context.jsx` and `/src/context/theme-context.jsx`.

## Minimal Fix Strategy

**Immediate Fix (smallest possible change):**
1. Update Header component to use existing `useStateContext` instead of the non-existent `useAppContext`
2. Add basic `cart` state to existing `ContextProvider` so Header doesn't break

This approach:
- ✅ Fixes the 404 error immediately
- ✅ Requires minimal code changes (2 lines in Header + cart state)
- ✅ Doesn't break any existing functionality
- ✅ Uses existing architecture

## Todo Items

- [ ] **IMMEDIATE**: Fix Header import to use existing `useStateContext`
- [ ] Add basic cart state to existing `ContextProvider` in `/context/state-context.jsx`
- [ ] Test that Header displays correctly without errors
- [ ] Verify existing functionality still works (auth, routes, etc.)

## Implementation Details

**File Changes:**
1. `/src/components/shared/Header.jsx` - Change import from `'@/context'` to `'@/context/state-context'` and use `useStateContext`
2. `/src/context/state-context.jsx` - Add cart state (`cart: []`, `addToCart`, `removeFromCart`, `clearCart`)

**Cart Requirements from Header:**
- Header only needs `cart?.length || 0` for the cart item count badge
- Basic cart array state is sufficient for now

## Review Section

### ✅ Implementation Completed Successfully

**Changes Made:**

1. **Fixed Header Import** (`/src/components/shared/Header.jsx`)
   - Changed import from `'@/context'` (non-existent) to `'@/context/state-context'`
   - Changed hook usage from `useAppContext()` to `useStateContext()`

2. **Added Cart State** (`/src/context/state-context.jsx`)
   - Added `cart: []` state
   - Added `addToCart`, `removeFromCart`, `clearCart` methods
   - Exposed cart functionality in context value

**Results:**
- ✅ Fixed 404 error - no more missing file errors
- ✅ Header displays correctly with cart functionality
- ✅ Existing authentication and user functionality preserved
- ✅ Dev server starts and runs without errors
- ✅ All existing components continue to work

**Total Files Changed:** 2 files, minimal impact
**Total Lines Changed:** ~15 lines

### Summary
Simple, surgical fix that resolved the immediate issue while preserving all existing functionality. The cart state is now available throughout the app and the Header displays correctly.
