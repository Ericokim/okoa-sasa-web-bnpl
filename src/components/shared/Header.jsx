import { Link } from '@tanstack/react-router'
import { ShoppingCart, Search } from 'lucide-react'
import { useStateContext } from '@/context/state-context'
import { UserDropdown } from '@/components/shared/UserDropdown'

export function Header() {
  const { cart } = useStateContext()
  const cartItemCount = cart?.length || 0

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
            type="text"
            placeholder="Search for Devices"
            className="flex-1 bg-transparent text-sm text-[#A0A4AC] placeholder:text-[#A0A4AC] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3 lg:gap-5">
          <Link
            to="/cart"
            className="flex items-center gap-1 md:gap-1.5"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            <span className="text-sm md:text-base leading-[140%]">Cart</span>
          </Link>

          <UserDropdown />
        </div>
      </div>

      <div className="border-t border-[#E8ECF4] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3">
          <Search className="h-5 w-5 text-[#A0A4AC]" />
          <input
            type="text"
            placeholder="Search for Devices"
            className="flex-1 bg-transparent text-sm text-[#A0A4AC] placeholder:text-[#A0A4AC] outline-none"
          />
        </div>
      </div>
    </header>
  )
}
