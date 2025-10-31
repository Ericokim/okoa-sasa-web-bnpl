import { CheckoutDoneIcon } from '@/assets/icons'
import React from 'react'
import { Button } from '../CustomButton'
import { Link } from '@tanstack/react-router'

const DoneScreen = () => {
  return (
    <div className="bg-white grid grid-cols-1 place-items-center w-full max-w-full h-auto rounded-4xl border border-gray-200 p-6">
      <div className="w-[200px] h-[200px] mb-6">
        <CheckoutDoneIcon />
      </div>
      <div className="h-auto sm:h-16 sm:mb-0 text-center">
        <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
          Your Order Has been Received
        </h1>
        <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
          You will be contacted for further information and approval.
        </p>
      </div>
      <div className="h-[46px] w-[344px] mt-6 flex justify-center">
        <Button
          asChild
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[474px] h-[46px] flex-1 bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90 rounded-3xl text-base font-medium shadow-md"
        >
          <Link to="/">Back Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default DoneScreen
