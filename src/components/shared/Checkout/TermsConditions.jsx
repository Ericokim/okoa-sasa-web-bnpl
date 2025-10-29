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
    <div className=" bg-white flex items-center justify-center p-4 w-[1020px]">
      <div className="w-[1020px] h-[195px] bg-white rounded-4xl shadow-sm p-6">
        <div className="w-[972px] h-16">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="w-full max-w-[972px] text-2xl font-semibold leading-[1.4] capitalize text-[#252525]">
              Terms & Condition
            </h1>
            <p className="w-full max-w-[972px] text-base font-medium leading-[1.4] text-[#676D75]">
              Review our terms and conditions before proceeding
            </p>
          </div>

          <div className="h-0.5 bg-gray-300 my-6"></div>

          {/* Checkbox Section */}
          <div className="">
            <div className="flex flex-row items-center p-0 gap-3 w-full max-w-[443px] h-[34px]">
              <Checkbox
                id="terms"
                checked={isAccepted}
                onCheckedChange={setIsAccepted}
                className="flex flex-col justify-center items-center w-[34px] h-[34px] border-2 border-[#E8ECF4] rounded-xl p-0 gap-2.5"
              />
              <label
                htmlFor="terms"
                className="w-full max-w-[397px] h-[25px] flex items-center text-center text-lg font-medium leading-[1.4] capitalize text-[#0D0B26] cursor-pointer select-none"
                onClick={handleTextClick}
              >
                I Accept{'  '}
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors ml-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {'  '}Terms & Conditions{'  '}
                </Link>{' '}
                <p className="mx-1"> And</p>
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex mt-[100px] -mr-7 justify-end space-x-2.5">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <p className="w-[114px] h-[22px] text-base font-medium leading-[1.4] capitalize bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent">
                Return To Back
              </p>
            </Button>
            <Button
              disabled={!isAccepted || isLastStep}
              onClick={onNext}
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-48 h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl"
            >
              <p className="w-40 h-[22px] text-base font-medium leading-[1.4] capitalize text-white">
                Next: Account Option
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
