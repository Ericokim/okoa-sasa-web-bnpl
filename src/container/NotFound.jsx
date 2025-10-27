import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
