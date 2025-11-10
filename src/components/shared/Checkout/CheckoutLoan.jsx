import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { ErrorAlertDialog } from '../Dialog'
import { useStateContext } from '@/context/state-context'
import { AmountInput, parseCurrencyValue } from '../Inputs/FormAmount'
import { RepaymentPeriodSlider } from '../Inputs/FormSlider'
import { FileUpload } from '../Inputs/FormUpload'
import { useCheckUserLoanAbility } from '@/lib/queries/user'
import {
  buildLoanPayloadKey,
  extractLoanAbilityEntry,
  resolveLoanAmountFromEntry,
} from '@/lib/utils/loan-ability'

const DEFAULT_TENURE = 13
const MIN_TENURE = 6
const MAX_TENURE = 24
const AUTO_CHECK_DEBOUNCE_MS = 600

const deriveLoanQuoteFromSavedData = (savedData) => {
  if (!savedData?.calculatedLoanAmount) return null

  const payload = {
    basicPay: parseCurrencyValue(savedData.basicPay),
    netPay: parseCurrencyValue(savedData.netPay),
    term: savedData.tenure ?? DEFAULT_TENURE,
  }

  return {
    amount: savedData.calculatedLoanAmount,
    payload,
    payloadKey: buildLoanPayloadKey(payload),
    serverEntry: savedData?.apiPayload?.loanAbilityResponse ?? null,
    source: 'saved',
  }
}

const loanLimitSchema = z
  .object({
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
    tenure: z.preprocess(
      (val) => val ?? DEFAULT_TENURE,
      z
        .number()
        .min(MIN_TENURE, `Minimum repayment period is ${MIN_TENURE} months`)
        .max(MAX_TENURE, `Maximum repayment period is ${MAX_TENURE} months`),
    ),
    payslip: z.any().refine((file) => file !== null && file !== undefined, {
      message: 'Please upload your latest payslip',
    }),
  })
  .refine(
    (data) => {
      const basicPay = parseCurrencyValue(data.basicPay)
      const netPay = parseCurrencyValue(data.netPay)
      return netPay <= basicPay
    },
    {
      message: 'Net pay cannot be greater than basic pay',
      path: ['netPay'],
    },
  )

