import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Camera, IdCard, MapPin, UserCheck } from 'lucide-react'
import { ProfilePhotoDialog } from './ProfileDialog'
import { useAccountStore } from '@/data/accountStore'
import { Badge } from '@/components/ui/badge'

export function RouteComponent() {
  const { personalInfo, updateAvatar } = useAccountStore()
  const [dialogOpen, setDialogOpen] = useState(false)

  const avatarUrl = personalInfo.avatar || '/avator.png'

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  // This will be called by the dialog
  const handlePhotoChange = (url) => {
    updateAvatar(url)
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-none">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* === AVATAR – EXACT DESIGN === */}
        <div className="relative inline-block">
          <div className="group relative cursor-pointer" onClick={openDialog}>
            <Avatar className="h-24 w-24 ring-2 ring-orange-100">
              <AvatarImage src={avatarUrl} alt="Profile" />
              <AvatarFallback className="font-medium text-xl">
                {personalInfo.firstName[0]}
                {personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>

            {/* Hover: dark overlay + big camera */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-10 w-10 text-white" />
            </div>

            {/* Permanent camera – overlaps bottom-right */}
            <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
              <Camera className="h-5 w-5 text-[#252525]" />
            </div>
          </div>
        </div>

        {/* === INFO === */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="font-sans text-[28px] font-semibold leading-[39px] capitalize text-[#252525] flex-none order-0 flex-grow-0">
              {personalInfo.firstName}
            </h1>
            <h3 className="text-2xl font-bold text-gray-900"></h3>
            <p className="font-sans text-base font-normal leading-[22px] text-[#252525] flex-none order-1 flex-grow-0">
              {personalInfo.company}
            </p>
            <p className="font-sans text-base font-normal leading-[22px] text-[#252525] flex-none order-2 flex-grow-0">
              {personalInfo.location}
            </p>
           
          </div>

        

          <div className="flex flex-wrap gap-4 pt-2 -mt-2 ">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                <UserCheck className="h-3 w-3 mr-1" />
                Employee ID
              </Badge>
              <span className="font-mono text-sm font-medium text-foreground">
                {personalInfo.employeeId}
              </span>
            </div>

            {personalInfo.ID && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-gray-300">
                  <IdCard className="h-3 w-3 mr-1" />
                  National ID
                </Badge>
                <span className="font-mono text-sm font-medium text-foreground">
                  {personalInfo.ID}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog */}
      <ProfilePhotoDialog
        isOpen={dialogOpen}
        onClose={closeDialog}
        currentPhoto={avatarUrl}
        onPhotoChange={handlePhotoChange}
      />
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/AccountProfileCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const AccountProfileCard = RouteComponent
