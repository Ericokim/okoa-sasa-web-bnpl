import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import PersonalInfoForm from '@/components/shared/Checkout/PersonalInfo'
import TermsConditionPage from '@/components/shared/Checkout/TermsConditions'
import AccountOptionPage from '@/components/shared/Checkout/AccountOption'
import CheckoutLoanPage from '@/components/shared/Checkout/CheckoutLoan'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import DeliveryDetailsForm from '@/components/shared/Checkout/Deliver'
import OrderSummaryPage from '@/components/shared/Checkout/OrderSummary'
import DonePage from '@/components/shared/Checkout/DoneScreen'
import { useStateContext } from '@/context/state-context'

const steps = [
  {
    id: 1,
    name: 'Check Loan Limit',
    label: 'Check Loan Limit',
    component: CheckoutLoanPage,
  },
  {
    id: 2,
    name: 'Personal Info',
    label: 'Personal Info',
    component: PersonalInfoForm,
  },
  {
    id: 3,
    name: 'Delivery Details',
    label: 'Delivery Details',
    component: DeliveryDetailsForm,
  },
  {
    id: 4,
    name: 'Order Summary',
    label: 'Order Summary',
    component: OrderSummaryPage,
  },
  {
    id: 5,
    name: 'Terms & Conditions',
    label: 'Terms & Conditions',
    component: TermsConditionPage,
  },
  {
    id: 6,
    name: 'Account Option',
    label: 'Account Option',
    component: AccountOptionPage,
  },
]

export default function CheckoutPage() {
  const {
    checkoutStep: currentStep,
    setCheckoutStep: setCurrentStep,
    isCheckoutCompleted: isCompleted,
    setIsCheckoutCompleted: setIsCompleted,
    saveCheckoutFormData,
    getCheckoutFormData,
  } = useStateContext()

  const { productId } = Route.useParams()

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === steps.length) {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = (data) => {
    // Save form data for the current step
    saveCheckoutFormData(currentStep, data)
    console.log('Form submitted:', data)
    handleNext()
  }

  const CurrentStepComponent = steps[currentStep - 1]?.component
  const hasComponent =
    CurrentStepComponent !== null && CurrentStepComponent !== undefined

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'iPhone 14', path: `/products/${productId}` },
    { label: 'Checkout', path: `/Checkout`, isCurrent: true },
  ]

  return (
    <div className="min-h-screen max-w-full bg-white ">
      <BreadCrumbs items={breadcrumbItems} className="my-8 -ml-2" />

      <div className="max-w-full mx-auto flex flex-col">
        {/* Stepper Header - Always visible */}
        <div className="mb-9 w-full">
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="flex items-center mb-3">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="relative shrink-0">
                    {step.id < currentStep || isCompleted ? (
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      </div>
                    ) : step.id === currentStep && !isCompleted ? (
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      </div>
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-[3px] flex-1 ${
                        step.id < currentStep || isCompleted
                          ? 'bg-orange-500'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center relative">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="shrink-0 relative" style={{ width: '40px' }}>
                    <p
                      className={`text-base font-medium leading-[1.4] whitespace-nowrap ${
                        step.id <= currentStep || isCompleted
                          ? 'text-[#0D0B26]'
                          : 'text-gray-400'
                      } ${
                        index === 0
                          ? 'text-left'
                          : index === steps.length - 1
                            ? 'text-right absolute -mt-2.5 right-0'
                            : 'text-center -translate-x-1/2'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && <div className="flex-1"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="block lg:hidden">
            <div className="flex items-center mb-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="relative shrink-0">
                    {step.id < currentStep || isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    ) : step.id === currentStep && !isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      </div>
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-[2px] flex-1 ${
                        step.id < currentStep || isCompleted
                          ? 'bg-orange-500'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-start justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex-1 min-w-0"
                  style={{
                    textAlign:
                      index === 0
                        ? 'left'
                        : index === steps.length - 1
                          ? 'right'
                          : 'center',
                  }}
                >
                  <p
                    className={`text-[10px] sm:text-[11px] font-medium leading-[1.3] ${
                      step.id <= currentStep || isCompleted
                        ? 'text-[#0D0B26]'
                        : 'text-gray-400'
                    }`}
                    style={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content Area */}
        <div className="flex justify-center w-full">
          <div className="bg-white w-full max-w-full">
            {!isCompleted ? (
              <>
                {CurrentStepComponent ? (
                  <CurrentStepComponent
                    onSubmit={handleFormSubmit}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    currentStep={currentStep}
                    isFirstStep={currentStep === 1}
                    isLastStep={currentStep === steps.length}
                    savedData={getCheckoutFormData(currentStep)}
                  />
                ) : (
                  <div className="p-8 border border-gray-200 rounded-2xl">
                    <p className="text-gray-600">
                      Content for {steps[currentStep - 1]?.label}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <DonePage />
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        {!hasComponent && !isCompleted && (
          <div className="flex justify-between items-center mt-8 w-full max-w-[1020px] mx-auto">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-sm text-gray-500 font-medium">
              Step {currentStep} of {steps.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === steps.length
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
})
