import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function CartItem({
  id,
  image,
  title,
  description,
  price,
  quantity = 1,
  onQuantityChange,
  onRemove,
}) {
  const handleIncrement = () => {
    onQuantityChange?.(id, quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange?.(id, quantity - 1)
    }
  }

  const handleRemove = () => {
    onRemove?.(id)
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
        {/* Product Info - 401px width in design */}
        <div className="flex items-center gap-3">
          <div className="flex h-[130px] w-[139px] shrink-0 items-center justify-center rounded-2xl bg-[#F9FAFB] p-[17px]">
            <img src={image} alt={title} className="h-24 w-24 object-contain" />
          </div>

          <div className="flex w-56 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold capitalize leading-[140%] text-black">
                {title}
              </h3>
              <p className="text-base font-normal leading-[140%] text-[#676D75]">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Quantity Controls - 176px width in design */}
        <div className="flex w-[176px] items-center justify-center gap-3">
          <button
            onClick={handleIncrement}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
            aria-label="Increase quantity"
          >
            <Plus className="h-5 w-5 text-[#292D32]" strokeWidth={1.5} />
          </button>

          <span className="flex w-7 justify-center text-center text-lg font-semibold capitalize leading-[140%] text-[#252525]">
            {quantity}
          </span>

          <button
            onClick={handleDecrement}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
            aria-label="Decrease quantity"
          >
            <Minus className="h-5 w-5 text-[#252525]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Subtotal - flex-1 */}
        <div className="flex flex-1 items-center justify-between">
          <div className="text-brand-primary-gradient text-xl font-semibold capitalize leading-[140%]">
            {formatCurrency(price * quantity)}
          </div>

          <button
            onClick={handleRemove}
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Remove item"
          >
            <Trash2
              className="h-[30px] w-[30px] text-[#F25E5E]"
              fill="#F25E5E"
            />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        {/* Product Info */}
        <div className="flex gap-3">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F9FAFB] p-2">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <h3 className="text-base font-semibold leading-[140%] text-black">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm leading-[140%] text-[#676D75]">
              {description}
            </p>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8ECF4] bg-white"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4 text-[#252525]" strokeWidth={1.5} />
            </button>

            <span className="flex w-8 justify-center text-base font-semibold text-[#252525]">
              {quantity}
            </span>

            <button
              onClick={handleIncrement}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8ECF4] bg-white"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4 text-[#292D32]" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-brand-primary-gradient text-lg font-semibold">
              {formatCurrency(price * quantity)}
            </div>

            <button
              onClick={handleRemove}
              className="flex h-7 w-7 items-center justify-center"
              aria-label="Remove item"
            >
              <Trash2 className="h-6 w-6 text-[#F25E5E]" fill="#F25E5E" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem
