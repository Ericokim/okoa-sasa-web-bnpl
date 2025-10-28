import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAccountStore } from '@/data/accountStore';

export const Route = createFileRoute('/_protected/profile/AccountProfileCard')({
  component: RouteComponent,
})

export function AccountProfileCard() {
  const { personalInfo } = useAccountStore();

  return (
    <Card className="border border-border rounded-lg">
      <div className="bg-card rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-sans font-semibold text-foreground">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-primary/20">
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {personalInfo.firstName[0]}{personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-sans font-bold text-foreground mb-1">
                {personalInfo.firstName}
              </h3>
              <p className="text-lg font-body text-muted-foreground font-semibold mb-1">
                {personalInfo.role}
              </p>
              <p className="text-sm font-body text-muted-foreground">
                {personalInfo.location}
              </p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}


