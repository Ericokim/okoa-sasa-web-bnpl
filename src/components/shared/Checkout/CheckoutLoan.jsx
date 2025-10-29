import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Upload } from 'lucide-react'
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
import { useState } from 'react'
import {
  AlertDialogCustom,
  ErrorAlertDialog,
  SuccessAlertDialog,
} from '../Dialog'
import { AlertIcon, SuccessIcon } from '@/assets/icons'

const loanLimitSchema = z.object({
  basicPay: z.string().min(1, 'Basic pay is required'),
  netPay: z.string().min(1, 'Net pay is required'),
  repaymentPeriod: z.number().min(1).max(24),
  payslip: z.any().optional(),
})

export default function CheckLoanLimitPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const [fileName, setFileName] = useState('')
  const [minMonths, setMinMonths] = useState(6)
  const [maxMonths, setMaxMonths] = useState(13)

  const [open, setOpen] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(loanLimitSchema),
    defaultValues: {
      basicPay: '',
      netPay: '',
      repaymentPeriod: 13,
      payslip: null,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    if (onNext) onNext()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      form.setValue('payslip', file)
    }
  }

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value)
    if (value <= maxMonths) {
      setMinMonths(value)
    }
  }

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= minMonths) {
      setMaxMonths(value)
      form.setValue('repaymentPeriod', value)
    }
  }

  // Calculate percentages for slider fill
  const minPercentage = ((minMonths - 1) / (24 - 1)) * 100
  const maxPercentage = ((maxMonths - 1) / (24 - 1)) * 100

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-0 gap-6">
      {/* Form Container */}
      <div className="bg-white w-full max-w-[1020px] h-auto rounded-4xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="">
          <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
            Check Your Loan Limit
          </h1>
          <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
            Enter your details to check your loan eligibility.
          </p>
        </div>

        <div className="h-0.5 bg-gray-300 my-4 sm:my-6"></div>

        <div className="space-y-4 sm:space-y-6">
          {/* Basic Pay and Net Pay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[50px] h-auto sm:h-[75px]">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Basic Pay
              </label>
              <Input
                placeholder="Enter your Basic Pay"
                type="text"
                className="h-11 bg-brand-bg-2 border-gray-300 rounded-lg"
                value={form.watch('basicPay')}
                onChange={(e) => form.setValue('basicPay', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Net Pay
              </label>
              <Input
                placeholder="Enter your Net Pay"
                type="text"
                className="h-11 bg-brand-bg-2 border-gray-300 rounded-lg"
                value={form.watch('netPay')}
                onChange={(e) => form.setValue('netPay', e.target.value)}
              />
            </div>
          </div>

          {/* Repayment Period Slider */}
          <div className="h-auto sm:h-[70px]">
            {/* Fixed month badge at top center */}
            <div className="flex justify-center h-[38px] mb-4 sm:mb-0">
              <div className="flex flex-row justify-center items-center px-3.5 py-2.5 gap-2.5 mx-auto w-[104px] h-[38px] border border-[#F47120] rounded-full">
                <p className="text-sm font-normal text-center text-[#333333]">
                  {maxMonths} Months
                </p>
              </div>
            </div>

            {/* Slider section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4">
              {/* Min label */}
              <span className="text-sm font-normal text-[#333333] order-2 sm:order-1">
                Min 06
              </span>

              {/* Slider container */}
              <div className="relative w-full sm:w-[307px] h-5 flex items-center order-1 sm:order-2">
                {/* Background track */}
                <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>

                {/* Filled track with gradient between two thumbs */}
                <div
                  className="absolute h-2 rounded-full transition-all duration-200"
                  style={{
                    left: `${minPercentage}%`,
                    width: `${maxPercentage - minPercentage}%`,
                    background:
                      'linear-gradient(90deg, #F8971D 0%, #EE3124 100%)',
                  }}
                ></div>

                {/* Min slider input */}
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={minMonths}
                  onChange={handleMinChange}
                  className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
                />

                {/* Max slider input */}
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={maxMonths}
                  onChange={handleMaxChange}
                  className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
                />

                {/* Min thumb (left) */}
                <div
                  className="absolute w-5 h-5 bg-white border-2 border-[#F47120] rounded-full shadow-lg -mt-1.5 transition-all duration-200 pointer-events-none z-30"
                  style={{ left: `calc(${minPercentage}% - 10px)` }}
                ></div>

                {/* Max thumb (right) */}
                <div
                  className="absolute w-5 h-5 bg-white border-2 border-[#F47120] rounded-full shadow-lg -mt-1.5 transition-all duration-200 pointer-events-none z-30"
                  style={{ left: `calc(${maxPercentage}% - 10px)` }}
                ></div>
              </div>

              {/* Max label */}
              <span className="text-sm font-normal text-[#333333] order-3">
                Max 24
              </span>
            </div>
          </div>

          {/* Upload Payslip */}
          <div className="h-auto sm:h-[75px]">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Upload Latest Payslip
            </label>
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
                className="flex items-center justify-between h-11 bg-brand-bg-2 px-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-400 text-sm">
                  {fileName || 'Document Type'}
                </span>
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
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Container - Completely Outside */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-[1020px]">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          className="px-8 py-3 h-12 rounded-full border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50 transition-colors w-full sm:w-auto"
        >
          Return To Back
        </Button>
        <Button
          onClick={() => setOpen(true)}
          type="button"
          className="px-8 py-3 h-12 text-white rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{
            background: 'linear-gradient(to right, #F97316, #EF4444)',
          }}
        >
          Check Loan Limit
        </Button>
      </div>

      <SuccessAlertDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        loanAmount="KES 50,000"
        paybackPeriod="24 months"
        maxAmount="KES 50,000"
        secondaryAction={{
          label: 'Cancel',
          onClick: () => {
            console.log('Cancelled')
            setOpen(false)
          },
        }}
        primaryAction={{
          label: 'Proceed',
          onClick: onNext,
        }}
        decorativeIcons={<SuccessIcon />}
      />
      {/* <ErrorAlertDialog
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
          /> */}
    </div>
  )
}
