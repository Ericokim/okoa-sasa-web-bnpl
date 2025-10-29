import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { AlertTriangle, AlertTriangleIcon, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import gsap from 'gsap'
import { EditIcon, TrashIcon, TrashIconWhite } from '@/assets/icons'

export const Route = createFileRoute('/_protected/profile/DangerZoneCard')({
  component: RouteComponent,
})

export function DangerZoneCard() {
  const [open, setOpen] = useState(false)

  const confirmDelete = () => {
    console.log('Account deleted')
    setOpen(false)
  }

  return (
    <>
      {/* Danger Zone Card */}
      <div className="border-2  rounded-xl p-6 ">
        <div className="flex items-start justify-between">
          {/* Left: Title + Description */}
          <div className="flex-1 pr-8">
            <div className="flex items-center gap-2 mb-3">
              <h2 class=" font-sans text-[24px] font-medium leading-[34px] capitalize text-red-400 flex-none order-0 ">
                Delete My Account
              </h2>
            </div>

            <p className="font-sans text-base   text-[#A0A4AC] flex-none order-1">
              Permanently delete the account and remove access from all
              workspaces
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="gradient"
            className="l h-[46px] px-4 py-3 
          bg-red-400 rounded-3xl 
             text-white font-medium text-base shadow-sm hover:bg-red-500"
          >
            <TrashIconWhite />
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
              <TrashIconWhite />
            </div>
            <h2 className="text-xl font-bold mb-2">
              Are You Sure You Want To Delete This Account?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This Will Permanently Remove Your Account
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={confirmDelete}
                variant="gradient"
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
             text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
              >
                Delete
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             border border-[#F8971D] text-[#F8971D] rounded-[24px] 
             font-medium text-base hover:bg-[#F8971D]/10 transition-all"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
