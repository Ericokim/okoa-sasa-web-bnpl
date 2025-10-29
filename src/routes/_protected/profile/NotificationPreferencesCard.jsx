import { createFileRoute } from '@tanstack/react-router'
import { useAccountStore } from '@/data/accountStore'
import { Separator } from '@/components/ui/separator'

export function RouteComponent() {
  const { notifications, toggleNotification } = useAccountStore()

  const items = [
    {
      key: 'transactions',
      title: 'Transactions',
      desc: 'Get instant alerts for your purchases and payments.',
    },
    {
      key: 'promotions',
      title: 'Promotional Offers',
      desc: 'Receive exclusive discounts and special deals.',
    },
    {
      key: 'systemUpdates',
      title: 'System Update',
      desc: 'Stay informed about new features and app improvements.',
    },
  ]

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
              <p className="font-sans text-base   text-[#A0A4AC] flex-none order-1">
                {item.desc}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={() => toggleNotification(item.key)}
                className="sr-only peer"
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
