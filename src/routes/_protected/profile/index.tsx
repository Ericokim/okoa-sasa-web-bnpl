import { createFileRoute } from '@tanstack/react-router';
import { useStateContext } from '@/context/state-context';

function ProfilePage() {
  const { user, logout } = useStateContext() as any;
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Name</label>
          <p className="font-semibold">{user && user.name ? user.name : 'Demo User'}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
          <p className="font-semibold">{user && user.email ? user.email : 'demo@example.com'}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Phone</label>
          <p className="font-semibold">+254 700 000 000</p>
        </div>
      </div>
      
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        <p className="text-sm text-muted-foreground">Manage your payment methods</p>
        <button className="px-4 py-2 border rounded-lg hover:bg-muted">
          Add Payment Method
        </button>
      </div>
      
      <button 
        onClick={logout}
        className="w-full px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90"
      >
        Logout
      </button>
    </div>
  );
}

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfilePage,
});
