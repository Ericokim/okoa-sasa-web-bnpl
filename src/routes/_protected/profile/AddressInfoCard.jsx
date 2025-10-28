import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { Edit2Icon, MapPinIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAccountStore } from '@/data/accountStore'
import { MapPin, Edit2 } from 'lucide-react'

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
    <div className="border rounded-xl shadow-sm p-6 bg-white">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Address</h3>

      {/* Office */}
      {office && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <h4 className="text-1xl text-gray-500">Office Address</h4>
            </div>
            {editing !== 'office' && (
              <button
                onClick={() => startEdit('office')}
                className="
                
                flex items-center gap-1 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full px-3 py-1 text-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
          {editing === 'office' ? (
            <div className="space-y-3">
              <input
                className="w-full border rounded-md px-3 py-2"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={save}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 border rounded-full py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-gray-700">{office.street}</p>
          )}
        </div>
      )}

      {office && home && <hr className="my-4" />}

      {/* Home */}
      {home && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <h4 className=" text-1xl text-gray-500">Home Address</h4>
            </div>
            {editing !== 'home' && (
              <button
                onClick={() => startEdit('office')}
                className="
                
                flex items-center gap-1 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full px-3 py-1 text-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
          {editing === 'home' ? (
            <div className="space-y-3">
              <input
                className="w-full border rounded-md px-3 py-2"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={save}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 border rounded-full py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-gray-700">{home.street}</p>
          )}
        </div>
      )}
    </div>
  )
}
