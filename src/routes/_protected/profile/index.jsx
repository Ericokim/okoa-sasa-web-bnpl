import { createFileRoute } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'

import { useEffect } from 'react'
import { AccountProfileCard } from './AccountProfileCard'
import { PersonalInfoCard } from './PersonalInfoCard'
import { AddressInfoCard } from './AddressInfoCard'
import { NotificationPreferencesCard } from './NotificationPreferencesCard'
import { DangerZoneCard } from './DangerZoneCard'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'

export default function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


   const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Account', path: `/my-account`, isCurrent: true },
  ]

  return (
    <div className=" mx-auto space-y-8 pb-12 px-4 mt-6">
       <BreadCrumbs items={breadcrumbItems} className="px-0 pt-4 md:pt-8" />
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          My Account
        </h1>
        <p className="text-gray-600">
          Almost there! Ready to place your order ?
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        <AccountProfileCard />
        <PersonalInfoCard />
        <AddressInfoCard />
        <NotificationPreferencesCard />
        <DangerZoneCard />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfilePage,
})
