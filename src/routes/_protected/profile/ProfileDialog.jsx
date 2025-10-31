import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useCallback } from 'react'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useDropzone } from 'react-dropzone'
import { Camera, Upload, Image as ImageIcon, Trash2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { enqueueSnackbar } from 'notistack'
import { TrashIcon } from '@/assets/icons'

export function RouteComponent({
  isOpen,
  onClose,
  currentPhoto,
  onPhotoChange,
}) {
  const [preview, setPreview] = useState(currentPhoto)
  const [uploadMode, setUploadMode] = useState(false)
  const [tempFile, setTempFile] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setTempFile(file)
      setUploadMode(true)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  const handleSave = async () => {
    if (!tempFile) return

    try {
      const uploadedUrl = await uploadAvatarToServer(tempFile)
      onPhotoChange(uploadedUrl) // <-- Triggers updateAvatar
      enqueueSnackbar('Profile photo updated successfully!', {
        variant: 'success',
      })
      onClose()
    } catch (err) {
      enqueueSnackbar('Upload failed. Please try again.', { variant: 'error' })
    }
  }

  const handleCancel = () => {
    setTempFile(null)
    setPreview(currentPhoto)
    setUploadMode(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete your profile photo?')) {
      onPhotoChange(null)
      enqueueSnackbar('Profile photo removed.', { variant: 'info' })
      onClose()
    }
  }

  const handleUpdatePhoto = () => {
    setUploadMode(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#252525]/20 backdrop-blur-[4px]" />

        <DialogPrimitive.Content
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-6 duration-200',
            'rounded-3xl border-0 bg-white p-0 shadow-lg',
            'max-w-[335px] w-[335px]',
            'md:max-w-[500px] md:w-[500px]',
            'h-auto min-h-[569px] md:min-h-auto',
          )}
        >
          <div className="relative w-full p-5 md:p-[30px] flex flex-col items-center gap-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-5 md:right-[30px] top-5 md:top-[30px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
            >
              <X className="h-6 w-6 text-[#09244B]" />
              <span className="sr-only">Close</span>
            </button>

            {/* Header */}
            <div className="flex flex-col items-center gap-2 w-full text-left">
              <h2 className="text-[#252525] text-2xl md:text-[28px] font-semibold leading-[140%] capitalize font-['Public_Sans']">
                Profile photo
              </h2>
            </div>

            {/* Avatar Preview */}
            <div className="flex justify-center py-4">
              <Avatar className="h-48 w-48 rounded-full border-4 border-white shadow-md">
                <AvatarImage src={preview} alt="preview" />
                <AvatarFallback className="bg-[#F9FAFB]">
                  <ImageIcon className="h-20 w-20 text-[#A0A4AC]" />
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Upload Area – only in upload mode */}
            {uploadMode && (
              <div
                {...getRootProps()}
                className={cn(
                  'w-full rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors',
                  isDragActive
                    ? 'border-[#F8971D] bg-[#FFF8F0]'
                    : 'border-[#E8ECF4] bg-[#F9FAFB]',
                )}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto mb-2 h-6 w-6 text-[#676D75]" />
                <p className="text-sm font-medium text-[#4d4d4e] leading-[140%] font-['Public_Sans']">
                  {isDragActive
                    ? 'Drop the image here'
                    : 'Drag & drop or click to upload'}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 ">
              {/* Save / Cancel – only when uploadMode */}
              {uploadMode && (
                <div className="flex gap-3 justify-center w-full">
                  <Button
                    onClick={handleSave}
                    variant="gradient"
                    className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
             text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
                  >
                    Save
                  </Button>

                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             border border-[#F8971D] text-[#F8971D] rounded-3xl 
             font-medium text-base hover:bg-[#F8971D]/10 transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {/* Default Actions */}
              {!uploadMode && (
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={handleUpdatePhoto}
                    variant="gradient"
                    className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
             text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Update Photo
                  </Button>

                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             border border-[#F8971D] text-[#F8971D] rounded-3xl 
             font-medium text-base hover:bg-[#F8971D]/10 transition-all"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

/* --------------------------------------------------------------
   Helper: upload file to mimic backend
   -------------------------------------------------------------- */

async function uploadAvatarToServer(file) {
  // --- MOCK MODE (remove when API is ready) ---
  if (import.meta.env.DEV) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          const url = URL.createObjectURL(file)
          resolve(url)
        } else {
          reject(new Error('Mock upload failed'))
        }
      }, 1200)
    })
  }

  // --- REAL API (uncomment when ready) ---
  // const form = new FormData()
  // form.append('avatar', file)
  // const res = await fetch('/api/upload-avatar', { method: 'POST', body: form })
  // if (!res.ok) throw new Error('Upload failed')
  // const data = await res.json()
  // return data.url
}

export const Route = createFileRoute('/_protected/profile/ProfileDialog')({
  component: RouteComponent,
})

export const component = RouteComponent
export const ProfilePhotoDialog = RouteComponent
