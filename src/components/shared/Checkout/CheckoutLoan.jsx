import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useState, useMemo } from 'react'
import { ErrorAlertDialog, SuccessAlertDialog } from '../Dialog'
import { SuccessIcon } from '@/assets/icons'
import { Slider } from '@/components/ui/slider'
import { useStateContext } from '@/context/state-context'

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

const loanLimitSchema = z.object({
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
  repaymentPeriod: z.preprocess(
    (val) => val ?? DEFAULT_TENURE,
    z
      .number()
      .min(6, 'Minimum repayment period is 6 months')
      .max(24, 'Maximum repayment period is 24 months'),
  ),
  payslip: z.any().refine((file) => file !== null && file !== undefined, {
    message: 'Please upload your latest payslip',
  }),
})

export default function CheckLoanLimitPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const { saveCheckoutFormData, getCheckoutFormData } = useStateContext()

  const savedData = getCheckoutFormData(1)

  const [fileName, setFileName] = useState(savedData?.payslipName || '')
  const [open, setOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm({
    resolver: zodResolver(loanLimitSchema),
    defaultValues: savedData || {
      basicPay: '',
      netPay: '',
      repaymentPeriod: DEFAULT_TENURE ?? savedData?.repaymentPeriod,
      payslip: null,
    },
  })

  // Reset form with saved data when component mounts
  React.useEffect(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      form.reset(savedData)
      if (savedData.payslipName) {
        setFileName(savedData.payslipName)
      }
    }
  }, [savedData, form])

  React.useEffect(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      form.reset({
        ...savedData,
        repaymentPeriod: savedData.repaymentPeriod ?? DEFAULT_TENURE, // Ensure it's never undefined
      })
      if (savedData.payslipName) {
        setFileName(savedData.payslipName)
      }
    }
  }, [savedData, form])

  const watchedBasicPay = form.watch('basicPay')
  const watchedNetPay = form.watch('netPay')
  const watchedMonths = form.watch('repaymentPeriod')

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

  const onSubmit = (data) => {
    console.log(data)
    // Save form data with payslip name
    const dataWithFileName = { ...data, payslipName: fileName }
    saveCheckoutFormData(1, dataWithFileName)

    if (loanAmount > 100000) {
      setOpen(true)
    } else {
      onNext()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            setFileName(file.name)
            form.setValue('payslip', file)
            form.clearErrors('payslip')
            return 100
          }
          return prev + 10
        })
      }, 100)
    }
  }

  const handleSliderChange = (value) => {
    form.setValue('repaymentPeriod', value[0])
  }

  return (
    <div className="flex flex-col mb-[50px] items-center justify-center p-0 sm:p-0 gap-6">
      {/* Form Container */}
      <div className="bg-white w-full h-full rounded-4xl border border-gray-200 p-6 ">
        <div className="">
          <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
            Check Your Loan Limit
          </h1>
          <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
            Enter your details to check your loan eligibility.
          </p>
        </div>

        <div className="h-px bg-gray-300 my-4 sm:my-6"></div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Basic Pay and Net Pay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[50px]">
              <FormField
                control={form.control}
                name="basicPay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-900 mb-2">
                      Basic Pay
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Basic Pay"
                        type="text"
                        className="h-11 bg-brand-bg-2 border-gray-300 rounded-lg"
                        value={field.value ?? ''}
                        onChange={(event) =>
                          handleInputChange(event.target.value, field.onChange)
                        }
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <div className="h-6 mt-1">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netPay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-900 mb-2">
                      Net Pay
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Net Pay"
                        type="text"
                        className="h-11 bg-brand-bg-2 border-gray-300 rounded-lg"
                        value={field.value ?? ''}
                        onChange={(event) =>
                          handleInputChange(event.target.value, field.onChange)
                        }
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <div className="h-6 mt-1">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Repayment Period Slider */}
            <FormField
              control={form.control}
              name="repaymentPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      {/* Centered month badge with Loan Tenure label */}
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-base font-medium text-gray-900">
                          Loan Tenure
                        </p>
                        <div className="flex flex-row justify-center items-center px-3.5 py-2.5 gap-2.5 w-[104px] h-[38px] border border-[#F47120] rounded-full">
                          <p className="text-sm font-normal text-center text-[#333333]">
                            {field.value ?? DEFAULT_TENURE} Months
                          </p>
                        </div>
                        <div className="w-[104px]"></div>
                      </div>
                      {/* Slider section */}
                      <div className="flex items-center mt-2 gap-1.5 sm:gap-2.5 -mx-2 px-2">
                        <span className="text-base font-normal leading-[140%] capitalize text-[#252525] whitespace-nowrap">
                          Min 6
                        </span>
                        <div className="relative mt-0.5 flex-1 min-w-0">
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
                        <span className="text-base font-normal leading-[140%] capitalize text-[#252525] whitespace-nowrap">
                          Max 24
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <div className="h-6 mt-1">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Loan Qualification Info */}
            {/* {loanAmount > 0 && (
              <div className="flex items-center gap-2 rounded-xl border border-[#F47120] bg-[#F47120]/8 p-3">
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-center text-sm font-normal leading-[140%] text-[#0D0B26]">
                    You qualify for a loan of KES {loanAmount.toLocaleString()},
                    payable within {currentTenure} months.
                  </p>
                </div>
              </div>
            )} */}

            {/* Upload Payslip */}
            <FormField
              control={form.control}
              name="payslip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-900 mb-2">
                    Upload Latest Payslip
                  </FormLabel>
                  <FormControl>
                    <div className="relative h-11">
                      <input
                        type="file"
                        id="payslip-upload"
                        className="hidden h-11"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="payslip-upload"
                        className={`flex items-center justify-between h-11 bg-brand-bg-2 px-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          form.formState.errors.payslip
                            ? 'border-primary'
                            : 'border-gray-300'
                        }`}
                      >
                        <span
                          className={`text-sm ${fileName ? 'text-gray-900' : 'text-gray-400'}`}
                        >
                          {fileName || 'Document Type'}
                        </span>

                        <div className="flex items-center gap-2">
                          {/* Progress Bar */}
                          {isUploading && (
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-linear-to-r from-orange-500 to-red-500 transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          )}

                          {/* Upload Icon */}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.50003 14.7917C7.15837 14.7917 6.87503 14.5084 6.87503 14.1667V10.6751L6.27503 11.2751C6.03337 11.5167 5.63337 11.5167 5.3917 11.2751C5.15003 11.0334 5.15003 10.6334 5.3917 10.3917L7.05837 8.72507C7.23337 8.55007 7.50837 8.49174 7.7417 8.59174C7.97503 8.68341 7.97503 8.68341 8.12503 9.16674V14.1667C8.12503 14.5084 7.8417 14.7917 7.50003 14.7917Z"
                              fill="#A0A4AC"
                            />
                            <path
                              d="M9.16654 11.4585C9.0082 11.4585 8.84987 11.4002 8.72487 11.2752L7.0582 9.60853C6.81654 9.36686 6.81654 8.96686 7.0582 8.7252C7.29987 8.48353 7.69987 8.48353 7.94154 8.7252L9.6082 10.3919C9.84987 10.6335 9.84987 11.0335 9.6082 11.2752C9.4832 11.4002 9.32487 11.4585 9.16654 11.4585Z"
                              fill="#A0A4AC"
                            />
                            <path
                              d="M12.4998 18.9582H7.49984C2.97484 18.9582 1.0415 17.0248 1.0415 12.4998V7.49984C1.0415 2.97484 2.97484 1.0415 7.49984 1.0415H11.6665C12.0082 1.0415 12.2915 1.32484 12.2915 1.6665C12.2915 2.00817 12.0082 2.2915 11.6665 2.2915H7.49984C3.65817 2.2915 2.2915 3.65817 2.2915 7.49984V12.4998C2.2915 16.3415 3.65817 17.7082 7.49984 17.7082H12.4998C16.3415 17.7082 17.7082 16.3415 17.7082 12.4998V8.33317C17.7082 7.9915 17.9915 7.70817 18.3332 7.70817C18.6748 7.70817 18.9582 7.9915 18.9582 8.33317V12.4998C18.9582 17.0248 17.0248 18.9582 12.4998 18.9582Z"
                              fill="#A0A4AC"
                            />
                            <path
                              d="M18.3332 8.9584H14.9998C12.1498 8.9584 11.0415 7.85007 11.0415 5.00007V1.66674C11.0415 1.41674 11.1915 1.18341 11.4248 1.09174C11.6582 0.991739 11.9248 1.05007 12.1082 1.22507L18.7748 7.89174C18.9498 8.06674 19.0082 8.34174 18.9082 8.57507C18.8082 8.8084 18.5832 8.9584 18.3332 8.9584ZM12.2915 3.17507V5.00007C12.2915 7.15007 12.8498 7.70841 14.9998 7.70841H16.8248L12.2915 3.17507Z"
                              fill="#A0A4AC"
                            />
                          </svg>
                        </div>
                      </label>
                    </div>
                  </FormControl>
                  <div className="h-6 mt-1">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          className="px-8 py-3 h-12 rounded-full border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50 transition-colors w-full sm:w-auto"
        >
          Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type="button"
          className="px-8 py-3 h-12 text-white rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            background: 'linear-gradient(to right, #F97316, #EF4444)',
          }}
        >
          Next: Personal Info
        </Button>
      </div>

      <ErrorAlertDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        message="The selected device exceeds your loan limit. Please choose another device within your approved range."
        secondaryAction={{
          label: 'Back To Device List',
          onClick: () => {
            console.log('Back to device list')
            setOpen(false)
          },
        }}
        primaryAction={{
          label: 'Choose Another Device',
          onClick: () => {
            console.log('Choose another device')
            setOpen(false)
          },
        }}
      />
    </div>
  )
}
