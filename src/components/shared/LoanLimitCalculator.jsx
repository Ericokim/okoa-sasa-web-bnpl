import { useState } from 'react'
import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

export function LoanLimitCalculator({ open, onOpenChange }) {
  const [basicPay, setBasicPay] = useState('')
  const [netPay, setNetPay] = useState('')
  const [months, setMonths] = useState([13])
  const loanAmount = 50000

  const handleProceed = () => {
    onOpenChange?.(false)
  }

  const handleCancel = () => {
    onOpenChange?.(false)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#252525]/20 backdrop-blur-[4px]" />
        <DialogPrimitive.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-6 rounded-3xl border bg-white p-[30px] shadow-lg duration-200">
          <div className="flex items-center justify-end">
            <button
              onClick={handleCancel}
              className="text-[#09244B] transition-opacity hover:opacity-70"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <DialogPrimitive.Title className="text-2xl font-semibold leading-[140%] capitalize text-[#252525]">
              Loan Limit Calculator
            </DialogPrimitive.Title>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-1 flex-col gap-2.5">
              <Label
                htmlFor="basic-pay"
                className="text-base font-normal leading-[140%] capitalize text-[#252525]"
              >
                Basic Pay
              </Label>
              <Input
                id="basic-pay"
                type="text"
                placeholder="Enter your Basic Pay"
                value={basicPay}
                onChange={(e) => setBasicPay(e.target.value)}
                className="rounded-xl border border-[#E8ECF4] bg-[#F9FAFB] px-4 py-3 text-sm leading-[140%] text-[#A0A4AC] placeholder:text-[#A0A4AC] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2.5">
              <Label
                htmlFor="net-pay"
                className="text-sm font-normal leading-[140%] text-[#252525]"
              >
                Net Pay
              </Label>
              <Input
                id="net-pay"
                type="text"
                placeholder="Enter your Net Pay"
                value={netPay}
                onChange={(e) => setNetPay(e.target.value)}
                className="rounded-xl border border-[#E8ECF4] bg-[#F9FAFB] px-4 py-3 text-sm leading-[140%] text-[#A0A4AC] placeholder:text-[#A0A4AC] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between">
              <div className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#F47120] px-3.5 py-2.5">
                <span className="text-center text-base font-normal leading-[140%] text-[#333333]">
                  {months[0]} Months
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                Min 06
              </span>
              <div className="relative mt-0.5 w-full max-w-[307px]">
                <Slider
                  value={months}
                  onValueChange={setMonths}
                  min={6}
                  max={24}
                  step={1}
                  className="w-full [&_[data-slot=slider-track]]:h-3.5 [&_[data-slot=slider-track]]:rounded-full [&_[data-slot=slider-track]]:border [&_[data-slot=slider-track]]:border-black/[0.06] [&_[data-slot=slider-track]]:bg-[#F5F5F5] [&_[data-slot=slider-range]]:bg-gradient-to-b [&_[data-slot=slider-range]]:from-[#F8971D] [&_[data-slot=slider-range]]:to-[#EE3124] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border [&_[data-slot=slider-thumb]]:border-black/15 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_6px_14px_0_rgba(0,0,0,0.15)]"
                />
              </div>
              <span className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                Max 24
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#F47120] bg-[#F47120]/8 p-3">
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-center text-sm font-normal leading-[140%] text-[#0D0B26]">
                Your qualify for a loan of KES {loanAmount.toLocaleString()},
                payable within {months[0]} months.
              </p>
            </div>
          </div>

          <p className="text-center text-base font-medium leading-[140%] text-[#676D75]">
            Would you like to see devices within your loan limit range (Max. KES{' '}
            {loanAmount.toLocaleString()})?
          </p>

          <div className="flex items-start gap-6">
            <Button
              onClick={handleCancel}
              variant={'outlineGradient'}
              className="flex-1 rounded-3xl px-4 py-3 text-base font-medium leading-[140%] capitalize hover:opacity-90"
            >
              Cancel
            </Button>

            <Button
              onClick={handleProceed}
              className="flex-1 rounded-3xl border border-[#F8971D] bg-gradient-to-b from-[#F8971D] to-[#EE3124] px-4 py-3 text-base font-medium leading-[140%] capitalize text-white hover:opacity-90"
            >
              Proceed to device
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export default LoanLimitCalculator
