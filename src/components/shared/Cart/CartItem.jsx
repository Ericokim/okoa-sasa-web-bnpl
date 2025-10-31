import { Minus, Plus } from 'lucide-react'
import { TrashIcon, TrashIconWhite } from '@/assets/icons'
import { formatCurrency } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useStateContext } from '@/context/state-context'
import clsx from 'clsx'

export function CartItem({
  id,
  image,
  title,
  name,
  price,
  quantity = 1,
  onQuantityChange,
  onRemove,
}) {
  const navigate = useNavigate()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { removeFromCart } = useStateContext()

  const handleIncrement = () => onQuantityChange?.(id, quantity + 1)
  const handleDecrement = () =>
    quantity > 1 && onQuantityChange?.(id, quantity - 1)
  const handleRemoveClick = () => setShowDeleteDialog(true)
  const confirmRemove = () => {
    onRemove?.(id)
    removeFromCart(id)
    setShowDeleteDialog(false)
  }
  const handleImageClick = () => navigate({ to: `/products/${id}` })

  return (
    <>
      <div className="w-full">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[401px_176px_1fr_auto] lg:items-center lg:gap-4">
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <div
              onClick={handleImageClick}
              className="flex h-[130px] w-[139px] shrink-0 items-center justify-center rounded-2xl bg-[#F9FAFB] p-[17px] cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={image}
                alt={title}
                className="h-24 w-24 object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="text-lg font-semibold leading-[140%] text-black truncate">
                {title}
              </h3>
              <p className="text-base font-normal leading-[140%] text-[#676D75] line-clamp-3">
                {name}
              </p>
            </div>
          </div>

          {/* Unified Quantity Controls */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 h-[40px] sm:h-[44px]">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full text-lg flex items-center justify-center"
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4 text-[#292D32]" strokeWidth={1.75} />
              </Button>

              <span className="flex w-8 justify-center text-base sm:text-lg font-semibold text-[#252525]">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full text-lg flex items-center justify-center mb-0.5"
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4 text-[#252525]" strokeWidth={1.75} />
              </Button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-end">
            <div className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-right text-transparent text-xl font-semibold capitalize leading-[140%]">
              {formatCurrency(price * quantity)}
            </div>
          </div>

          {/* Remove */}
          <div className="flex justify-end">
            <button
              onClick={handleRemoveClick}
              className="flex h-[30px] w-[30px] items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Remove item"
            >
              <TrashIcon
                className="h-[30px] w-[30px] text-[#F25E5E]"
                fill="#F25E5E"
              />
            </button>
          </div>
        </div>

        {/* Mobile Layout (reusing unified quantity styling) */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Product Info */}
          <div className="flex items-start gap-3">
            <div
              onClick={handleImageClick}
              className="flex h-[59px] w-[67px] shrink-0 items-center justify-center rounded-[12px] bg-[#F9FAFB] cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={image}
                alt={title}
                className="h-[51px] w-[51px] object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
              <h3 className="text-base font-semibold leading-[140%] text-gray-900">
                {title}
              </h3>
              <p className="text-sm font-normal leading-[140%] text-[#676D75]">
                {name}
              </p>
            </div>
          </div>

          {/* Quantity Section */}
          <div className="flex flex-col gap-3">
            <span className="text-[18px] font-semibold leading-[140%] text-black">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleIncrement}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4 text-[#292D32]" strokeWidth={1.75} />
              </button>

              <span className="flex w-8 justify-center text-base sm:text-lg font-semibold text-[#252525]">
                {quantity}
              </span>

              <button
                onClick={handleDecrement}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4 text-[#252525]" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Subtotal & Delete */}
          <div className="flex flex-col gap-3">
            <span className="text-[18px] font-semibold leading-[140%] text-black">
              Subtotal
            </span>
            <div className="flex items-center justify-between">
              <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-lg font-semibold leading-[140%] text-transparent">
                {formatCurrency(price * quantity)}
              </span>
              <button
                onClick={handleRemoveClick}
                className="flex h-8 w-8 items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Remove item"
              >
                <TrashIcon className="h-5 w-5 text-[#F25E5E]" fill="#F25E5E" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#F8971D] to-[#EE3124] rounded-full flex items-center justify-center mb-4">
              <TrashIconWhite className="w-8 h-8" fill="white" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Remove Item from Cart?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove "{title}" from your cart?
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={confirmRemove}
                className="w-full h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl text-white font-medium text-base hover:opacity-90 transition-all"
              >
                Remove
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(false)}
                variant="outline"
                className="w-full h-[46px] border border-[#F8971D] text-[#F8971D] rounded-[24px] font-medium text-base hover:bg-[#F8971D]/10 transition-all"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ✅ Shared utility classes (tailwind.config or globals.css)
.quantity-btn {
  @apply flex h-10 w-10 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:border-[#F8971D];
}
*/
