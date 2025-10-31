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
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
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
    console.log('Form submitted:', data)
    handleNext()
  }

  const CurrentStepComponent = steps[currentStep - 1]?.component
  const hasComponent = CurrentStepComponent !== null && CurrentStepComponent !== undefined

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'iPhone 14', path: `/products/${productId}` },
    { label: 'Checkout', path: `/Checkout`, isCurrent: true },
  ]

  return (
    <div className="min-h-screen bg-white ">
      <BreadCrumbs items={breadcrumbItems} className="my-8" />

      {/* Center everything with max-width and mx-auto */}
      <div className="max-w-[1230px] mx-auto flex flex-col">
        {!isCompleted ? (
          <>
            {/* Stepper Header */}
            <div className="mb-12 w-full">
              {/* Desktop View */}
              <div className="hidden md:block">
                {/* Circles and Lines Row */}
                <div className="flex items-center mb-3">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      {/* Circle */}
                      <div className="relative shrink-0">
                        {step.id < currentStep ? (
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        ) : step.id === currentStep ? (
                          <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          </div>
                        )}
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div
                          className={`h-[3px] flex-1 ${
                            step.id < currentStep ? 'bg-orange-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Labels Row */}
                <div className="flex items-center">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div
                        className="text-center -ml-6 shrink-0"
                        style={{ width: '40px' }}
                      >
                        <p
                          className={`text-base font-medium leading-[1.4] flex items-center justify-center -mr-10 h-[22px] whitespace-nowrap ${
                            step.id <= currentStep
                              ? 'text-[#0D0B26]'
                              : 'text-gray-400'
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
              <div className="block md:hidden">
                {/* Circles and Lines Row */}
                <div className="flex items-center mb-4">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      {/* Circle */}
                      <div className="relative shrink-0">
                        {step.id < currentStep ? (
                          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        ) : step.id === currentStep ? (
                          <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          </div>
                        )}
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div
                          className={`h-[2px] flex-1 ${
                            step.id < currentStep ? 'bg-orange-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Labels Row - Stacked on Mobile */}
                <div className="flex items-start justify-between">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="text-center flex-1 first:text-left last:text-right"
                    >
                      <p
                        className={`text-[10px] font-medium leading-tight ${
                          step.id <= currentStep
                            ? 'text-[#0D0B26]'
                            : 'text-gray-400'
                        }`}
                        style={{
                          wordBreak: 'break-word',
                          maxWidth: '60px',
                          margin: '0 auto',
                        }}
                      >
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Step Content Area - Centered */}
            <div className="flex justify-center w-full">
              <div className="bg-white w-full max-w-full">
                {CurrentStepComponent ? (
                  <CurrentStepComponent
                    onSubmit={handleFormSubmit}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    currentStep={currentStep}
                    isFirstStep={currentStep === 1}
                    isLastStep={currentStep === steps.length}
                  />
                ) : (
                  <div className="p-8 border border-gray-200 rounded-2xl">
                    <p className="text-gray-600">
                      Content for {steps[currentStep - 1]?.label}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Navigation Buttons */}
            {!hasComponent && (
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
          </>
        ) : (
          <div className="flex justify-center w-full">
            <DonePage />
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
})