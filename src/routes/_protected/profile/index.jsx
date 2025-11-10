import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useRef } from 'react'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { AccountProfileCard } from './AccountProfileCard'
import { PersonalInfoCard } from './PersonalInfoCard'
import { AddressInfoCard } from './AddressInfoCard'
import { NotificationPreferencesCard } from './NotificationPreferencesCard'
import { DangerZoneCard } from './DangerZoneCard'
import { useStateContext } from '@/context/state-context'
import { useFetchUserDetail } from '@/lib/queries/user'

export default function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Account', path: '/my-account', isCurrent: true },
  ]

  const { user, login } = useStateContext()
  const userId =
    user?.id || user?.userId || user?.userID || user?.idNumber || user?.masokoId

  const {
    data: userDetailResponse,
    isPending: isUserPending,
    isFetching: isUserFetching,
    isError: isUserError,
    refetch: refetchUserDetail,
  } = useFetchUserDetail(userId, {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })

  const fetchedUser = useMemo(() => {
    if (!userDetailResponse) return undefined
    if (userDetailResponse?.data?.user) return userDetailResponse.data.user
    if (userDetailResponse?.data) return userDetailResponse.data
    return userDetailResponse
  }, [userDetailResponse])
  const lastSyncedProfileRef = useRef(null)

  useEffect(() => {
    if (!fetchedUser || typeof login !== 'function') return
    const fingerprint = JSON.stringify(fetchedUser)
    if (lastSyncedProfileRef.current === fingerprint) return
    lastSyncedProfileRef.current = fingerprint
    login({
      ...(user || {}),
      ...fetchedUser,
    })
  }, [fetchedUser, login, user])

  useEffect(() => {
    lastSyncedProfileRef.current = null
  }, [userId])

  const isSyncingProfile = (isUserPending || isUserFetching) && !!userId

  return (
    <div className="min-h-screen">
      <BreadCrumbs
        items={breadcrumbItems}
        className="px-0 pt-4 md:pt-8 -ml-3"
      />

      <main className="w-full flex flex-col py-4">
        <div className="space-y-1 mb-6">
          <h1 className="text-4xl font-semibold text-gray-900">My Account</h1>
          <p className="text-gray-600">
            Keep your account info accurate and up to date for better loan
            limits.
          </p>
        </div>

        {isUserError && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to refresh your profile details right now.
            <button
              type="button"
              onClick={() => refetchUserDetail()}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {isSyncingProfile && !isUserError && (
          <div className="mb-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Syncing your latest profile information...
          </div>
        )}

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
