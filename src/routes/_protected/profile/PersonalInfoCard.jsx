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
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-2xl font-medium leading-9 capitalize text-black">
          Personal Information
        </h2>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="cursor-pointer flex items-center gap-1 rounded-full border border-orange-500 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50"
          >
            <EditIcon />
            Edit
          </button>
        )}
      </div>

      <Separator className="mb-6" />

      {/* ========== VIEW MODE ========== */}
      {!editing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {/* First Name */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              First Name
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {personalInfo.firstName}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Last Name
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {personalInfo.lastName}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Email Address
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {personalInfo.email}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Phone Number
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {personalInfo.phone}
            </p>
          </div>

          {/* Employee No */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Employee No
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {personalInfo.employeeId || '—'}
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              Company
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {personalInfo.company}
            </p>
          </div>

          {/* ID No */}
          <div>
            <p className="font-sans text-base font-normal leading-[22px] text-gray-600">
              ID No
            </p>
            <p className="font-sans font-medium text-[18px] leading-[25px] text-[#252525]">
              {personalInfo.ID || '—'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Row 1: First Name + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Row 2: Company + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
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
          </div>

          {/* Row 3: Phone + Employee No */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ID No</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.idNo || ''}
                onChange={(e) => setForm({ ...form, idNo: e.target.value })}
                placeholder="12345678"
              />
            </div>
          </div>

          {/* Row 4: ID No → Full Width (spans 2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Employee No
              </label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.employeeNo || ''}
                onChange={(e) =>
                  setForm({ ...form, employeeNo: e.target.value })
                }
                placeholder="EMP12345"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2 font-medium transition-colors"
            >
              Save 
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 border border-gray-300 rounded-full py-2 font-medium hover:bg-gray-50 transition-colors"
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
