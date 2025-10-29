# Cart Components

Pixel-perfect, fully responsive cart components for the Okoa Sasa BNPL application, matching the Figma design system.

## Components

### Cart
Main container component that manages cart state and orchestrates child components.

**Props:**
- `initialItems` (array): Initial cart items
- `onCheckout` (function): Callback function when checkout button is clicked

**Usage:**
```jsx
import { Cart } from '@/components/shared'

function CartPage() {
  const handleCheckout = () => {
    navigate('/checkout')
  }

  const items = [
    {
      id: 1,
      title: 'iPhone 14',
      description: 'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM',
      price: 87696,
      quantity: 1,
      image: '/images/iphone.png',
    },
  ]

  return <Cart initialItems={items} onCheckout={handleCheckout} />
}
```

### CartList
Displays the list of cart items with headers (desktop) or simplified view (mobile).

**Props:**
- `items` (array): Array of cart items
- `onQuantityChange` (function): Callback for quantity changes
- `onRemove` (function): Callback for item removal

**Features:**
- Desktop: Table header with "Item", "Quantity", "Subtotal"
- Mobile: Simplified header with item count
- Empty state with icon and message
- Responsive dividers between items

### CartItem
Individual cart item with dual layout (desktop/mobile).

**Props:**
- `id` (string|number): Unique identifier
- `image` (string): Product image URL
- `title` (string): Product name
- `description` (string): Product description
- `price` (number): Unit price
- `quantity` (number): Current quantity
- `onQuantityChange` (function): Callback for quantity changes
- `onRemove` (function): Callback for item removal

**Desktop Layout:**
- Product image: 139px × 130px container
- Product info: 224px width
- Quantity controls: 176px width
- Subtotal with gradient text
- Delete icon

**Mobile Layout:**
- Compact product image: 80px × 80px
- Stacked information
- Smaller quantity controls
- Side-by-side price and delete

### CartSummary
Order summary sidebar with totals and checkout button.

**Props:**
- `totalItems` (number): Total number of items in cart
- `shippingCost` (number): Shipping cost (default: 0)
- `subtotal` (number): Cart subtotal
- `onCheckout` (function): Callback for checkout action

**Features:**
- Fixed width on desktop (412px)
- Full width on mobile
- Sticky positioning on desktop
- Gradient checkout button
- All totals with proper formatting

## Responsive Breakpoints

```css
/* Mobile: < 768px (md) */
- Full width components
- Stacked layout
- Compact spacing
- Smaller text sizes

/* Tablet: 768px - 1024px (md to lg) */
- Slightly larger spacing
- Medium text sizes
- Full width maintained

/* Desktop: ≥ 1024px (lg) */
- Two-column layout
- Fixed sidebar width (412px)
- Table header visible
- Optimal spacing (px-20)
```

## Design Specifications

### Layout Alignment
- **Container padding**: `px-5 md:px-20` (matches site-wide standard)
- **Content max-width**: Inherits from Layout component
- **Gap between columns**: `20px` (gap-5)
- **Vertical spacing**: `30px` on desktop, `24px` on mobile

### Colors (Brand Design System)
```css
--brand-primary-start: #F8971D
--brand-primary-end: #EE3124
--brand-stroke: #E8ECF4
--brand-bg-2: #F9FAFB
--brand-black: #252525
--brand-gray: #676D75
--brand-mid-gray: #A0A4AC
--brand-error: #F25E5E
```

### Typography
- **Font Family**: Public Sans (system fallback)
- **Page Title**: 36px (mobile: 24px) / font-semibold
- **Subtitle**: 16px (mobile: 14px) / font-medium
- **Item Title**: 18px / font-semibold
- **Description**: 16px (mobile: 14px) / font-normal
- **Price**: 20px (mobile: 18px) / font-semibold / gradient
- **Summary Labels**: 18px (mobile: 16px) / font-medium

### Spacing
```css
/* Desktop */
- Card padding: 24px (p-6)
- Item gap: 16px
- Section gap: 30px
- Border radius: 16px (cards), 24px (buttons)

/* Mobile */
- Card padding: 16px (p-4)
- Item gap: 12px
- Section gap: 24px
- Border radius: 12px (cards), 24px (buttons)
```

## Component Hierarchy

```
Cart (state + layout)
  ├── BreadCrumbs
  ├── Page Header
  └── Two-column Layout
      ├── CartList (flex-1)
      │   ├── Table Header (desktop only)
      │   ├── Mobile Header (mobile only)
      │   └── CartItem (repeating)
      │       ├── Desktop Layout (lg+)
      │       └── Mobile Layout (<lg)
      └── CartSummary (fixed width lg:w-[412px])
          ├── Summary Details
          └── Checkout Button
```

## Features

### Functionality
- ✅ Real-time quantity updates
- ✅ Item removal with confirmation
- ✅ Automatic total calculations
- ✅ Empty cart state
- ✅ KES currency formatting
- ✅ Responsive layouts
- ✅ Sticky summary on desktop

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA labels on buttons
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Screen reader friendly
- ✅ Touch-friendly targets (min 44px on mobile)

### Performance
- ✅ Optimized re-renders
- ✅ Efficient state updates
- ✅ Lazy loading ready
- ✅ No unnecessary dependencies

## Mobile Optimizations

### Touch Targets
- Minimum size: 44px × 44px for all interactive elements
- Adequate spacing between buttons
- Easy-to-tap quantity controls

### Layout Adaptations
- Single column on mobile
- Stacked product information
- Compact product images
- Full-width checkout button
- Summary card below items

### Typography Scaling
```jsx
// Example responsive text
className="text-2xl md:text-4xl"  // Page title
className="text-sm md:text-base"  // Subtitle
className="text-base md:text-lg"  // Item title
```

## Integration Example

```jsx
// In your cart route/page
import { Cart } from '@/components/shared'

function CartPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [showAuth, setShowAuth] = useState(false)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuth(true)
      return
    }
    navigate({ to: '/checkout' })
  }

  return (
    <div className="mx-auto w-full py-6 md:py-8">
      <Cart 
        initialItems={cartItems} 
        onCheckout={handleCheckout} 
      />
      <AuthDialog 
        open={showAuth} 
        onOpenChange={setShowAuth} 
      />
    </div>
  )
}
```

## State Management

The Cart component uses local state with `useState`. For production:

```jsx
// Option 1: Context API
const { cart, updateQuantity, removeItem } = useCart()

// Option 2: Backend integration
const { data: cart, mutate } = useQuery('cart', fetchCart)

// Option 3: Local storage persistence
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItems))
}, [cartItems])
```

## Testing Checklist

- [ ] Desktop layout matches Figma exactly
- [ ] Mobile layout is user-friendly
- [ ] Quantity controls work correctly
- [ ] Remove item updates totals
- [ ] Empty state displays properly
- [ ] Checkout button triggers callback
- [ ] Responsive breakpoints work
- [ ] Currency formats correctly
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Accessibility tested
- [ ] Touch targets adequate on mobile

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (latest)
