import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAccountStore } from '@/data/accountStore'
import { Separator } from '@/components/ui/separator'
import { EditIcon } from '@/assets/icons'

export function RouteComponent() {
  const { personalInfo, updatePersonalInfo } = useAccountStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(personalInfo)

  const handleSave = () => {
    updatePersonalInfo(form)
    setEditing(false)
  }

  const handleCancel = () => {
    setForm(personalInfo)
    setEditing(false)
  }

  return (
    <div className="border rounded-xl p-6 bg-white ">

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
          Personal Information
        </h2>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
          >
            <EditIcon />
            Edit
          </button>
        )}
      </div>

      {/* Separator goes BELOW the header row */}
      <Separator className="mb-6" />

      {!editing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-[#A0A4AC] flex-none order-0 flex-grow-0">
              First Name
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525] flex-none order-1 self-stretch flex-grow-0">
              {personalInfo.firstName}
            </p>
          </div>
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-[#A0A4AC] flex-none order-0 flex-grow-0">
              Last Name
            </p>
            <p className="font-medium text-md text-gray-900">
              {personalInfo.lastName}
            </p>
          </div>
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-[#A0A4AC] flex-none order-0 flex-grow-0">
              Designation
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525] flex-none order-1 self-stretch flex-grow-0">
              {personalInfo.role}
            </p>
          </div>
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-[#A0A4AC] flex-none order-0 flex-grow-0">
              Email Address
            </p>

            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525] flex-none order-1 self-stretch flex-grow-0">
              {personalInfo.email}
            </p>
          </div>
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-[#A0A4AC] flex-none order-0 flex-grow-0">
              Phone Number
            </p>

            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525] flex-none order-1 self-stretch flex-grow-0">
              {personalInfo.phone}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 border border-gray-300 rounded-full py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/PersonalInfoCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const PersonalInfoCard = RouteComponent
