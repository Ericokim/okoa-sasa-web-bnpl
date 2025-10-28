import { createFileRoute } from '@tanstack/react-router'
import { AccountProfileCard } from './AccountProfileCard'
import { PersonalInfoCard } from './PersonalInfoCard'
import { AddressInfoCard } from './AddressInfoCard'
import { NotificationPreferencesCard } from './NotificationPreferencesCard'
import { DangerZoneCard } from './DangerZoneCard'

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-sans font-bold text-foreground mb-2">
            My Account
          </h1>
        
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AccountProfileCard />
            <PersonalInfoCard />
            <AddressInfoCard />
            <NotificationPreferencesCard />
            <DangerZoneCard />
          </div>
          
     
        </div>

   
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfilePage,
})