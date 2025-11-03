import { useMemo } from 'react'
import { BreadCrumbs } from '../BreadCrumbs'
import { CartList } from './CartList'
import { CartSummary } from './CartSummary'
import { useStateContext, MAX_CART_QUANTITY } from '@/context/state-context'

export function Cart({ onCheckout }) {
  const { cartProducts, updateCartQuantity, removeFromCart } =
    useStateContext()

  const cartItems = useMemo(() => cartProducts ?? [], [cartProducts])

  const handleQuantityChange = (id, newQuantity) => {
    const clampedQuantity = Math.max(
      1,
      Math.min(newQuantity, MAX_CART_QUANTITY),
    )
    updateCartQuantity?.(id, clampedQuantity)
  }

  const handleRemove = (id) => {
    removeFromCart?.(id)
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

      {/* Cart Content - Two Column Layout */}
      <div className="flex w-full flex-col items-start gap-5 lg:flex-row lg:justify-center">
        <CartList
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />

        <CartSummary
          totalItems={totalItems}
          shippingCost={0}
          subtotal={subtotal}
          onCheckout={onCheckout}
        />
      </div>
    </div>
  )
}

export default Cart
