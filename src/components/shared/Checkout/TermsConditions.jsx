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
          <div className="">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Terms & Condition
            </h1>
            <p className="text-gray-500">
              Review our terms and conditions before proceeding
            </p>
          </div>

          <div className="h-0.5 bg-gray-300 my-6"></div>

          {/* Checkbox Section */}
          <div className="">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={isAccepted}
                onCheckedChange={setIsAccepted}
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-gray-700 cursor-pointer select-none flex-1"
                onClick={handleTextClick}
              >
                I Accept{' '}
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms & Conditions
                </Link>{' '}
                And{' '}
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
          <div className="flex mt-24 -mr-7 justify-end space-x-2.5">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
              className=" w-[146px] h-[46px] text-xs py-3 px-4 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full"
            >
              Return To Back
            </Button>
            <Button
              disabled={!isAccepted || isLastStep}
              onClick={onNext}
              className=" w-[146px] h-[46px] text-xs py-3 px-4 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full"
            >
              Next: Account Option
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
