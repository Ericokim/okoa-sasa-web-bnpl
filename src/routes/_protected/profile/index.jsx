import { createFileRoute } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'

import { useEffect } from 'react'
import { AccountProfileCard } from './AccountProfileCard'
import { PersonalInfoCard } from './PersonalInfoCard'
import { AddressInfoCard } from './AddressInfoCard'
import { NotificationPreferencesCard } from './NotificationPreferencesCard'
import { DangerZoneCard } from './DangerZoneCard'

export function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-sans font-bold text-foreground mb-2">
          My Account
        </h1>
         <p className="text-lg text-muted-foreground font-body">
            Almost there! Ready to place your order?
          </p>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <AccountProfileCard />
        <PersonalInfoCard />
        <AddressInfoCard />
        <div className="space-y-6">
          <NotificationPreferencesCard />
          <DangerZoneCard />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfilePage,
})
