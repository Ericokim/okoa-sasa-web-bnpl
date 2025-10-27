import { createFileRoute } from '@tanstack/react-router';

function OTPScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
        <p className="text-center text-muted-foreground">OTP page placeholder</p>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_auth/otp')({
  component: OTPScreen,
});
