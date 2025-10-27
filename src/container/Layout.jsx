import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
