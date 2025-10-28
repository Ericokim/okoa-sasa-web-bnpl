import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import gsap from 'gsap';

export const Route = createFileRoute('/_protected/profile/DangerZoneCard')({
  component: RouteComponent,
})




export function DangerZoneCard() {
  const [showDialog, setShowDialog] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    setShowDialog(false);
  };

  return (
    <>
      <Card ref={cardRef} className="border-2 border-destructive/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="w-5 h-5 text-destructive" strokeWidth={1.5} />
            <CardTitle className="text-xl font-sans font-semibold text-foreground">Delete My Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm font-body text-muted-foreground">
            Permanently delete the account and remove access from all workspaces
          </p>
          <Button
            onClick={() => setShowDialog(true)}
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body font-normal"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-sans font-semibold text-foreground">Confirm Account Deletion</DialogTitle>
            <DialogDescription className="text-sm font-body text-muted-foreground">
              This action cannot be undone. This will permanently delete your account and remove all
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground font-body font-normal"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body font-normal"
            >
              Yes, Delete My Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