export default function CheckLoanLimitPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const { saveCheckoutFormData, getCheckoutFormData, cartProducts } =
    useStateContext()

  const savedData = getCheckoutFormData(1)
  const loanAbilityMutation = useCheckUserLoanAbility({ showToast: false })

  const [loanQuote, setLoanQuote] = useState(() =>
    deriveLoanQuoteFromSavedData(savedData),
  )
  const [quoteError, setQuoteError] = useState(null)
  const quoteRequestRef = useRef(null)
  const pendingPayloadKeyRef = useRef(null)
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Calculate cart grand total
  const cartItems = useMemo(() => cartProducts ?? [], [cartProducts])
  const grandTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
      return total + item.price * quantity
    }, 0)
  }, [cartItems])

  // Prepare default values
  const defaultValues = useMemo(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      return {
        basicPay: savedData.basicPay?.toString() || '',
        netPay: savedData.netPay?.toString() || '',
        tenure: savedData.tenure ?? DEFAULT_TENURE,
        payslip: savedData.payslip || null,
      }
    }
    return {
      basicPay: '',
      netPay: '',
      tenure: DEFAULT_TENURE,
      payslip: null,
    }
  }, [savedData])

  const form = useForm({
    resolver: zodResolver(loanLimitSchema),
    defaultValues,
  })

  useEffect(() => {
    if (savedData?.calculatedLoanAmount) {
      setLoanQuote(deriveLoanQuoteFromSavedData(savedData))
    }
  }, [savedData])

  // Reset form with saved data when component mounts
  React.useEffect(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      form.reset({
        basicPay: savedData.basicPay?.toString() || '',
        netPay: savedData.netPay?.toString() || '',
        tenure: savedData.tenure ?? DEFAULT_TENURE,
        payslip: savedData.payslip || null,
      })
    }
  }, [savedData, form])

  // Get the current values for calculations
  const currentRepaymentPeriod = form.watch('tenure') ?? DEFAULT_TENURE
  const watchedBasicPay = form.watch('basicPay')
  const watchedNetPay = form.watch('netPay')

  const sanitizedBasicPay = useMemo(
    () => parseCurrencyValue(watchedBasicPay),
    [watchedBasicPay],
  )
  const sanitizedNetPay = useMemo(
    () => parseCurrencyValue(watchedNetPay),
    [watchedNetPay],
  )

  const loanAmount = useMemo(() => {
    const tenure = currentRepaymentPeriod
    if (tenure <= 0) return 0

    const eligibleIncome = Math.min(sanitizedBasicPay, sanitizedNetPay)

    if (eligibleIncome <= 0) return 0

    const monthlyAllocation = eligibleIncome * 0.3
    const calculatedAmount = monthlyAllocation * tenure

    const roundedToNearestThousand = Math.round(calculatedAmount / 1000) * 1000
    return Math.max(0, roundedToNearestThousand)
  }, [sanitizedBasicPay, sanitizedNetPay, currentRepaymentPeriod])

  const currentPayload = useMemo(
    () => ({
      basicPay: sanitizedBasicPay,
      netPay: sanitizedNetPay,
      term: currentRepaymentPeriod,
    }),
    [sanitizedBasicPay, sanitizedNetPay, currentRepaymentPeriod],
  )

  const currentPayloadKey = buildLoanPayloadKey(currentPayload)
  const hasQuoteForCurrentValues = Boolean(
    loanQuote?.payloadKey === currentPayloadKey && loanQuote?.amount > 0,
  )
  const canAutoCheckLoan =
    sanitizedBasicPay > 0 &&
    sanitizedNetPay > 0 &&
    currentRepaymentPeriod >= MIN_TENURE &&
    currentRepaymentPeriod <= MAX_TENURE
  const displayLoanAmount = hasQuoteForCurrentValues ? loanQuote?.amount : null
  const isCartWithinLoanLimit =
    typeof displayLoanAmount === 'number'
      ? grandTotal <= displayLoanAmount
      : false

  const requestLoanQuote = useCallback(
    async (payload, { silent = false, fallbackAmount = 0 } = {}) => {
      const payloadKey = buildLoanPayloadKey(payload)

      if (
        quoteRequestRef.current &&
        pendingPayloadKeyRef.current === payloadKey
      ) {
        return quoteRequestRef.current
      }

      if (quoteRequestRef.current) {
        try {
          await quoteRequestRef.current
        } catch {
          // ignore previous error; we'll surface the next one
        }
      }

      const promise = (async () => {
        try {
          const responseData = await loanAbilityMutation.mutateAsync(payload)
          const entry = extractLoanAbilityEntry(responseData)
          const amountFromApi = resolveLoanAmountFromEntry(entry)
          const fallbackValue = Math.max(0, Math.round(fallbackAmount))
          const resolvedAmount =
            typeof amountFromApi === 'number' && amountFromApi > 0
              ? Math.round(amountFromApi)
              : fallbackValue

          if (!resolvedAmount) {
            throw new Error(
              'We could not determine a loan amount. Please try again later.',
            )
          }

          const quote = {
            amount: resolvedAmount,
            payload,
            payloadKey,
            serverEntry: entry,
            source: 'api',
          }

          setLoanQuote(quote)
          setQuoteError(null)
          return quote
        } catch (error) {
          if (silent) {
            setQuoteError(
              error?.response?.data?.status?.message ||
                error?.response?.data?.message ||
                error?.message ||
                'Unable to calculate loan eligibility right now.',
            )
            return null
          }
          throw error
        } finally {
          quoteRequestRef.current = null
          pendingPayloadKeyRef.current = null
        }
      })()

      quoteRequestRef.current = promise
      pendingPayloadKeyRef.current = payloadKey
      return promise
    },
    [loanAbilityMutation],
  )

  useEffect(() => {
    if (!canAutoCheckLoan) {
      setQuoteError(null)
      return
    }

    if (hasQuoteForCurrentValues) {
      return
    }

    if (loanAbilityMutation.isPending || quoteRequestRef.current) {
      return
    }

    const timer = setTimeout(() => {
      setQuoteError(null)
      requestLoanQuote(currentPayload, {
        silent: true,
        fallbackAmount: loanAmount,
      })
    }, AUTO_CHECK_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [
    canAutoCheckLoan,
    currentPayload,
    hasQuoteForCurrentValues,
    loanAbilityMutation.isPending,
    loanAmount,
    requestLoanQuote,
  ])

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  // Helper function to get file information in API format
  const getFileInfo = async (file) => {
    if (!file) return null

    if (file.name && file.type && file.format && file.url) {
      return file
    }

    if (file instanceof File) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
      const formatMap = {
        pdf: 'pdf',
        jpg: 'image',
        jpeg: 'image',
        png: 'image',
        doc: 'document',
        docx: 'document',
      }

      const dataUrl = await fileToBase64(file)

      return {
        name: file.name,
        type: 'Payslip',
        format: formatMap[fileExtension] || file.type || 'document',
        url: dataUrl,
      }
    }

    return null
  }

  const onSubmit = async (data) => {
    try {
      const payload = {
        basicPay: parseCurrencyValue(data.basicPay),
        netPay: parseCurrencyValue(data.netPay),
        term: data.tenure,
      }

      const payloadKey = buildLoanPayloadKey(payload)
      let quote =
        loanQuote && loanQuote.payloadKey === payloadKey
          ? loanQuote
          : null

      if (!quote) {
        quote = await requestLoanQuote(payload, {
          fallbackAmount: loanAmount,
        })
      }

      if (!quote || !quote.amount) {
        throw new Error(
          'Unable to determine your loan limit. Please try again.',
        )
      }

      const effectiveLoanAmount = quote.amount

      if (grandTotal > effectiveLoanAmount) {
        setErrorMessage(
          `Your cart total (KES ${grandTotal.toLocaleString()}) exceeds your loan limit (KES ${effectiveLoanAmount.toLocaleString()}). Please adjust your cart or loan tenure.`,
        )
        setErrorModalOpen(true)
        return
      }

      const documentPayload = []
      const payslipDocument = await getFileInfo(data.payslip)

      if (payslipDocument) {
        documentPayload.push(payslipDocument)
      }

      const creditData = {
        basicSalary: payload.basicPay,
        netSalary: payload.netPay,
        tenure: data.tenure,
        ...(quote.serverEntry?.creditData || {}),
      }

      const completePayload = {
        documents: documentPayload,
        creditData,
        calculatedLoanAmount: effectiveLoanAmount,
        formData: data,
        loanAbilityResponse: quote.serverEntry || null,
      }

      saveCheckoutFormData(1, {
        ...data,
        calculatedLoanAmount: effectiveLoanAmount,
        documents: documentPayload,
        apiPayload: completePayload,
      })

      setQuoteError(null)
      onNext()
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.status?.message ||
          error?.message ||
          'An error occurred while checking your loan limit. Please try again.',
      )
      setErrorModalOpen(true)
    }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 gap-4 sm:gap-[50px]">
              <AmountInput
                control={form.control}
                name="basicPay"
                label="Basic Pay"
                placeholder="Enter your Basic Pay"
              />

              <AmountInput
                control={form.control}
                name="netPay"
                label="Net Pay"
                placeholder="Enter your Net Pay"
              />
            </div>

            {/* Repayment Period Slider */}
            <RepaymentPeriodSlider
              control={form.control}
              name="tenure"
              label="Loan Tenure"
              min={MIN_TENURE}
              max={MAX_TENURE}
              defaultValue={DEFAULT_TENURE}
            />

            {/* Loan Qualification Info */}
            {displayLoanAmount > 0 && (
              <div className="flex flex-col gap-2 rounded-xl border border-[#F47120] bg-[#F47120]/8 p-3">
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-center text-sm font-normal leading-[140%] text-[#0D0B26]">
                    Based on your details, you qualify for a loan of KES{' '}
                    {displayLoanAmount.toLocaleString()}, payable within{' '}
                    {currentRepaymentPeriod} months.
                  </p>
                  <p className="text-center text-xs font-normal leading-[140%] text-[#676D75]">
                    Cart Total:{' '}
                    <span
                      className={
                        isCartWithinLoanLimit ? 'text-green-600' : 'text-orange-500'
                      }
                    >
                      KES {grandTotal.toLocaleString()}
                    </span>
                  </p>
                </div>
                {!isCartWithinLoanLimit && (
                  <p className="text-center text-xs font-medium text-orange-500">
                    Your cart exceeds the eligible amount. Reduce your cart total or
                    adjust the loan tenure to proceed.
                  </p>
                )}
              </div>
            )}

            {quoteError && (
              <p className="text-center text-sm font-medium text-red-500">
                {quoteError}
              </p>
            )}

            {/* Upload Payslip */}
            <FileUpload
              control={form.control}
              name="payslip"
              label="Upload Latest Payslip"
              accept=".pdf,.jpg,.jpeg,.png"
              placeholder="Document Type"
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
          variant={'outline'}
          className="flex justify-center items-center px-4 py-3 w-full sm:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type="button"
          disabled={loanAbilityMutation.isPending}
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[193px] h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          {loanAbilityMutation.isPending
            ? 'Checking eligibility...'
            : 'Next: Personal Info'}
        </Button>
      </div>
      <ErrorAlertDialog
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={errorMessage}
        primLink={'/cart'}
        primaryAction={{
          label: 'Adjust Cart',
          onClick: () => {
            setErrorModalOpen(false)
            onPrevious()
          },
        }}
        secondaryAction={{
          label: 'Adjust Tenure',
          onClick: () => {
            setErrorModalOpen(false)
          },
        }}
      />
    </div>
  )
}
