import { Minus, Plus } from 'lucide-react'
import { TrashIcon } from '@/assets/icons'
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
    <div className="w-full">
      {/* Desktop Layout - Keep as is */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
        {/* Product Info - spans 6 columns */}
        <div className="col-span-6 flex items-center gap-4">
          <div className="flex h-[130px] w-[139px] shrink-0 items-center justify-center rounded-2xl bg-[#F9FAFB] p-[17px]">
            <img src={image} alt={title} className="h-24 w-24 object-contain" />
          </div>

          <div className="flex flex-1 flex-col gap-2 min-w-0">
            <h3 className="text-lg font-semibold capitalize leading-[140%] text-black truncate">
              {title}
            </h3>
            <p className="text-base font-normal leading-[140%] text-[#676D75] line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        {/* Quantity Controls - spans 3 columns */}
        <div className="col-span-3 flex items-center justify-center gap-3">
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

        {/* Subtotal and Remove - spans 3 columns */}
        <div className="col-span-3 flex items-center justify-between">
          <div className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent text-xl font-semibold capitalize leading-[140%]">
            {formatCurrency(price * quantity)}
          </div>

          <button
            onClick={handleRemove}
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Remove item"
          >
            <TrashIcon
              className="h-[30px] w-[30px] text-[#F25E5E]"
              fill="#F25E5E"
            />
          </button>
        </div>
      </div>

      {/* Mobile Layout - Updated with labels above */}
      <div className="flex flex-col gap-4 lg:hidden">
        {/* Product Info */}
        <div className="flex gap-4 items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F9FAFB]">
            <img src={image} alt={title} className="h-14 w-14 object-contain" />
          </div>

          <div className="flex flex-1 flex-col gap-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Quantity Section - Label above controls */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600 font-medium">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 bg-white transition-colors hover:border-gray-400"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4 text-gray-600" strokeWidth={2} />
            </button>

            <span className="flex w-8 justify-center text-base font-semibold text-gray-900">
              {quantity}
            </span>

            <button
              onClick={handleIncrement}
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 bg-white transition-colors hover:border-gray-400"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4 text-gray-600" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Subtotal and Delete Section - Label above value and delete */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600 font-medium">Subtotal</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-orange-600">
              {formatCurrency(price * quantity)}
            </span>
            <button
              onClick={handleRemove}
              className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Remove item"
            >
              <TrashIcon className="h-5 w-5 text-[#F25E5E]" fill="#F25E5E" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem