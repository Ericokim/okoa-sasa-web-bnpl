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
              <h3 className="text-xl  font-medium text-red-400">
                Delete My Account
              </h3>
            </div>
            <p className="text-md text-gray-600">
              Permanently delete the account and remove access from all workspaces
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 border bg-red-400 text-white hover:bg-red-500 rounded-full px-4 py-2 text-sm font-medium transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>

         
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              Are You Sure You Want To Delete This Account?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This Will Permanently Remove Your Account
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full py-2 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full py-2 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    // <>
    //   <div className="border-2 border-red-200 rounded-xl shadow-sm p-6 bg-red-50/30">
    //     <div className="flex items-center gap-2 mb-3">
    //       <AlertTriangle className="w-5 h-5 text-red-600" />
    //       <h3 className="text-xl font-semibold text-gray-900">
    //         Delete My Account
    //       </h3>
    //     </div>
    //     <p className="text-sm text-gray-600 mb-4">
    //       Permanently delete the account and remove access from all workspaces
    //     </p>

    //      <Button
    //         variant="outline"
    //         className="border-brand-primary-start text-brand-primary-start rounded-3xl px-4 py-2 bg-gradient-to-b from-transparent to-transparent hover:from-brand-primary-start/10 hover:to-brand-primary-end/10"
    //       >
    //         Delete Account
    //       </Button>
      
    //   </div>

    //   {/* Modal */}
    //   {open && (
    //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    //       <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
    //         <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
    //           <Trash2 className="w-8 h-8 text-white" />
    //         </div>
    //         <h2 className="text-xl font-bold mb-2">
    //           Are You Sure You Want To Delete This Account?
    //         </h2>
    //         <p className="text-sm text-gray-600 mb-6">
    //           This Will Permanently Remove Your Account
    //         </p>

    //         <div className="flex gap-3">
    //           <button
    //             onClick={confirmDelete}
    //             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full py-2"
    //           >
    //             Delete
    //           </button>
    //           <button
    //             onClick={() => setOpen(false)}
    //             className="flex-1 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full py-2"
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
  )
}
