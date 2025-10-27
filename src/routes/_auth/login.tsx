import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useStateContext } from '@/context/state-context';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useStateContext() as any;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, name: 'Demo User' });
    navigate({ to: '/products' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_auth/login')({
  component: LoginScreen,
});
