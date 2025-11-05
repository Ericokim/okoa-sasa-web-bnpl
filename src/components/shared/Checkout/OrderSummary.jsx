import React, { useState, useEffect } from 'react'
import { Minus, Plus } from 'lucide-react'
import { TrashIcon, TrashIconWhite } from '@/assets/icons'
import { useStateContext } from '@/context/state-context'
import { useNavigate } from '@tanstack/react-router'
import { ErrorAlertDialog } from '../Dialog'
import { Button } from '@/components/ui/button'

export default function OrderSummaryPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const navigate = useNavigate()
  const {
    cartProducts,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    resetCheckout,
    getCheckoutFormData,
  } = useStateContext()
  const cartItems = cartProducts ?? []

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [showClearCartDialog, setShowClearCartDialog] = useState(false)
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Fixed shipping fee
  const shippingFee = 100

  // Get loan limit data from checkout form
  const loanData = getCheckoutFormData(1)
  const loanLimit = loanData?.calculatedLoanAmount || 0

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
    return total + item.price * quantity
  }, 0)

  const grandTotal = subtotal + shippingFee

  // Check if cart exceeds loan limit
  const exceedsLoanLimit = grandTotal > loanLimit

  // Watch for empty cart and redirect to home
  useEffect(() => {
    if (cartItems.length === 0) {
      resetCheckout() // Reset checkout state
      navigate({ to: '/' }) // Redirect to home
    }
  }, [cartItems.length, navigate, resetCheckout])

  const handleImageClick = (productId) => {
    navigate({ to: `/products/${productId}` })
  }

  const handleIncrement = (productId, currentQuantity) => {
    updateCartQuantity?.(productId, currentQuantity + 1)
  }

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartQuantity?.(productId, currentQuantity - 1)
    }
  }

  const handleDeleteClick = (item) => {
    setItemToDelete(item)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id)
      setShowDeleteDialog(false)
      setItemToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setItemToDelete(null)
  }

  const handleClearCart = () => {
    if (!cartItems.length) return
    setShowClearCartDialog(true)
  }

  const confirmClearCart = () => {
    clearCart?.()
    setShowClearCartDialog(false)
  }

  const cancelClearCart = () => {
    setShowClearCartDialog(false)
  }

  const handleNext = () => {
    // Validate against loan limit before proceeding
    if (exceedsLoanLimit) {
      setErrorMessage(
        `Your order total (KES ${grandTotal.toLocaleString()}) exceeds your loan limit (KES ${loanLimit.toLocaleString()}). Please adjust your cart or update your loan details.`,
      )
      setErrorModalOpen(true)
      return
    }

    // Proceed to next step if within loan limit
    onNext()
  }

  return (
    <div className="flex flex-col items-start mb-[50px] p-0 sm:p-0 gap-6 w-full">
      {/* Form Container */}
      <div className="bg-white w-full  h-auto rounded-4xl border border-gray-200 p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
            Order Summary
          </h1>
          <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
            Confirm your order details
          </p>
        </div>

        <div className="h-px bg-gray-200 my-6"></div>

        {/* Product Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base font-semibold text-[#252525]">Product</h2>
            {cartItems.length > 1 && (
              <button
                type="button"
                onClick={handleClearCart}
                className="flex items-center justify-center rounded-3xl border border-[#F25E5E] px-4 py-2 text-sm font-medium text-[#F25E5E] transition-all hover:bg-[#FFF5F5]"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Map through cart items */}
          {cartItems.length > 0 ? (
            cartItems.map((product) => {
              const quantity = Math.max(
                1,
                product.quantity || product.cartQuantity || 1,
              )

              return (
                <div key={product.id}>
                  {/* Product Item */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div
                      onClick={() => handleImageClick(product.id)}
                      className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={product.image}
                        alt={product.title || product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-[#252525] mb-2">
                        {product.title || product.name}
                      </h3>
                      <p className="text-sm text-[#676D75] leading-relaxed mb-4">
                        {product.specs || product.name}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleDecrement(product.id, quantity)
                              }
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
                              onClick={() =>
                                handleIncrement(product.id, quantity)
                              }
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
                          onClick={() => handleDeleteClick(product)}
                          className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80"
                          aria-label="Remove item"
                          type="button"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Divider between items (except for the last item) */}
                  {cartItems.indexOf(product) < cartItems.length - 1 && (
                    <div className="h-px bg-gray-200 my-6"></div>
                  )}
                </div>
              )
            })
          ) : (
            <p className="text-center text-[#676D75] py-8">No items in cart</p>
          )}
        </div>

        <div className="h-px bg-gray-200 my-6"></div>

        {/* Totals Section */}
        <div className="space-y-4">
          {/* Mobile & Tablet View - without extra div */}
          <div className="flex flex-col w-full lg:hidden">
            {/* Loan Limit */}
            {loanLimit > 0 && (
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-base font-medium text-[#676D75]">
                  Loan Limit
                </span>
                <span className={`text-base font-medium ${
                  exceedsLoanLimit ? 'text-orange-500' : 'text-green-600'
                }`}>
                  KES {loanLimit.toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center mb-1.5">
              <span className="text-base font-medium text-[#676D75]">
                Subtotal
              </span>
              <span className="text-base font-medium text-[#252525]">
                KES {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center mb-1.5">
              <span className="text-base font-medium text-[#676D75]">
                Shipping Fee
              </span>
              <span className="text-base font-medium text-[#252525]">
                KES {shippingFee.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-[#252525]">
                Grand Total
              </span>
              <span className="text-lg font-bold text-[#F97316]">
                KES {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Desktop View - with extra div */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="w-1/2"></div>
            <div className="flex flex-col justify-between w-1/2">
              {/* Loan Limit */}
              {loanLimit > 0 && (
                <div className="flex justify-between mb-1.5">
                  <span className="text-base font-medium text-[#676D75]">
                    Loan Limit
                  </span>
                  <span className={`text-base font-medium ${
                    exceedsLoanLimit ? 'text-orange-500' : 'text-green-600'
                  }`}>
                    KES {loanLimit.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between mb-1.5">
                <span className="text-base font-medium text-[#676D75]">
                  Subtotal
                </span>
                <span className="text-base font-medium text-[#252525]">
                  KES {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between mb-1.5">
                <span className="text-base font-medium text-[#676D75]">
                  Shipping Fee
                </span>
                <span className="text-base font-medium text-[#252525]">
                  KES {shippingFee.toLocaleString()}
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
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant={"outline"}
          className="flex justify-center items-center px-4 py-3 w-full sm:w-[193px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          type="button"
          className="px-8 py-3 h-12 text-white rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            background: 'linear-gradient(to right, #F97316, #EF4444)',
          }}
        >
          Next: Terms & Condition
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#F8971D] to-[#EE3124] rounded-full flex items-center justify-center mb-4">
              <TrashIconWhite className="w-8 h-8" fill="white" />
            </div>

            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Remove Item from Cart?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove "
              {itemToDelete.title || itemToDelete.name}" from your cart?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmDelete}
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
                  bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                  text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
              >
                Remove
              </button>
              <button
                onClick={cancelDelete}
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
                  border border-[#F8971D] text-[#F8971D] rounded-[24px] 
                  font-medium text-base hover:bg-[#F8971D]/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearCartDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-[calc(100%-2rem)] max-w-[360px] rounded-[28px] bg-white px-8 py-8 text-center shadow-[0_24px_60px_rgba(9,36,75,0.16)]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F8971D] to-[#EE3124]">
              <TrashIconWhite className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-xl font-semibold text-[#252525] mb-2">
              Clear all items?
            </h2>
            <p className="text-sm leading-relaxed text-[#676D75] mb-6">
              This will remove every product from your order summary. You
              won&apos;t be able to undo this action.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmClearCart}
                className="w-full h-[46px] rounded-3xl bg-gradient-to-b from-[#F8971D] to-[#EE3124] px-5 text-base font-medium text-white shadow-sm hover:opacity-90"
              >
                Yes, clear order
              </button>
              <button
                onClick={cancelClearCart}
                className="w-full h-[46px] rounded-3xl border border-[#F8971D] px-5 text-base font-medium text-[#F47120] hover:bg-[#FFF4EE]"
              >
                Keep items
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loan Limit Error Modal */}
     <ErrorAlertDialog
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={errorMessage}
        // primLink={'/cart'}
        primaryAction={{
          label: 'Adjust Order',
          onClick: () => {
            setErrorModalOpen(false)
          },
        }}
        // secondaryAction={{
        //   label: 'Adjust Order',
        //   onClick: () => {
        //     setErrorModalOpen(false)
        //   },
        // }}
      />
    </div>
  )
}