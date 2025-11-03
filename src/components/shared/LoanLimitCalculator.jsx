import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { PhoneIcon, XIcon } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

const DEFAULT_TENURE = 13

const parseCurrencyValue = (value) => {
  if (!value) return 0
  const numericValue = Number(value.toString().replace(/[^\d]/g, ''))
  return Number.isNaN(numericValue) ? 0 : numericValue
}

const formatCurrencyInputValue = (value) => {
  const numericString = value.replace(/[^\d]/g, '')
  if (!numericString) return ''
  const numericValue = Number(numericString)
  return Number.isNaN(numericValue)
    ? ''
    : new Intl.NumberFormat('en-KE').format(numericValue)
}

const loanCalculatorSchema = z.object({
  basicPay: z
    .string()
    .min(1, 'Basic pay is required')
    .refine((value) => parseCurrencyValue(value) > 0, {
      message: 'Basic pay must be greater than zero',
    }),
  netPay: z
    .string()
    .min(1, 'Net pay is required')
    .refine((value) => parseCurrencyValue(value) > 0, {
      message: 'Net pay must be greater than zero',
    }),
  months: z
    .number()
    .min(6, 'Minimum tenure is 6 months')
    .max(24, 'Maximum tenure is 24 months'),
})

export function LoanLimitCalculator({ open, onOpenChange, onProceed }) {
  const form = useForm({
    resolver: zodResolver(loanCalculatorSchema),
    defaultValues: {
      basicPay: '',
      netPay: '',
      months: DEFAULT_TENURE,
    },
  })
  const { reset } = form
  const watchedBasicPay = form.watch('basicPay')
  const watchedNetPay = form.watch('netPay')
  const watchedMonths = form.watch('months')
  const loanAmount = useMemo(() => {
    const tenure = watchedMonths ?? 0
    if (tenure <= 0) return 0

    const parsedBasicPay = parseCurrencyValue(watchedBasicPay)
    const parsedNetPay = parseCurrencyValue(watchedNetPay)
    const eligibleIncome = Math.min(parsedBasicPay, parsedNetPay)

    if (eligibleIncome <= 0) return 0

    const monthlyAllocation = eligibleIncome * 0.3
    const calculatedAmount = monthlyAllocation * tenure

    const roundedToNearestThousand = Math.round(calculatedAmount / 1000) * 1000
    return Math.max(0, roundedToNearestThousand)
  }, [watchedBasicPay, watchedNetPay, watchedMonths])

  const currentTenure = watchedMonths ?? DEFAULT_TENURE

  const handleInputChange = (value, onChange) => {
    onChange(formatCurrencyInputValue(value))
  }

  const onSubmit = () => {
    if (loanAmount > 0) {
      onProceed?.(loanAmount)
    }
    onOpenChange?.(false)
    reset()
  }

  const handleSliderChange = (value, onChange) => {
    const [selectedValue] = value
    onChange(selectedValue ?? DEFAULT_TENURE)
  }

  const handleCancel = () => {
    reset()
    onOpenChange?.(false)
  }

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#252525]/20 backdrop-blur-[4px]" />
        <DialogPrimitive.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-6 rounded-3xl border bg-white p-[30px] shadow-lg duration-200">
          <div className="flex items-center justify-end">
            <button
              onClick={handleCancel}
              className="absolute right-5 md:right-[30px] top-5 md:top-[30px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
            >
              <XIcon className="h-6 w-6 text-[#09244B]" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <DialogPrimitive.Title className="text-2xl font-semibold leading-[140%] capitalize text-[#252525]">
              Loan Limit Calculator
            </DialogPrimitive.Title>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex items-start gap-4">
                <FormField
                  control={form.control}
                  name="basicPay"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col gap-2.5">
                      <FormLabel className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                        Basic Pay
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Basic Pay"
                          value={field.value ?? ''}
                          onChange={(event) =>
                            handleInputChange(
                              event.target.value,
                              field.onChange,
                            )
                          }
                          onBlur={field.onBlur}
                          className="rounded-xl border border-[#E8ECF4] bg-[#F9FAFB] px-4 py-3 text-sm leading-[140%] placeholder:text-[#A0A4AC] focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="netPay"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col gap-2.5">
                      <FormLabel className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                        Net Pay
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Net Pay"
                          value={field.value ?? ''}
                          onChange={(event) =>
                            handleInputChange(
                              event.target.value,
                              field.onChange,
                            )
                          }
                          onBlur={field.onBlur}
                          className="rounded-xl border border-[#E8ECF4] bg-[#F9FAFB] px-4 py-3 text-sm leading-[140%] placeholder:text-[#A0A4AC] focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="months"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-center gap-3 h-[38px] mb-4">
                      <p className="text-base font-medium text-gray-900">
                        Loan Tenure
                      </p>
                      <div className="flex flex-row items-center justify-center h-[38px] w-[104px] gap-2.5 rounded-full border border-[#F47120] px-3.5 py-2.5">
                        <p className="text-center text-sm font-normal text-[#333333]">
                          {field.value ?? DEFAULT_TENURE} Months
                        </p>
                      </div>
                    </div>
                    <FormControl>
                      <div className="flex items-start gap-2.5">
                        <span className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                          Min 06
                        </span>
                        <div className="relative mt-0.5 w-full max-w-[307px]">
                          <Slider
                            value={[field.value ?? DEFAULT_TENURE]}
                            onValueChange={(value) =>
                              handleSliderChange(value, field.onChange)
                            }
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2 rounded-xl border border-[#F47120] bg-[#F47120]/8 p-3">
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-center text-sm font-normal leading-[140%] text-[#0D0B26]">
                    You qualify for a loan of KES {loanAmount.toLocaleString()},
                    payable within {currentTenure} months.
                  </p>
                </div>
              </div>

              <p className="text-center text-base font-medium leading-[140%] text-[#676D75]">
                Would you like to see devices within your loan limit range (Max.
                KES {loanAmount.toLocaleString()})?
              </p>

              <div className="flex items-start gap-6">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant={'outlineGradient'}
                  className="flex-1 rounded-3xl px-4 py-3 text-base font-medium leading-[140%] capitalize hover:opacity-90"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loanAmount <= 0}
                  className="flex-1 rounded-3xl border border-[#F8971D] bg-gradient-to-b from-[#F8971D] to-[#EE3124] px-4 py-3 text-base font-medium leading-[140%] capitalize text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Proceed to device
                </Button>
              </div>
            </form>
          </Form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export default LoanLimitCalculator
