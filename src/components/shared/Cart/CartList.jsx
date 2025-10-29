import { CartItem } from './CartItem'
import { ShoppingCart } from 'lucide-react'

export function CartList({ items = [], onQuantityChange, onRemove }) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-[#E8ECF4] p-12 md:p-24">
        <div className="flex flex-col items-center gap-4">
          <ShoppingCart className="h-16 w-16 text-[#A0A4AC] md:h-24 md:w-24" strokeWidth={1.5} />
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
              Your cart is empty
            </h3>
            <p className="text-sm text-[#676D75] md:text-base">
              Add some products to get started
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-start gap-4 rounded-2xl border border-[#E8ECF4] p-4 md:p-6">
      {/* Table Header - Desktop Only */}
      <div className="hidden lg:flex lg:items-start lg:gap-4 lg:self-stretch">
        <div className="w-[401px] text-xl font-semibold capitalize  text-black">
          Item
        </div>
        <div className="w-44 text-xl font-semibold capitalize ml-18 text-black">
          Quantity
        </div>
        <div className="flex-1 text-xl font-semibold capitalize -ml-5 text-start text-black">
          Subtotal
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex items-center justify-between self-stretch lg:hidden">
        <h3 className="text-lg font-semibold text-black">Items</h3>
        <span className="text-sm text-[#676D75]">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="h-px self-stretch bg-[#E8ECF4]"></div>

      {/* Cart Items */}
      <div className="flex w-full flex-col items-center justify-center gap-3 self-stretch">
        {items.map((item, index) => (
          <div key={item.id || index} className="w-full">
            <CartItem
              {...item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
            {index < items.length - 1 && (
              <div className="my-3 h-px w-full bg-[#E8ECF4]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartList
