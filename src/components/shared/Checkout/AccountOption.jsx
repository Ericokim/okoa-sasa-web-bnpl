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
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Account Option
            </h1>
            <p className="text-gray-500">
              No Account? Proceed to checkout and you can create an account
              after purchase
            </p>
          </div>
          <div className="h-0.5 bg-gray-300 my-6"></div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row mt-6 gap-6">
            <Button
              asChild
              className="flex-1 py-3 px-4 w-[474px] h-[46px] bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-full text-base font-medium shadow-md"
            >
              <Link to="/create-account">Create Account</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex-1 py-3 px-4 w-[474px] h-[46px] border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full text-base font-medium"
            >
              <Link to="/checkout">Continue As Guest</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
