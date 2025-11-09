import { CheckoutDoneIcon } from '@/assets/icons'
import React, { useMemo } from 'react'
import { Button } from '../CustomButton'
import { Link } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { formatCurrency } from '@/lib/utils'

const DoneScreen = () => {
  const { resetCheckout, getCheckoutFormData } = useStateContext()

  const finalStepData = getCheckoutFormData?.(6) || {}
  const orderResponse = finalStepData?.orderResponse || {}
  const orderSummary = getCheckoutFormData?.(4)?.cartSummary || {}
  const orderLines = getCheckoutFormData?.(4)?.orderPayload?.orderLines || []

  const orderNumber =
    orderResponse?.quoteReference ||
    orderResponse?.orderReference ||
    orderResponse?.orderId ||
    orderResponse?.id ||
    (orderLines?.[0]?.sku ? `#${orderLines[0].sku}` : null)

  const headline = orderNumber
    ? `Your Order #${orderNumber} has been received`
    : 'Your order has been received'

  const primaryItem = useMemo(() => {
    if (Array.isArray(orderLines) && orderLines.length) {
      const [first] = orderLines
      return first
    }
    return null
  }, [orderLines])

  return (
    <div className="bg-white grid grid-cols-1 place-items-center w-full max-w-full h-auto rounded-4xl border border-gray-200 p-6">
      <div className="mb-6 ml-7 ">
        <CheckoutDoneIcon size={200} />
      </div>
      <div className="h-auto sm:h-16 sm:mb-0 text-center space-y-2">
        <h1 className="w-full text-xl sm:text-2xl font-normal leading-[1.4] text-[#252525]">
          {headline}
        </h1>
        <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
          You will be contacted for further information and approval.
        </p>
      </div>

      {/* <div className="mt-6 w-full max-w-xl rounded-2xl border border-[#F4E7D8] bg-[#FFF9F3] p-4 text-left">
        {primaryItem ? (
          <>
            <p className="text-sm font-medium text-[#7A4E1D] uppercase tracking-wide mb-2">
              Order summary
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-[#1C1917]">
                {primaryItem.name}
              </p>
              <p className="text-sm text-[#4B5563]">
                Qty {primaryItem.quantity} · SKU {primaryItem.sku}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm font-medium text-[#7A4E1D]">
            We&apos;ll email you a detailed order summary shortly.
          </p>
        )}
        {orderSummary?.grandTotal !== undefined && (
          <p className="mt-3 text-sm text-[#4B5563]">
            Total paid:{' '}
            <span className="font-semibold text-[#1C1917]">
              {formatCurrency(orderSummary.grandTotal)}
            </span>
          </p>
        )}
      </div> */}

      <div className="h-[46px] w-[344px] mt-6 flex justify-center">
        <Button
          asChild
          onClick={resetCheckout}
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 rounded-3xl text-base font-medium shadow-md"
        >
          <Link to="/">Back Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default DoneScreen
