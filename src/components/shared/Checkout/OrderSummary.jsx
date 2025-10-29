import React, { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { TrashIcon, TrashIconWhite } from '@/assets/icons'

export default function OrderSummaryPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState({
    name: 'iPhone 14',
    image: '/phone.png',
    specs:
      'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
    price: 87696,
  })

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleDelete = () => {
    // Handle delete logic
    console.log('Delete product')
  }

  const subtotal = product.price * quantity
  const grandTotal = subtotal

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-0 gap-6">
      {/* Form Container */}
      <div className="bg-white w-full max-w-[1020px] h-auto rounded-4xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
            Order Summary
          </h1>
          <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
            Confirm your order details
          </p>
        </div>

        <div className="h-0.5 bg-gray-200 my-6"></div>

        {/* Product Section */}
        <div className="space-y-6">
          <h2 className="text-base font-semibold text-[#252525]">Product</h2>

          {/* Product Item */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            {/* Product Image */}
            <div className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-[#252525] mb-2">
                {product.name}
              </h3>
              <p className="text-lg sm:text-sm text-[#676D75] leading-relaxed mb-4">
                {product.specs}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                 
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDecrement}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
                      aria-label="Decrease quantity"
                      type="button"
                    >
                      <Minus
                        className="h-4 w-4 text-[#252525]"
                        strokeWidth={1.5}
                      />
                    </button>

                    <span className="flex w-8 justify-center text-base font-semibold text-[#252525]">
                      {quantity}
                    </span>

                    <button
                      onClick={handleIncrement}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
                      aria-label="Increase quantity"
                      type="button"
                    >
                      <Plus
                        className="h-4 w-4 text-[#292D32]"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleDelete}
                  className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80"
                  aria-label="Remove item"
                  type="button"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-0.5 bg-gray-200 my-6"></div>

        {/* Totals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-[#676D75]">
              Subtotal
            </span>
            <span className="text-base font-medium text-[#252525]">
              KES {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-[#252525]">
              Grand Total
            </span>
            <span className="text-lg font-bold text-[#F97316]">
              KES {grandTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-[1020px]">
        <button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          className="px-8 py-3 h-12 rounded-full border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50 transition-colors w-full sm:w-auto"
        >
          Return To Back
        </button>
        <button
          onClick={onNext}
          type="button"
          className="px-8 py-3 h-12 text-white rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            background: 'linear-gradient(to right, #F97316, #EF4444)',
          }}
        >
          Next: Terms & Condition
        </button>
      </div>
    </div>
  )
}
