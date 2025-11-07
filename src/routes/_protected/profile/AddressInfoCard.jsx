import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { EditIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { FormTextarea } from '@/components/shared/Inputs/FormTextarea'
import { Separator } from '@/components/ui/separator' // Added for your snippet
import { useStateContext } from '@/context/state-context'
import { useUpdateUserAddress } from '@/lib/queries/user'

const addressSchema = z.object({
  street: z
    .string()
    .min(1, 'Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address is too long'),
})

const normalizeType = (type = '') => {
  const lowered = type.toLowerCase()
  if (lowered === 'office') return 'Office'
  if (lowered === 'shipping' || lowered === 'home') return 'Shipping'
  return type
}

export function RouteComponent() {
  const { user, login } = useStateContext()
  const [editing, setEditing] = useState(null)
  const addresses = Array.isArray(user?.addresses) ? user.addresses : []
  const office = addresses.find(
    (a) => normalizeType(a?.type) === 'Office',
  )
  const home = addresses.find(
    (a) => normalizeType(a?.type) === 'Shipping',
  )

  const userId =
    user?.id || user?.userId || user?.userID || user?.idNumber || undefined

  const updateAddressMutation = useUpdateUserAddress({
    onSuccess: (_response, variables) => {
      const updatedType = variables?.type || 'Office'
      const normalizedType = normalizeType(updatedType).toLowerCase()
      const nextAddresses = [
        ...addresses.filter(
          (addr) => normalizeType(addr?.type).toLowerCase() !== normalizedType,
        ),
        {
          ...variables,
          type: updatedType,
          street: variables?.address,
          address: variables?.address,
        },
      ]

      login?.({
        ...(user || {}),
        addresses: nextAddresses,
      })
      setEditing(null)
    },
  })

  const startEdit = (type) => setEditing(type)

  const saveAddress = (type, data) => {
    if (!userId) return

    const payload = {
      userId,
      address: data.street.trim(),
      type: type === 'office' ? 'Office' : 'Shipping',
    }

    updateAddressMutation.mutate(payload)
  }

  const cancelEdit = () => setEditing(null)

  return (
    <div className="border rounded-xl p-6 bg-white">
      <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
        Address
      </h2>

      <hr className="my-4 border-gray-200" />

      {['office', 'home'].map((type, index) => {
        const isOffice = type === 'office'
        const label = isOffice ? 'Office Address' : 'Home Address'
        const addressData = isOffice ? office : home
        const hasAddress = Boolean(addressData?.street)
        const isEditing = editing === type

        return (
          <div key={type}>
            <div className="rounded-xl border p-4">
              <div className="flex justify-between items-start gap-4 mb-2">
                <p className="font-sans text-base font-normal leading-snug text-gray-600">
                  {label}
                </p>

                {!isEditing && (
                  <button
                    onClick={() => startEdit(type)}
                    className="cursor-pointer flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
                  >
                    <EditIcon />
                    {hasAddress ? 'Edit' : 'Add'}
                  </button>
                )}
              </div>

              {isEditing ? (
                <AddressEditForm
                  type={type}
                  initialData={addressData}
                  onSave={saveAddress}
                  onCancel={cancelEdit}
                  isSubmitting={updateAddressMutation.isPending}
                />
              ) : (
                <p className="font-sans font-medium text-lg capitalize text-[#252525] whitespace-pre-line text-muted-foreground">
                  {hasAddress ? addressData.street : 'No address on file yet.'}
                </p>
              )}
            </div>

            {index === 0 && <Separator className="my-6" />}
          </div>
        )
      })}
    </div>
  )
}

function AddressEditForm({ type, initialData, onSave, onCancel, isSubmitting }) {
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
            disabled={form.formState.isSubmitting || isSubmitting}
          >
            {form.formState.isSubmitting || isSubmitting ? 'Saving...' : 'Save'}
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
