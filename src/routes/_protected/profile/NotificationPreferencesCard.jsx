import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react';
import { BellIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAccountStore } from '@/data/accountStore';
import gsap from 'gsap';

export const Route = createFileRoute('/_protected/profile/NotificationPreferencesCard')({
  component: RouteComponent,
})

export function NotificationPreferencesCard() {
  const { notifications, toggleNotification } = useAccountStore();
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <Card ref={cardRef} className="border-2 border-transparent bg-linear-to-r from-primary/10 to-secondary/10 p-0.5 rounded-lg">
      <div className="bg-card rounded-lg h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BellIcon className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl font-sans font-semibold text-foreground">Notification Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="transactions" className="text-sm font-body font-medium text-foreground cursor-pointer">
                Transactions
              </Label>
              <p className="text-xs font-body text-muted-foreground">
                Get instant alerts for your purchases and payments.
              </p>
            </div>
            <Switch
              id="transactions"
              checked={notifications.transactions}
              onCheckedChange={() => toggleNotification('transactions')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="promotions" className="text-sm font-body font-medium text-foreground cursor-pointer">
                Promotional Offers
              </Label>
              <p className="text-xs font-body text-muted-foreground">
                Receive exclusive discounts and special deals.
              </p>
            </div>
            <Switch
              id="promotions"
              checked={notifications.promotions}
              onCheckedChange={() => toggleNotification('promotions')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="systemUpdates" className="text-sm font-body font-medium text-foreground cursor-pointer">
                System Update
              </Label>
              <p className="text-xs font-body text-muted-foreground">
                Stay informed about new features and app improvements.
              </p>
            </div>
            <Switch
              id="systemUpdates"
              checked={notifications.systemUpdates}
              onCheckedChange={() => toggleNotification('systemUpdates')}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

