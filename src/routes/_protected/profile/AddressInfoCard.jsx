import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
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
    .min(2, 'Address must be at least 10 characters')
    .max(500, 'Address is too long'),
})

const ADDRESS_SECTIONS = [
  {
    key: 'office',
    type: 'Office',
    label: 'Office Address',
  },
  {
    key: 'home',
    type: 'Home',
    label: 'Home Address',
    aliasTypes: ['Shipping'],
  },
]

const TYPE_ALIAS_LOOKUP = {
  office: 'Office',
  home: 'Home',
  shipping: 'Shipping',
}

const SECTION_TYPE_BY_KEY = ADDRESS_SECTIONS.reduce((acc, section) => {
  acc[section.key] = section.type
  return acc
}, {})

const SECTION_KEY_BY_TYPE = ADDRESS_SECTIONS.reduce((acc, section) => {
  acc[section.type] = section.key
  section.aliasTypes?.forEach((alias) => {
    acc[alias] = section.key
  })
  return acc
}, {})

const normalizeType = (type = '') => {
  if (typeof type !== 'string') {
    type = `${type ?? ''}`
  }
  const trimmed = type.trim()
  if (!trimmed) return ''
  const alias = TYPE_ALIAS_LOOKUP[trimmed.toLowerCase()]
  return alias || trimmed
}

const resolveSectionKeyFromType = (type) => {
  const normalized = normalizeType(type)
  return normalized ? SECTION_KEY_BY_TYPE[normalized] : undefined
}

export function RouteComponent() {
  const { user, login } = useStateContext()
  const [editing, setEditing] = useState(null)
  const addresses = Array.isArray(user?.addresses) ? user.addresses : []

  const addressesBySection = useMemo(() => {
    return addresses.reduce((acc, address) => {
      const sectionKey = resolveSectionKeyFromType(address?.type)
      if (!sectionKey) return acc

      const formatted =
        address?.address || address?.street || address?.description || ''

      acc[sectionKey] = {
        ...address,
        address: formatted,
        street: formatted,
      }
      return acc
    }, {})
  }, [addresses])

  const userId =
    user?.id || user?.userId || user?.userID || user?.idNumber || undefined

  const updateAddressMutation = useUpdateUserAddress({
    onSuccess: (_response, variables) => {
      const resolvedSectionKey =
        resolveSectionKeyFromType(variables?.type) || editing

      const canonicalType = SECTION_TYPE_BY_KEY[resolvedSectionKey]
      if (!canonicalType) return
      const nextAddressValue = variables?.address?.trim?.() || ''

      const filtered = addresses.filter((addr) => {
        const addrSectionKey = resolveSectionKeyFromType(addr?.type)
        if (!addrSectionKey) return true
        return addrSectionKey !== resolvedSectionKey
      })

      const updatedEntry = {
        ...(addressesBySection[resolvedSectionKey] || {}),
        type: canonicalType,
        address: nextAddressValue,
        street: nextAddressValue,
      }

      login?.({
        ...(user || {}),
        addresses: [...filtered, updatedEntry],
      })

      setEditing(null)
    },
  })

  const startEdit = (sectionKey) => {
    if (SECTION_TYPE_BY_KEY[sectionKey]) {
      setEditing(sectionKey)
    }
  }

  const saveAddress = (sectionKey, data) => {
    if (!userId) return
    const canonicalType = SECTION_TYPE_BY_KEY[sectionKey]
    if (!canonicalType) return

    updateAddressMutation.mutate({
      userId,
      address: data.street.trim(),
      type: canonicalType,
    })
  }

  const cancelEdit = () => setEditing(null)

  return (
    <div className="border rounded-xl p-6 bg-white">
      <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
        Address
      </h2>

      <hr className="my-4 border-gray-200" />

      {ADDRESS_SECTIONS.map((section, index) => {
        const addressData = addressesBySection[section.key]
        const hasAddress = Boolean(addressData?.address || addressData?.street)
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
                  initialData={addressData}
                  onSave={saveAddress}
                  onCancel={cancelEdit}
                  isSubmitting={updateAddressMutation.isPending}
                />
              ) : (
                <p className="font-sans font-medium text-lg capitalize text-[#252525] whitespace-pre-line text-muted-foreground">
                  {hasAddress
                    ? addressData.address || addressData.street
                    : 'No address on file yet.'}
                </p>
              )}
            </div>

            {index < ADDRESS_SECTIONS.length - 1 && (
              <Separator className="my-6" />
            )}
          </div>
        )
      })}
    </div>
  )
}

function AddressEditForm({ sectionKey, initialData, onSave, onCancel, isSubmitting }) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: initialData?.address || initialData?.street || '',
    },
  })

  const handleSave = (data) => onSave(sectionKey, data)

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
