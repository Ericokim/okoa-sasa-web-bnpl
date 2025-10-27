import { Link, createFileRoute } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import logo from '@/logo.svg'

function IndexPage() {
  const { isAuthenticated } = useStateContext()

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to Okoa Sasa</h1>
        <p className="mb-6">
          Buy Now, Pay Later - Shop with flexible payment options
        </p>

        <div className="flex gap-4">
          <Link
            to={isAuthenticated ? '/products' : '/signin'}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            {isAuthenticated ? 'Browse Products' : 'Sign In'}
          </Link>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="px-6 py-3 border border-white rounded-lg hover:bg-white/10"
            >
              Sign Up
            </Link>
          )}
        </div>

        <div className="mt-8 flex gap-6">
          <a
            className="text-[#61dafb] hover:underline"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="text-[#61dafb] hover:underline"
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn TanStack
          </a>
        </div>
      </header>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
