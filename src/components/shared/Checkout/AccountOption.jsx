import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function AccountOptionPage() {
  return (
    <div className=" bg-white flex items-center justify-center p-4">
      <div className="w-[1020px] h-[207px] bg-white rounded-4xl shadow-sm p-6">
        <div className="w-[972px]">
          {/* Header */}
          <div className="h-16">
            <h1 className="w-full max-w-[972px] text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
              Account Option
            </h1>
            <p className="w-full max-w-[972px] text-base font-medium leading-[1.4] text-[#676D75]">
              No Account? Proceed to checkout and you can create an account
              after purchase
            </p>
          </div>
          <div className="w-full max-w-[972px] h-px bg-[#E8ECF4] my-6"></div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row mt-6 gap-6">
            <Button
              asChild
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-[474px] h-[46px] flex-1 bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 rounded-3xl text-base font-medium shadow-md"
            >
              <Link to="/create-account">Create Account</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-[474px] h-[46px] flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-3xl text-base font-medium"
            >
              <Link to="/checkout">Continue As Guest</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
