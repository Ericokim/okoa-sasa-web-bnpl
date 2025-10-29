import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export default function TermsConditionPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const [isAccepted, setIsAccepted] = useState(false)

  const handleTextClick = (e) => {
    if (e.target.tagName === 'A') {
      return
    }
    setIsAccepted(!isAccepted)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-0 gap-6">
      {/* Main Content Container */}
      <div className="bg-white w-full max-w-[1020px] h-auto rounded-4xl shadow-sm p-4 sm:p-6">
        <div className="w-full h-auto">
          {/* Header */}
          <div className="space-y-2 mb-4 sm:mb-0">
            <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525]">
              Terms & Condition
            </h1>
            <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
              Review our terms and conditions before proceeding
            </p>
          </div>

          <div className="h-0.5 bg-gray-300 my-4 sm:my-6"></div>

          {/* Checkbox Section */}
          <div className="mb-6 sm:mb-0">
            <div className="flex flex-row items-start sm:items-center p-0 gap-3 w-full h-auto sm:h-[34px]">
              <Checkbox
                id="terms"
                checked={isAccepted}
                onCheckedChange={setIsAccepted}
                className="flex flex-col justify-center items-center w-6 h-6 sm:w-[34px] sm:h-[34px] border-2 border-[#E8ECF4] rounded-lg sm:rounded-xl p-0 gap-2.5 mt-1 sm:mt-0"
              />
              <label
                htmlFor="terms"
                className="w-full flex flex-wrap items-center text-center text-base sm:text-lg font-medium leading-[1.4] capitalize text-[#0D0B26] cursor-pointer select-none"
                onClick={handleTextClick}
              >
                <span className="mr-1">I Accept</span>
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors mx-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms & Conditions
                </Link>
                <span className="mx-1">And</span>
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors mx-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          {/* Spacer for desktop to maintain height */}
          <div className="hidden sm:block h-[60px]"></div>
        </div>
      </div>

      {/* Buttons Container - Completely Outside */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-[1020px]">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep}
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          <p className="text-base font-medium leading-[1.4] capitalize">
            Return To Back
          </p>
        </Button>
        <Button
          disabled={!isAccepted || isLastStep}
          onClick={onNext}
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-48 h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl"
        >
          <p className="text-base font-medium leading-[1.4] capitalize text-white">
            Next: Account Option
          </p>
        </Button>
      </div>
    </div>
  )
}