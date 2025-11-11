import { useMemo } from 'react'
import { BreadCrumbs } from '../BreadCrumbs'
import { CartList } from './CartList'
import { CartSummary } from './CartSummary'
import { useStateContext } from '@/context/state-context'
import { useStickyAffix } from '@/hooks/use-sticky-affix'
import { useSnackbar } from 'notistack'

export function Cart({ onCheckout }) {
  const { cartProducts, updateCartQuantity, removeFromCart, clearCart } =
    useStateContext()
  const { enqueueSnackbar } = useSnackbar()

  const cartItems = useMemo(() => cartProducts ?? [], [cartProducts])

  const handleQuantityChange = (id, newQuantity) => {
    const clampedQuantity = Math.max(1, newQuantity)
    updateCartQuantity?.(id, clampedQuantity)
  }

  const handleRemove = (id) => {
    const removedItem = cartItems.find(
      (item) => String(item.id) === String(id),
    )
    removeFromCart?.(id)
    enqueueSnackbar('Removed from cart', {
      variant: 'success',
    })
  }

  const handleClearCart = () => {
    clearCart?.()
  }

  const { totalItems, subtotal } = useMemo(() => {
    const totals = cartItems.reduce(
      (acc, item) => {
        const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
        return {
          totalItems: acc.totalItems + quantity,
          subtotal: acc.subtotal + item.price * quantity,
        }
      },
      { totalItems: 0, subtotal: 0 },
    )

    return totals
  }, [cartItems])

  const {
    layoutRef,
    columnRef,
    cardRef,
    cardStyles,
    placeholderHeight,
    columnMinHeight,
    isDesktop,
  } = useStickyAffix({
    deps: [cartItems.length, totalItems, subtotal],
    topOffset: 32,
    bottomOffset: 48,
  })

  return (
    <div className="flex w-full flex-col items-start gap-6 md:gap-[30px]">
      {/* Breadcrumbs */}
      <BreadCrumbs
        items={[
          { path: '/', label: 'Home' },
          { path: '/cart', label: 'My Cart', isCurrent: true },
        ]}
      />

      {/* Page Header */}
      <div className="flex w-full flex-col items-start gap-2 md:h-20 md:max-w-[536px]">
        <h1 className="self-stretch text-2xl font-semibold capitalize leading-[140%] text-[#252525] md:text-4xl">
          My Cart
        </h1>
        <p className="self-stretch text-sm font-medium leading-[140%] text-[#676D75] md:text-base">
          Almost there! Ready to place your order?
        </p>
      </div>

      {/* Cart Content - Responsive Layout */}
      <div
        ref={layoutRef}
        className="flex w-full flex-col gap-5 lg:flex-row lg:items-start lg:gap-6 xl:gap-8 2xl:gap-10"
      >
        <div className="w-full flex-1">
          <CartList
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </div>

        <div
          ref={columnRef}
          className="relative w-full lg:w-[320px] xl:w-[360px] 2xl:w-[400px] lg:shrink-0 lg:self-stretch"
          style={
            isDesktop && columnMinHeight
              ? { minHeight: columnMinHeight }
              : undefined
          }
        >
          {placeholderHeight ? (
            <div aria-hidden="true" style={{ height: placeholderHeight }} />
          ) : null}
          <div
            ref={cardRef}
            className="w-full lg:max-w-none"
            style={cardStyles}
          >
            <CartSummary
              totalItems={totalItems}
              shippingCost={0}
              subtotal={subtotal}
              onCheckout={onCheckout}
              onClearCart={cartItems.length ? handleClearCart : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
