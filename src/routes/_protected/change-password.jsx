import { createFileRoute } from '@tanstack/react-router'

function ChangePasswordScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Change Password</h1>
        <p className="text-center text-muted-foreground">
          Change password page placeholder
        </p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/change-password')({
  component: ChangePasswordScreen,
})
