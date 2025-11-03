import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAccountStore } from '@/data/accountStore'
import { EditIcon } from '@/assets/icons'

export function RouteComponent() {
  const { addresses, updateAddress } = useAccountStore()
  const [editing, setEditing] = useState(null)
  const [street, setStreet] = useState('')

  const startEdit = (type) => {
    const addr = addresses.find((a) => a.type === type)
    setStreet(addr?.street || '')
    setEditing(type)
  }

  const save = () => {
    if (editing) updateAddress(editing, { street })
    setEditing(null)
  }

  const office = addresses.find((a) => a.type === 'office')
  const home = addresses.find((a) => a.type === 'home')

  return (
    <div className="border rounded-xl p-6 bg-white">
      <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
        Address
      </h2>

      <hr className="my-4 border-gray-200" />

      {/* Office */}
      {office && (
        <div className="mb-6 rounded-xl border  p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <p className="font-sans text-base font-normal leading-snug text-gray-600">
                Office Address
              </p>
            </div>

            {editing !== 'office' && (
              <button
                onClick={() => startEdit('office')}
                className="flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <EditIcon />
                <span>Edit</span>
              </button>
            )}
          </div>

          {editing === 'office' ? (
            <AddressEditForm
              value={street}
              onChange={setStreet}
              onSave={save}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <p className="font-sans font-medium text-lg capitalize text-[#252525] whitespace-pre-line">
              {office.street}
            </p>
          )}
        </div>
      )}

      {/* Home */}
      {home && (
        <div className="rounded-xl border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <p className="font-sans text-base font-normal leading-snug text-gray-600">
                Home Address
              </p>
            </div>

            {editing !== 'home' && (
              <button
                onClick={() => startEdit('home')}
                className="flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <EditIcon />
                <span>Edit</span>
              </button>
            )}
          </div>

          {editing === 'home' ? (
            <AddressEditForm
              value={street}
              onChange={setStreet}
              onSave={save}
              onCancel={() => setEditing(null)}
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

export const Route = createFileRoute('/_protected/profile/AddressInfoCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const AddressInfoCard = RouteComponent

// Reusable Edit Form — Updated with Textarea
function AddressEditForm({ value, onChange, onSave, onCancel }) {
  return (
    <div className="space-y-3">
      <textarea
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-y min-h-[80px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter street address"
      />

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2 text-sm font-medium transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-full py-2 text-sm font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}