import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAccountStore } from '@/data/accountStore'
import { Edit2, Pencil } from 'lucide-react'

export const Route = createFileRoute('/_protected/profile/AccountProfileCard')({
  component: RouteComponent,
})

export function AccountProfileCard() {
  const { personalInfo } = useAccountStore()

  return (
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Profile</h3>
        <button className="flex items-center gap-1 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full px-3 py-1 text-sm">
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full border-2 border-orange-100 overflow-hidden">
          <img
            src="/avator.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {personalInfo.firstName}
          </h3>
          <p className="text-sm text-gray-600">
            {personalInfo.role}
          </p>
          <p className="text-sm text-gray-500">{personalInfo.location}</p>
        </div>
      </div>
    </div>
  )
}
