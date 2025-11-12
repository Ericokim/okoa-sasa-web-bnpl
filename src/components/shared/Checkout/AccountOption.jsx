import React, { useState, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthDialog } from '../AuthDialog'
import { useStateContext } from '@/context/state-context'
import { useCreateOrder } from '@/lib/queries/orders'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  normalizeKenyanPhoneNumber,
  formatKenyanMsisdn,
} from '@/lib/validation'
import { Spinner } from '@/components/ui/spinner'

export default function AccountOptionPage({ onNext, onPrevious, isFirstStep }) {
  const [isAccepted, setIsAccepted] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [error, setError] = useState(null)
  const {
    getCheckoutFormData,
    saveCheckoutFormData,
    isAuthenticated,
    user,
    clearCart,
    setIsCheckoutCompleted,
  } = useStateContext()

  const { mutateAsync: createOrder, isPending } = useCreateOrder({
    onSuccess: (response) => {
      const payload = response?.data?.[0] || response?.data
      saveCheckoutFormData(6, {
        orderResponse: payload,
        orderStatus: response?.status,
        rawResponse: response,
      })
      clearCart?.()
      setIsCheckoutCompleted?.(true)
    },
  })

  // Function to combine all form data into the final payload
  const prepareFinalPayload = useCallback(() => {
    const step1Data = getCheckoutFormData(1) // Loan Limit
    const step2Data = getCheckoutFormData(2) // Personal Info
    const step3Data = getCheckoutFormData(3) // Delivery Details
    const step4Data = getCheckoutFormData(4) // Order Summary
    const step5Data = getCheckoutFormData(5) // Terms & Conditions

    if (!step1Data || !step2Data || !step3Data || !step4Data || !step5Data) {
      throw new Error('Please complete all checkout steps before submitting your order.')
    }

    if (!step5Data?.isAccepted) {
      throw new Error('Please accept the terms and conditions before continuing.')
    }

    const customerPhoneInput =
      step2Data?.apiPayload?.customer?.phoneNumber || step2Data?.phoneNumber || ''
    const normalizedCustomerPhone =
      normalizeKenyanPhoneNumber(customerPhoneInput) || customerPhoneInput || ''
    const customerMsisdn = formatKenyanMsisdn(
      normalizedCustomerPhone || customerPhoneInput || '',
    )

    const customer = {
      fullName: step2Data?.apiPayload?.customer?.fullName || step2Data?.fullName,
      phoneNumber: normalizedCustomerPhone,
      ...(customerMsisdn ? { msisdn: customerMsisdn } : {}),
      email: step2Data?.apiPayload?.customer?.email || step2Data?.email,
      employer: step2Data?.apiPayload?.customer?.employer || step2Data?.employer,
      employeeNumber:
        step2Data?.apiPayload?.customer?.employeeNumber || step2Data?.employeeNumber,
    }

    const orderLines = (step4Data?.apiPayload?.orderLines || []).map((line) => ({
      name: line.name,
      sku: line.sku,
      quantity: Number(line.quantity) || 0,
      unitPrice: Number(line.unitPrice) || 0,
    }))

    if (!orderLines.length) {
      throw new Error('Your cart is empty. Please add at least one product to proceed.')
    }

    const shippingDetail = { ...(step3Data?.apiPayload?.shippingDetail || {}) }
    const fallbackEmail = customer.email
    shippingDetail.recipientEmail = shippingDetail.recipientEmail || fallbackEmail || ''
    const shippingPhoneInput =
      shippingDetail.recipientPhoneNumber ||
      customer.phoneNumber ||
      customerPhoneInput ||
      ''
    const normalizedShippingPhone =
      normalizeKenyanPhoneNumber(shippingPhoneInput) ||
      shippingPhoneInput ||
      ''
    const shippingMsisdn =
      formatKenyanMsisdn(
        normalizedShippingPhone || shippingPhoneInput || customerMsisdn || '',
      ) || customerMsisdn
    shippingDetail.recipientPhoneNumber = normalizedShippingPhone
    if (shippingMsisdn) {
      shippingDetail.recipientMsisdn = shippingMsisdn
    }
    if (shippingDetail.type?.toLowerCase() === 'pickup' || shippingDetail.type === 'PickUp') {
      shippingDetail.type = 'PickUp'
    } else {
      shippingDetail.type = 'Delivery'
    }

    const creditData = step1Data?.apiPayload?.creditData || {}
    const formattedCreditData = {
      basicSalary: Number(creditData.basicSalary) || 0,
      netSalary: Number(creditData.netSalary) || 0,
      tenure: Number(creditData.tenure) || 0,
    }

    const userConsents = (step5Data?.apiPayload?.userConsents || []).map((consent) => ({
      ...consent,
      consentedAt: consent.consentedAt || new Date().toISOString(),
    }))

    if (!userConsents.length) {
      throw new Error('We were unable to capture your consents. Please accept the terms and try again.')
    }

    const documents = step1Data?.apiPayload?.documents || []

    const finalPayload = {
      customer,
      orderLines,
      shippingDetail,
      creditData: formattedCreditData,
      userConsents,
      documents,
    }

    return finalPayload
  }, [getCheckoutFormData])

  const submitOrder = useCallback(
    async ({ onSuccess } = {}) => {
      setError(null)
      try {
        const payload = prepareFinalPayload()
        await createOrder(payload)
        onSuccess?.()
      } catch (err) {
        setError(
          err?.message || 'We could not submit your order. Please review your details and try again.',
        )
        throw err
      }
    },
    [createOrder, prepareFinalPayload],
  )

  const handleGuestCheckout = async () => {
    try {
      await submitOrder({
        onSuccess: () => {
          onNext?.()
        },
      })
    } catch {
      /* handled in submitOrder */
    }
  }

  const handleLoginSuccess = async () => {
    try {
      await submitOrder({
        onSuccess: () => {
          setShowAuthDialog(false)
          onNext?.()
        },
      })
    } catch {
      /* handled */
    }
  }

  const handleSubmitOrder = async () => {
    try {
      await submitOrder({
        onSuccess: () => {
          onNext?.()
        },
      })
    } catch {
      /* handled */
    }
  }

  const userDisplayName = useMemo(() => {
    if (!user) return ''
    return (
      user.fullName ||
      [user.firstName, user.lastName].filter(Boolean).join(' ') ||
      user.email ||
      user.phoneNumber ||
      ''
    )
  }, [user])

  const showAccountPrompt = !isAuthenticated

  return (
    <div className="flex flex-col items-center justify-center mb-[50px] p-0 sm:p-0 gap-6">
      <div className="bg-white w-full border h-auto rounded-4xl p-4 sm:p-6">
        <div className="w-full">
          {/* Header */}
          <div className="h-auto sm:h-16 mb-4 sm:mb-0">
            <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
              Checkout Option
            </h1>
            <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
              Proceed to checkout and you can create an account after purchase
            </p>
          </div>

          <div className="w-full h-px bg-[#E8ECF4] my-4 sm:my-6"></div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showAccountPrompt ? (
            <>
              <div className="mb-6">
                <div className="flex flex-row items-start sm:items-left p-0 gap-3 w-full h-auto sm:h-[34px]">
                  <Checkbox
                    id="account-terms"
                    checked={isAccepted}
                    onCheckedChange={setIsAccepted}
                    disabled={isPending}
                    className="flex flex-col justify-center items-center w-6 h-6 sm:w-[34px] sm:h-[34px] border-2 border-[#E8ECF4] rounded-lg sm:rounded-xl p-0 gap-2.5 mt-1 sm:mt-0"
                  />
                  <label
                    htmlFor="account-terms"
                    className="w-full flex flex-wrap items-left lg:mt-1 md:mt-1 text-left text-base sm:text-lg font-medium leading-[1.4] capitalize text-[#0D0B26] cursor-pointer select-none"
                  >
                    <span className="mr-1">
                      No Account? Create Okoa Sasa shopping account
                    </span>
                  </label>
                </div>
              </div>

              {!isAccepted ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:mt-6">
                  <Button
                    onClick={() => setShowAuthDialog(true)}
                    disabled={isPending}
                    className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium shadow-md"
                  >
                    Sign In
                  </Button>

                    <Button
                      onClick={handleGuestCheckout}
                      disabled={isPending}
                      variant="outline"
                      className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium"
                    >
                      {isPending && (
                        <Spinner className="mr-2 h-4 w-4 text-orange-500" />
                      )}
                      {isPending ? 'Processing...' : 'Continue As Guest'}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:mt-6">
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={isPending}
                      className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium shadow-md"
                    >
                      {isPending && (
                        <Spinner className="mr-2 h-4 w-4 text-white" />
                      )}
                      {isPending ? 'Submitting...' : 'Submit Order'}
                    </Button>

                  <Button
                    onClick={onPrevious}
                    disabled={isPending}
                    variant="outline"
                    className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium"
                  >
                    Back
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* <div className="mb-6 rounded-2xl border border-[#FEE6D5] bg-[#FFF8F1] p-4 text-sm text-[#7A4E1D]">
                <p className="font-medium">
                  {userDisplayName ? `Signed in as ${userDisplayName}.` : 'You are signed in.'}
                </p>
                <p>
                  We&apos;ll use your account details to complete this order. Review and submit when ready.
                </p>
              </div> */}

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:mt-6">
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isPending}
                  className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium shadow-md"
                >
                  {isPending && (
                    <Spinner className="mr-2 h-4 w-4 text-white" />
                  )}
                  {isPending ? 'Submitting...' : 'Submit Order'}
                </Button>

                <Button
                  onClick={onPrevious}
                  disabled={isPending}
                  variant="outline"
                  className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium"
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Back Button - Hidden when checkbox is checked */}
      {!isAccepted && showAccountPrompt && (
        <div className="flex justify-end w-full">
          <Button
            onClick={onPrevious}
            disabled={isFirstStep || isPending}
            type="button"
            variant="outline"
            className="flex justify-center items-center px-4 py-3 w-full sm:w-[193px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
          >
            Back
          </Button>
        </div>
      )}

      <AuthDialog
        onLoginSuccess={handleLoginSuccess}
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
      />
    </div>
  )
}
