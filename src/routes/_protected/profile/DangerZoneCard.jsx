import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TrashIconWhite } from '@/assets/icons'

export function RouteComponent() {
  const [open, setOpen] = useState(false)

  const confirmDelete = () => {
    setOpen(false)
  }

  return (
    <>
      {/* Danger Zone Card */}

      <div className="border-2  rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left: Title + Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-sans text-xl sm:text-2xl font-medium leading-tight text-red-400">
                Delete My Account
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#A0A4AC] break-words">
              Permanently delete the account and remove access from all
              workspaces
            </p>
          </div>

          {/* Button – full width on mobile, auto on desktop */}
          <Button
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 
                 bg-red-400 hover:bg-red-600 rounded-3xl 
                 text-white font-medium text-sm sm:text-base"
          >
            <TrashIconWhite className="w-5 h-5" />
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

export const Route = createFileRoute('/_protected/profile/DangerZoneCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const DangerZoneCard = RouteComponent
