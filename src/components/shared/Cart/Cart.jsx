import { useState } from 'react'
import { BreadCrumbs } from '../BreadCrumbs'
import { CartList } from './CartList'
import { CartSummary } from './CartSummary'

export function Cart({ initialItems = [], onCheckout }) {
  const [cartItems, setCartItems] = useState(initialItems)

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const calculateTotals = () => {
    const totalItems = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0,
    )
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0,
    )
    return { totalItems, subtotal }
  }

  const { totalItems, subtotal } = calculateTotals()

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
