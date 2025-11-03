import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useCallback } from 'react'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon, X, XIcon } from 'lucide-react'
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
      onPhotoChange(uploadedUrl)
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
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#252525]/20 backdrop-blur-sm" />

        <DialogPrimitive.Content
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-[335px] max-w-full -translate-x-1/2 -translate-y-1/2',
            'rounded-3xl bg-white p-5 shadow-xl md:w-[500px] md:p-8',
            'animate-in fade-in zoom-in-95 duration-200',
          )}
        >
          {/* Close Button – Orange Border */}
          <button
            onClick={onClose}
            className="absolute right-5 md:right-[30px] top-5 md:top-[30px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
          >
            <XIcon className="h-6 w-6 text-[#09244B]" />
            <span className="sr-only">Close</span>
          </button>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#252525] md:text-[28px]">
              Profile Photo
            </h2>
          </div>

          {/* Avatar Preview */}
          <div className="mt-6 flex justify-center">
            <Avatar className="h-48 w-48 rounded-full border-4 border-white shadow-lg">
              <AvatarImage src={preview} alt="Preview" />
              <AvatarFallback className="bg-[#F9FAFB]">
                <ImageIcon className="h-20 w-20 text-[#A0A4AC]" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Upload Area */}
          {uploadMode && (
            <div
              {...getRootProps()}
              className={cn(
                'mt-6 rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors',
                isDragActive
                  ? 'border-[#F8971D] bg-[#FFF8F0]'
                  : 'border-[#E8ECF4] bg-[#F9FAFB]',
              )}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-2 h-6 w-6 text-[#676D75]" />
              <p className="text-sm font-medium text-[#4d4d4e]">
                {isDragActive
                  ? 'Drop the image here'
                  : 'Drag & drop or click to upload'}
              </p>
            </div>
          )}

          {/* Action Buttons – Responsive */}
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {uploadMode ? (
              <>
                <Button
                  onClick={handleSave}
                  variant="gradient"
                  className="h-12 w-full rounded-3xl text-base font-medium"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="h-12 w-full rounded-3xl border-[#F8971D] text-[#F8971D] hover:bg-[#F8971D]/10"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleUpdatePhoto}
                  variant="gradient"
                  className="h-12 w-full rounded-3xl text-base font-medium"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Update Photo
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="h-12 w-full rounded-3xl border-[#F8971D] text-[#F8971D] hover:bg-[#F8971D]/10"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

/* --------------------------------------------------------------
   Mock Upload (remove in prod)
   -------------------------------------------------------------- */
async function uploadAvatarToServer(file) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(URL.createObjectURL(file))
      } else {
        reject(new Error('Upload failed'))
      }
    }, 1200)
  })
}

export const Route = createFileRoute('/_protected/profile/ProfileDialog')({
  component: RouteComponent,
})

export const component = RouteComponent
export const ProfilePhotoDialog = RouteComponent
