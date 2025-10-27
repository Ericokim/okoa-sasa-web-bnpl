import { Link } from '@tanstack/react-router'

export default function ErrorPage({ error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-bold text-destructive">Error</h1>
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <div className="space-x-4 mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  )
}
