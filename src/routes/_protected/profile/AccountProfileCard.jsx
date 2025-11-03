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

  const handlePhotoChange = (url) => {
    updateAvatar(url)
    closeDialog()
  }

  return (
    <>
      {/* ========== MOBILE VIEW (block md:hidden) ========== */}
      <div className="block md:hidden rounded-xl border bg-card p-5">
        {/* Avatar – Centered */}
        <div className="flex justify-center mb-5">
          <div className="relative inline-block">
            <div
              className="group relative cursor-pointer rounded-full"
              onClick={openDialog}
            >
              <Avatar className="h-28 w-28 ring-1 ring-white">
                <AvatarImage src={avatarUrl} alt="Profile" />
                <AvatarFallback className="text-2xl font-medium">
                  {personalInfo.firstName[0]}
                  {personalInfo.lastName[0]}
                </AvatarFallback>
              </Avatar>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-10 w-10 text-white" />
              </div>

              {/* Permanent Camera – Bottom Right */}
              <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1 bg-white rounded-full p-1.5 shadow-md border border-gray-200">
                <Camera className="h-5 w-5 text-[#252525]" />
              </div>
            </div>
          </div>
        </div>

        {/* Info – Centered */}
        <div className="text-center space-y-3">
          <div>
            <h1 className="font-sans text-2xl font-semibold text-[#252525] capitalize">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="font-sans text-base text-[#252525] mt-1">
              {personalInfo.company}
            </p>
            <p className="font-sans text-sm text-[#6B7280] flex items-center justify-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              {personalInfo.location}
            </p>
          </div>

          {/* Employee No. & National ID */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-center gap-2">
              <Badge
                variant="secondary"
                className="bg-orange-50 text-orange-700 border-orange-200 text-xs"
              >
                <UserCheck className="h-3 w-3 mr-1" />
                Employee No.
              </Badge>
              <span className="font-mono text-sm font-medium text-foreground">
                {personalInfo.employeeId || '—'}
              </span>
            </div>

            {personalInfo.ID && (
              <div className="flex items-center justify-center gap-2">
                <Badge variant="outline" className="border-gray-300 text-xs">
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

      {/* ========== DESKTOP VIEW (hidden md:block) ========== */}
      <div className="hidden md:block rounded-xl border bg-card p-6">
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="relative">
            <div
              className="group relative cursor-pointer rounded-full"
              onClick={openDialog}
            >
              <Avatar className="h-24 w-24 ring-1 ring-white">
                <AvatarImage src={avatarUrl} alt="Profile" />
                <AvatarFallback className="font-medium text-xl">
                  {personalInfo.firstName[0]}
                  {personalInfo.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-10 w-10 text-white" />
              </div>

              <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
                <Camera className="h-5 w-5 text-[#252525]" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="font-sans text-[28px] font-semibold leading-[39px] capitalize text-[#252525]">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="font-sans text-base font-normal leading-[22px] text-[#252525]">
                {personalInfo.company}
              </p>
              <p className="font-sans text-base font-normal leading-[22px] text-[#252525] flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {personalInfo.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  Employee No.
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
      </div>

      {/* Dialog */}
      <ProfilePhotoDialog
        isOpen={dialogOpen}
        onClose={closeDialog}
        currentPhoto={avatarUrl}
        onPhotoChange={handlePhotoChange}
      />
    </>
  )
}

export const Route = createFileRoute('/_protected/profile/AccountProfileCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const AccountProfileCard = RouteComponent