import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { EditIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { FormTextarea } from '@/components/shared/Inputs/FormTextarea'
import { Separator } from '@/components/ui/separator'
import { useStateContext } from '@/context/state-context'
import { useUpdateUserAddress } from '@/lib/queries/user'

const addressSchema = z.object({
  street: z
    .string()
    .min(1, 'Address is required')
    .min(2, 'Address must be at least 10 characters')
    .max(500, 'Address is too long'),
})

const ADDRESS_SECTIONS = [
  { key: 'office', type: 'Office', label: 'Office Address' },
  {
    key: 'home',
    type: 'Home',
    label: 'Home Address',
    aliasTypes: ['Shipping'],
  },
]

const TYPE_TO_KEY = Object.fromEntries(
  ADDRESS_SECTIONS.flatMap((s) => [
    [s.type, s.key],
    ...(s.aliasTypes?.map((a) => [a, s.key]) || []),
  ]),
)

const KEY_TO_TYPE = Object.fromEntries(
  ADDRESS_SECTIONS.map((s) => [s.key, s.type]),
)

const getKey = (type = '') => {
  const norm = String(type).trim().toLowerCase()
  if (!norm) return undefined
  const lookup = { office: 'office', home: 'home', shipping: 'home' }
  return (
    lookup[norm] || TYPE_TO_KEY[norm.charAt(0).toUpperCase() + norm.slice(1)]
  )
}

export function RouteComponent() {
  const { user, login } = useStateContext()
  const [editing, setEditing] = useState(null)
  const addresses = useMemo(
    () => (Array.isArray(user?.addresses) ? user.addresses : []),
    [user?.addresses],
  )

  const addressesBySection = useMemo(() => {
    return addresses.reduce((acc, addr) => {
      const key = getKey(addr?.type)
      if (!key) return acc
      const street = addr?.address || addr?.street || addr?.description || ''
      acc[key] = { ...addr, address: street, street }
      return acc
    }, {})
  }, [addresses])

  const userId = user?.id || user?.userId || user?.userID || user?.idNumber
  const mutation = useUpdateUserAddress()

  const startEdit = (key) => KEY_TO_TYPE[key] && setEditing(key)

  const saveAddress = (key, data) => {
    const type = KEY_TO_TYPE[key]
    if (!userId || !type) return

    const payload = { userId, address: data.street.trim(), type }

    mutation.mutate(payload, {
      onSuccess: () => {
        const sectionKey = getKey(type)
        const street = payload.address
        const filtered = addresses.filter((a) => getKey(a?.type) !== sectionKey)
        const updated = {
          ...(addressesBySection[sectionKey] || {}),
          type,
          address: street,
          street,
        }

        login?.({ ...(user || {}), addresses: [...filtered, updated] })
        setEditing(null)
      },
    })
  }

  const cancelEdit = () => setEditing(null)

  return (
    <div className="border rounded-xl p-6 bg-white">
      <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
        Address
      </h2>
      <hr className="my-4 border-gray-200" />

      {ADDRESS_SECTIONS.map((section, i) => {
        const data = addressesBySection[section.key]
        const hasAddress = !!(data?.address || data?.street)
        const isEditing = editing === section.key

        return (
          <div key={section.key}>
            <div className="rounded-xl border p-4">
              <div className="flex justify-between items-start gap-4 mb-2">
                <p className="font-sans text-base font-normal leading-snug text-gray-600">
                  {section.label}
                </p>
                {!isEditing && (
                  <button
                    onClick={() => startEdit(section.key)}
                    className="cursor-pointer flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
                  >
                    <EditIcon />
                    {hasAddress ? 'Edit' : 'Add'}
                  </button>
                )}
              </div>

              {isEditing ? (
                <AddressEditForm
                  sectionKey={section.key}
                  initialData={data}
                  onSave={saveAddress}
                  onCancel={cancelEdit}
                  isSubmitting={mutation.isPending}
                />
              ) : (
                <p className="font-sans font-medium text-lg capitalize text-[#252525] whitespace-pre-line text-muted-foreground">
                  {hasAddress
                    ? data.address || data.street
                    : 'No address on file yet.'}
                </p>
              )}
            </div>
            {i < ADDRESS_SECTIONS.length - 1 && <Separator className="my-6" />}
          </div>
        )
      })}
    </div>
  )
}

function AddressEditForm({
  sectionKey,
  initialData,
  onSave,
  onCancel,
  isSubmitting,
}) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: initialData?.address || initialData?.street || '',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => onSave(sectionKey, d))}
        className="space-y-4 -mx-4 sm:mx-0"
      >
        <div className="px-4 sm:px-0">
          <FormTextarea
            control={form.control}
            name="street"
            placeholder="Enter complete address (street, building, floor, city, postal code)"
            minRows={3}
            maxRows={6}
            className="w-full bg-white border-gray-300 text-sm sm:text-base resize-none box-border"
          />
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 pt-2 px-4 sm:px-0">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isSubmitting}
            className="w-full sm:flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2 font-medium transition-colors text-sm sm:text-base"
          >
            {form.formState.isSubmitting || isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              onCancel()
            }}
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
