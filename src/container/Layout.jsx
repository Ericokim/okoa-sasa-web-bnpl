import { Outlet, useLocation } from '@tanstack/react-router'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export default function Layout() {
  const location = useLocation()
  const isFaqPage = location.pathname.includes('/FAQs')
  
  return (
    <div className="relative flex min-h-screen flex-col bg-background w-full">
      <Header />
      <main className={`flex-1 w-full ${!isFaqPage ? 'px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}