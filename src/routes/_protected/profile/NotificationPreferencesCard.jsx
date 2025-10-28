import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react';
import { BellIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAccountStore } from '@/data/accountStore';
import gsap from 'gsap';
import { Bell } from 'lucide-react';



export const Route = createFileRoute('/_protected/profile/NotificationPreferencesCard')({
  component: RouteComponent,
})




export function NotificationPreferencesCard() {
  const { notifications, toggleNotification } = useAccountStore();

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
  ];

  return (
    <div className="border rounded-xl shadow-sm p-6 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-orange-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          Notification Preferences
        </h3>
      </div>

      {items.map((item) => (
        <div
          key={item.key}
          className="flex items-center justify-between py-3 border-b last:border-0"
        >
          <div className="flex-1">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">{item.desc}</p>
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
      ))}
    </div>
  );
}