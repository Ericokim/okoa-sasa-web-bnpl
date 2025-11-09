import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useStateContext } from '@/context/state-context'
import { useUpdateUserNotificationPreference } from '@/lib/queries/user'

const NOTIFICATION_ITEMS = [
  {
    key: 'transactions',
    type: 'Transactions',
    title: 'Transactions',
    desc: 'Get instant alerts for your purchases and payments.',
  },
  {
    key: 'promotions',
    type: 'PromotionalOffers',
    title: 'Promotional Offers',
    desc: 'Receive exclusive discounts and special deals.',
  },
  {
    key: 'applicationUpdates',
    type: 'ApplicationUpdates',
    title: 'System Update',
    desc: 'Stay informed about new features and app improvements.',
  },
]

const legacyTypeAliases = {
  PromotionalOffer: 'promotions',
  SystemUpdates: 'applicationUpdates',
}

const typeKeyMap = NOTIFICATION_ITEMS.reduce((acc, { type, key }) => {
  acc[type] = key
  return acc
}, { ...legacyTypeAliases })

const normalizedTypeKeyMap = Object.entries(typeKeyMap).reduce(
  (acc, [type, key]) => {
    if (typeof type === 'string') {
      acc[type.toLowerCase()] = key
    }
    return acc
  },
  {},
)

const keyTypeMap = NOTIFICATION_ITEMS.reduce((acc, { key, type }) => {
  acc[key] = type
  return acc
}, {})

const defaultPrefs = NOTIFICATION_ITEMS.reduce((acc, { key }) => {
  acc[key] = false
  return acc
}, {})

const buildPreferences = (user) => {
  if (!Array.isArray(user?.notificationPreferences)) {
    return { ...defaultPrefs }
  }
  return user.notificationPreferences.reduce((acc, pref) => {
    const rawType = pref?.type
    const resolvedKey =
      typeKeyMap[rawType] ||
      (typeof rawType === 'string'
        ? normalizedTypeKeyMap[rawType.toLowerCase()]
        : null)

    if (resolvedKey && resolvedKey in acc) {
      acc[resolvedKey] = Boolean(pref?.isActive)
    }
    return acc
  }, { ...defaultPrefs })
}

export function RouteComponent() {
  const { user, login } = useStateContext()
  const [pendingKey, setPendingKey] = useState(null)
  const [notificationState, setNotificationState] = useState(
    buildPreferences(user),
  )
  const userId =
    user?.id || user?.userId || user?.userID || user?.idNumber || undefined

  const mutation = useUpdateUserNotificationPreference()

  useEffect(() => {
    setNotificationState(buildPreferences(user))
  }, [user])

  const items = useMemo(() => NOTIFICATION_ITEMS, [])

  const handleToggle = (key) => {
    if (!userId || !(key in notificationState)) return

    const nextValue = !notificationState[key]
    const previousState = notificationState[key]

    setNotificationState((prev) => ({
      ...prev,
      [key]: nextValue,
    }))
    setPendingKey(key)

    mutation.mutate(
      {
        userId,
        type: keyTypeMap[key],
        isActive: nextValue,
      },
      {
        onError: () => {
          setNotificationState((prev) => ({
            ...prev,
            [key]: previousState,
          }))
        },
        onSuccess: () => {
          const merged = Object.entries({
            ...notificationState,
            [key]: nextValue,
          }).map(([stateKey, isActive]) => ({
            type: keyTypeMap[stateKey],
            isActive,
          }))

          login?.({
            ...(user || {}),
            notificationPreferences: merged,
          })
        },
        onSettled: () => {
          setPendingKey(null)
        },
      },
    )
  }

  return (
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-sans text-[24px] font-medium leading-[34px] capitalize text-black flex-none order-0">
          Notification Preferences
        </h2>
      </div>
      <Separator className="my-4" />

      {/* Each Notification as a Full Card */}
      {items.map((item, index) => (
        <div
          key={item.key}
          className={`
        rounded-xl border  p-4
        ${index < items.length - 1 ? 'mb-4' : ''}
      `}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="font-sans text-[18px] font-medium leading-[140%]  capitalize text-[#252525] flex-none order-0 flex-grow-0">
                {item.title}
              </p>
              <p className="font-sans text-base   text-gray-600 flex-none order-1">
                {item.desc}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationState[item.key]}
                onChange={() => handleToggle(item.key)}
                className="sr-only peer"
                disabled={pendingKey === item.key && mutation.isPending}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Route = createFileRoute(
  '/_protected/profile/NotificationPreferencesCard',
)({
  component: RouteComponent,
})

export const component = RouteComponent
export const NotificationPreferencesCard = RouteComponent
