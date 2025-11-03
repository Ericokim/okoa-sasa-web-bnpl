import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthDialog } from '../AuthDialog'

export default function AccountOptionPage({ onNext, onPrevious, isFirstStep }) {
  const [isAccepted, setIsAccepted] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  const handleGuestCheckout = () => {
    if (onNext) {
      onNext()
    }
  }

  const handleLoginSuccess = () => {
    if (onNext) {
      onNext()
    }
  }

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

          {/* Checkbox Section */}
          <div className="mb-6">
            <div className="flex flex-row items-start sm:items-left p-0 gap-3 w-full h-auto sm:h-[34px]">
              <Checkbox
                id="account-terms"
                checked={isAccepted}
                onCheckedChange={setIsAccepted}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:mt-6">
            <Button
              onClick={() => setShowAuthDialog(true)}
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium shadow-md"
            >
             Sign In
            </Button>

            <Button
              onClick={handleGuestCheckout}
              variant="outline"
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-3xl text-base font-medium"
            >
              Continue As Guest
            </Button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant="outline"
          className="flex justify-center items-center px-4 py-3 w-full md:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back
        </Button>
      </div>
      <AuthDialog onLoginSuccess={handleLoginSuccess} open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  )
}
