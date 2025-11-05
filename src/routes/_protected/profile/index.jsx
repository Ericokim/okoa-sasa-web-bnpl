import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { AccountProfileCard } from './AccountProfileCard'
import { PersonalInfoCard } from './PersonalInfoCard'
import { AddressInfoCard } from './AddressInfoCard'
import { NotificationPreferencesCard } from './NotificationPreferencesCard'
import { DangerZoneCard } from './DangerZoneCard'
import { useProducts } from '@/lib/queries/products/index'

export default function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Account', path: '/my-account', isCurrent: true },
  ]

  

  // const { data, isLoading, error } = useProducts({
  //   amount: 20000,
  //   organization: "liberty",
  //   channel: "ussd",
  // });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data?.data || [];
  const totalCount = data?.totalCount || 0;

  console.log('Fetched products:', products);

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs – exact same classes */}
      <BreadCrumbs
        items={breadcrumbItems}
        className="px-0 pt-4 md:pt-8 -ml-3"
      />

      {/* Main content – exact same responsive padding */}
      <main className="w-full flex flex-col py-4">
        {/* Header */}
        <div className="space-y-1 mb-6">
          <h1 className="text-4xl font-semibold text-gray-900">My Account</h1>
          <p className="text-gray-600">
            Keep your account info accurate and up to date for better loan
            limits.
          </p>
        </div>

        {/* All cards – stacked vertically, no layout changes */}
        <div className="space-y-6">
          <AccountProfileCard />
          <PersonalInfoCard />
          <AddressInfoCard />
          <NotificationPreferencesCard />
          <DangerZoneCard />
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfilePage,
})
