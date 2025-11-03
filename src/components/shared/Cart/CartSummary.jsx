import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export function CartSummary({
  totalItems = 0,
  shippingCost = 0,
  subtotal = 0,
  onCheckout,
}) {
  const grandTotal = subtotal + shippingCost

  return (
    <div className="flex w-full flex-col items-start gap-6 rounded-2xl border border-[#E8ECF4] p-4 md:p-6 lg:w-[412px] lg:sticky lg:top-8">
      {/* Title */}
      <div className="flex flex-col items-start gap-3 self-stretch">
        <h2 className="self-stretch text-xl font-semibold capitalize leading-[140%] text-black md:text-2xl">
          Order Summary
        </h2>
      </div>

      <div className="h-px self-stretch bg-[#E8ECF4]"></div>

      {/* Summary Details */}
      <div className="flex flex-col items-start gap-4 self-stretch">
        <div className="flex items-center justify-between self-stretch">
          <span className="text-base font-medium capitalize leading-[140%] text-[#676D75] md:text-lg">
            total Items
          </span>
          <span className="text-base font-medium capitalize leading-[140%] text-black md:text-lg">
            {totalItems}
          </span>
        </div>

        <div className="flex items-center justify-between self-stretch">
          <span className="text-base font-medium capitalize leading-[140%] text-[#676D75] md:text-lg">
            Shipping Cost
          </span>
          <span className="text-base font-medium capitalize leading-[140%] text-black md:text-lg">
            {formatCurrency(shippingCost)}
          </span>
        </div>

        <div className="flex items-center justify-between self-stretch">
          <span className="text-base font-medium capitalize leading-[140%] text-[#676D75] md:text-lg">
            Subtotal
          </span>
          <span className="text-base font-medium capitalize leading-[140%] text-black md:text-lg">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      <div className="h-px self-stretch bg-[#E8ECF4]"></div>

      {/* Grand Total */}
      <div className="flex items-center justify-between self-stretch">
        <span className="text-base font-medium capitalize leading-[140%] text-[#676D75] md:text-lg">
          Grand Total
        </span>
        <span className="text-base font-medium capitalize leading-[140%] text-black md:text-lg">
          {formatCurrency(grandTotal)}
        </span>
      </div>

      {/* Checkout Button */}
      <div className="flex flex-col items-start gap-3 self-stretch">
        {/* <Button
          onClick={onCheckout}
          className="flex h-11 w-full items-center justify-center gap-2.5 self-stretch rounded-3xl border border-transparent bg-brand-primary-gradient px-4 py-3 text-base font-medium capitalize leading-[140%] text-white transition-opacity hover:bg-brand-primary-gradient hover:opacity-90 md:h-12"
          size="lg"
        >
          Proceed to Checkout
        </Button> */}

        <Button
          onClick={onCheckout}
          disabled={totalItems === 0}
          variant="gradient"
          className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
             text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default CartSummary
