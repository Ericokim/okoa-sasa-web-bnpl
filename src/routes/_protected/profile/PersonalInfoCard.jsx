import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { Edit2Icon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAccountStore } from '@/data/accountStore'
import gsap from 'gsap'
import { Edit2 } from 'lucide-react';

export const Route = createFileRoute('/_protected/profile/PersonalInfoCard')({
  component: RouteComponent,
})



export function PersonalInfoCard() {
  const { personalInfo, updatePersonalInfo } = useAccountStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(personalInfo);

  const handleSave = () => {
    updatePersonalInfo(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(personalInfo);
    setEditing(false);
  };

  return (
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full px-3 py-1 text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      {!editing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 capitalize text-md font-medium">First Name</p>
            <p className="font-medium text-gray-900">{personalInfo.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500 capitalize text-md font-medium">Last Name</p>
            <p className="font-medium text-gray-900">{personalInfo.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500 capitalize text-md font-medium">Designation</p>
            <p className="font-medium text-gray-900">{personalInfo.role}</p>
          </div>
          <div>
            <p className="text-gray-500 capitalize text-md font-medium">Email Address</p>
            <p className="font-medium text-gray-900">{personalInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-500 capitalize text-md font-medium">Phone Number</p>
            <p className="font-medium text-gray-900">{personalInfo.phone}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
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
  );
}