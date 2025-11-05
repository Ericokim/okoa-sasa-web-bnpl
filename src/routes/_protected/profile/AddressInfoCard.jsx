import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { useAccountStore } from '@/data/accountStore'
import { EditIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { FormTextarea } from '@/components/shared/Inputs/FormTextarea'
import { Separator } from '@/components/ui/separator' // Added for your snippet

const addressSchema = z.object({
  street: z
    .string()
    .min(1, 'Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address is too long'),
})

export function RouteComponent() {
  const { addresses, updateAddress } = useAccountStore()
  const [editing, setEditing] = useState(null)

  const startEdit = (type) => setEditing(type)
  const saveAddress = (type, data) => {
    updateAddress(type, data)
    setEditing(null)
  }
  const cancelEdit = () => setEditing(null)

  const office = addresses.find((a) => a.type === 'office')
  const home = addresses.find((a) => a.type === 'home')

  return (
    <div className="border rounded-xl p-6 bg-white">
      <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
        Address
      </h2>

      <hr className="my-4 border-gray-200" />

      {/* Office Address */}
      {office && (
        <div className="mb-6 rounded-xl border p-4">
          <div className="flex justify-between items-start gap-4 mb-2">
            <p className="font-sans text-base font-normal leading-snug text-gray-600">
              Office Address
            </p>

            {editing !== 'office' && (
              <button
                onClick={() => startEdit('office')}
                className="cursor-pointer flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
              >
                <EditIcon />
                Edit
              </button>
            )}
          </div>

          {editing === 'office' ? (
            <AddressEditForm
              type="office"
              initialData={office}
              onSave={saveAddress}
              onCancel={cancelEdit}
            />
          ) : (
            <p className="font-sans font-medium text-lg capitalize text-[#252525] whitespace-pre-line">
              {office.street}
            </p>
          )}
        </div>
      )}

      <Separator className="mb-6" />

      {/* Home Address */}
      {home && (
        <div className="rounded-xl border p-4">
          <div className="flex justify-between items-start gap-4 mb-2">
            <p className="font-sans text-base font-normal leading-snug text-gray-600">
              Home Address
            </p>

            {editing !== 'home' && (
              <button
                onClick={() => startEdit('home')}
                className="cursor-pointer flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
              >
                <EditIcon />
                Edit
              </button>
            )}
          </div>

          {editing === 'home' ? (
            <AddressEditForm
              type="home"
              initialData={home}
              onSave={saveAddress}
              onCancel={cancelEdit}
            />
          ) : (
            <p className="font-sans font-medium text-lg capitalize text-[#252525] whitespace-pre-line">
              {home.street}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function AddressEditForm({ type, initialData, onSave, onCancel }) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: { street: initialData?.street || '' },
  })

  const handleSave = (data) => onSave(type, data)
  const handleCancel = () => {
    form.reset()
    onCancel()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="space-y-4 -mx-4 sm:mx-0"
      >
        <div className="px-4 sm:px-0">
          <FormTextarea
            control={form.control}
            name="street"
            label=""
            placeholder="Enter complete address (street, building, floor, city, postal code)"
            minRows={3}
            maxRows={6}
            className="w-full bg-white border-gray-300 text-sm sm:text-base resize-none box-border"
          />
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 pt-2 px-4 sm:px-0">
          <Button
            type="submit"
            className="w-full sm:flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2 font-medium transition-colors text-sm sm:text-base"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="w-full sm:flex-1 border border-gray-300 rounded-full py-2 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Route = createFileRoute('/_protected/profile/AddressInfoCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const AddressInfoCard = RouteComponent
