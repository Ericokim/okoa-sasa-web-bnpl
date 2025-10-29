import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { Edit2Icon, MapPinIcon, Pencil } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAccountStore } from '@/data/accountStore'
import { MapPin, Edit2 } from 'lucide-react'
import { EditIcon } from '@/assets/icons'

export const Route = createFileRoute('/_protected/profile/AddressInfoCard')({
  component: RouteComponent,
})

export function AddressInfoCard() {
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

      <Separator className="my-4" />

      {/* Office */}
      {office && (
        <div className="mb-6 rounded-xl border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {/* <MapPin className="w-5 h-5 text-orange-600" /> */}
              <p className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                Office Address
              </p>
            </div>

            {editing !== 'office' && (
              <button
                onClick={() => startEdit('office')}
                className="flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
              >
                <EditIcon  />
                Edit
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
            <p className="font-sans font-medium text-lg capitalize text-[#252525]">
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
              {/* <MapPin className="w-5 h-5 text-gray-500" /> */}
              <p className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                Home Address
              </p>
            </div>

            {editing !== 'home' && (
              <button
                onClick={() => startEdit('home')} // <-- fixed
                className="flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
              >
                <EditIcon  />
                Edit
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
            <p className="font-sans font-medium text-lg capitalize text-[#252525]">
              {home.street}
            </p>
          )}
        </div>
      )}
    </div>

    
  )

}
