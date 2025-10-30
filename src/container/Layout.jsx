import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background w-full">
      <Header />
      <main className="flex-1 px-5 md:px-20 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
