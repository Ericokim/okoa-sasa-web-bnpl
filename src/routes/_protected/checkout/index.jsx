import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import PersonalInfoForm from '@/components/shared/Checkout/PersonalInfo'
import TermsConditionPage from '@/components/shared/Checkout/TermsConditions'
import AccountOptionPage from '@/components/shared/Checkout/AccountOption'

const steps = [
  {
    id: 1,
    name: 'Check Loan Limit',
    label: 'Check Loan Limit',
    component: null,
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
    component: null, // Add your component here
  },
  {
    id: 4,
    name: 'Order Summary',
    label: 'Order Summary',
    component: null, // Add your component here
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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data)
    // Handle form submission and move to next step
    handleNext()
  }

  // Get the current step's component
  const CurrentStepComponent = steps[currentStep - 1].component
  const hasComponent = CurrentStepComponent !== null

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="w-[1067px] flex flex-col justify-center">
        {/* Stepper Header */}
        <div className="mb-12 w-[1067px]">
          {/* Circles and Lines Row */}
          <div className="flex items-center mb-3">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Circle */}
                <div className="relative shrink-0">
                  {step.id < currentStep ? (
                    // Completed - filled orange with white check
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                  ) : step.id === currentStep ? (
                    // Current - white bg with orange border and orange dot
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    </div>
                  ) : (
                    // Upcoming - gray border with gray dot
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
                {/* Label under circle */}
                <div
                  className="text-center -ml-6 shrink-0"
                  style={{ width: '40px' }}
                >
                  <p
                    className={`text-base font-medium leading-[1.4] flex  items-center justify-center -mr-10 h-[22px] whitespace-nowrap ${
                      step.id <= currentStep
                        ? 'text-[#0D0B26]'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>

                {/* Spacer for the line */}
                {index < steps.length - 1 && <div className="flex-1"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content Area */}
        <div>
          <div className="bg-white w-[1020px]">
            {/* Render the current step's component */}
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
              <div className="">
                <p className="">Content for {steps[currentStep - 1].label}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons - Only show when there's no component */}
        {!hasComponent && (
          <div className="flex justify-between items-center">
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

export const Route = createFileRoute('/_protected/checkout/')({
  component: CheckoutPage,
})
