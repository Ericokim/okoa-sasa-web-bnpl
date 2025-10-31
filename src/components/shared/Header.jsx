import { Link } from '@tanstack/react-router'
import { ShoppingCart, Search, X } from 'lucide-react'
import { useStateContext } from '@/context/state-context'
import { UserDropdown } from '@/components/shared/UserDropdown'
import { HomeCartIcon } from '@/assets/icons'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export function Header() {
  const { cartCount, getCartCount, searchTerm, setSearchTerm } =
    useStateContext()
  const cartItems = typeof cartCount === 'number' ? cartCount : getCartCount()

  const clearSearch = () => {
    if (!searchTerm) return
    setSearchTerm('')
  }

  return (
    <header className="w-full border-b border-[#E8ECF4] bg-white">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-5 lg:px-20 lg:py-6">
        <Link
          to="/"
          className="flex h-[35px] w-[130px] shrink-0 md:h-[43px] md:w-[158px]"
        >
          <img
            src="/primaryLogoHorizontal.png"
            alt="OKOA SASA"
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="hidden flex-1 items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3 md:mx-6 lg:mx-8 lg:flex lg:max-w-[690px] lg:px-4 lg:py-3">
          <Search className="h-6 w-6 text-[#A0A4AC]" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="text"
            placeholder="Search for Devices"
            className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-[#95979b] outline-none"
          />

          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-transparent text-[#A0A4AC] transition-all hover:text-white',
              searchTerm
                ? 'bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90'
                : 'pointer-events-none opacity-0',
            )}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-3 lg:gap-5">
          <Link
            to="/cart"
            className="flex items-center gap-1 md:gap-1.5 relative"
          >
            <div className="relative">
              <HomeCartIcon
                className="h-6 w-6 md:h-6 md:w-6"
                strokeWidth={1.5}
              />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </div>
            <span className="text-sm md:text-base leading-[140%]">Cart</span>
          </Link>

          <UserDropdown />
        </div>
      </div>

      <div className="border-t border-[#E8ECF4] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3">
          <Search className="h-5 w-5 text-[#A0A4AC]" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="search"
            placeholder="Search for Devices"
            className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-[#A0A4AC] outline-none"
          />
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-transparent text-[#A0A4AC] transition-all hover:text-[#EE3124]',
              searchTerm
                ? 'bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90'
                : 'pointer-events-none opacity-0',
            )}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}
