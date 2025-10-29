import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function AccountOptionPage() {
  return (
    <div className="flex items-center justify-center p-4 sm:p-0">
      <div className="bg-white w-full max-w-[1020px] h-auto sm:h-[207px] rounded-4xl shadow-sm p-4 sm:p-6">
        <div className="w-full">
          {/* Header */}
          <div className="h-auto sm:h-16 mb-4 sm:mb-0">
            <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
              Account Option
            </h1>
            <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
              No Account? Proceed to checkout and you can create an account
              after purchase
            </p>
          </div>
          
          <div className="w-full h-px bg-[#E8ECF4] my-4 sm:my-6"></div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:mt-6">
            <Button
              asChild
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 rounded-3xl text-base font-medium shadow-md"
            >
              <Link to="/create-account">Create Account</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-3xl text-base font-medium"
            >
              <Link to="/checkout">Continue As Guest</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}