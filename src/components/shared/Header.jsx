// src/components/Header.jsx
import { Link, useNavigate } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { useStateContext } from '@/context/state-context'
import { cn } from '@/lib/utils'
import { HomeCartIcon } from '@/assets/icons'
import { UserDropdown } from '@/components/shared/UserDropdown'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/primaryLogoHorizontal.png'

export function Header() {
  const { cartCount, getCartCount, searchTerm, setSearchTerm } =
    useStateContext()
  const navigate = useNavigate()

  const cartItems = typeof cartCount === 'number' ? cartCount : getCartCount()

  const clearSearch = () => {
    if (!searchTerm) return
    setSearchTerm('')
  }

  return (
    <header className="w-full border-b border-[#E8ECF4] bg-white">
      {/* === DESKTOP HEADER === */}
      <div className="hidden lg:flex items-center justify-between mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-5 lg:py-6">
        <Link
          to="/"
          className="flex h-[40px] w-[140px] lg:h-[43px] lg:w-[158px] xl:h-[48px] xl:w-[180px] shrink-0"
        >
          <img
            src={logo}
            srcSet={`${logo} 1x, ${logo} 2x`}
            alt="Okoa Sasa Logo"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Search Bar */}
        {/* <div className="flex-1 mx-4 lg:mx-6 xl:mx-8 max-w-[500px] lg:max-w-[600px] xl:max-w-[690px] ">
          <div className="flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3 border">
            <Search className="h-6 w-6 text-[#A0A4AC]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for Devices"
              className="flex-1 bg-transparent text-base text-[#111111] placeholder:text-[#95979b] outline-none"
            />
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-transparent text-[#A0A4AC] transition-all duration-200 hover:text-white',
                searchTerm
                  ? 'bg-primary text-white hover:opacity-90 hover:scale-105'
                  : 'pointer-events-none opacity-0',
              )}
            >
              <X className="size-4" />
            </button>
          </div>
        </div> */}

        {/* Search Bar */}
        <div className="flex-1 mx-4 lg:mx-6 xl:mx-8 max-w-[500px] lg:max-w-[600px] xl:max-w-[690px]">
          <div className="group relative flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3 border transition-all duration-200 focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10 focus-within:bg-white">
            {/* Search Icon */}
            <Search className="h-6 w-6 transition-colors text-[#A0A4AC]  group-focus-within:text-primary" />

            {/* Input Field */}
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for Devices"
              className="flex-1 bg-transparent text-base text-[#111111] placeholder:text-[#95979b] outline-none caret-primary"
            />

            {/* Clear Button */}
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-transparent text-[#A0A4AC] transition-all duration-200',
                searchTerm
                  ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 hover:shadow-sm'
                  : 'pointer-events-none opacity-0',
              )}
            >
              <X className="size-4" />
            </button>

            {/* Optional: Subtle inner focus line (for extra polish) */}
            <div className="absolute inset-x-4 bottom-0 h-0.5 scale-x-0 bg-primary transition-transform duration-200 focus-within:scale-x-100 origin-left" />
          </div>
        </div>

        {/* Cart + User */}
        <div className="flex items-center gap-4 lg:gap-5 xl:gap-6">
          <Link to="/cart" className="flex items-center gap-1.5 relative">
            <div className="relative">
              <HomeCartIcon
                className="h-5 w-5 lg:h-6 lg:w-6"
                strokeWidth={1.5}
              />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </div>
            <span className="text-sm lg:text-base leading-[140%]">Cart</span>
          </Link>

          {/* Desktop */}
          <UserDropdown />
        </div>
      </div>

      {/* === MOBILE HEADER === */}

      <div className="flex lg:hidden items-center justify-between mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-3">
        <Link to="/" className="flex h-[35px] w-[130px] shrink-0">
          <img
            src={logo}
            srcSet={`${logo} 1x, ${logo} 2x`}
            alt="Okoa Sasa Logo"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="flex items-center gap-5">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <div className="h-9 w-9 rounded-full flex items-center justify-center border-2 border-gray-200">
              <HomeCartIcon
                className="h-5 w-5 items-center"
                strokeWidth={1.5}
              />
            </div>
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                {cartItems}
              </span>
            )}
          </Link>

          <UserDropdown isMobile />
        </div>
      </div>

      {/* === MOBILE SEARCH BAR === */}
      <div className="border-t border-[#E8ECF4] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-3 lg:hidden">
        <div className="group relative flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3 border border transition-all duration-200 focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10 focus-within:bg-white">
          {/* Search Icon */}
          <Search className="h-5 w-5 text-[#A0A4AC] transition-colors group-focus-within:text-primary" />

          {/* Input Field */}
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for Devices"
            className="flex-1 bg-transparent text-base text-[#111111] placeholder:text-[#A0A4AC] outline-none caret-primary"
          />

          {/* Clear Button */}
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-transparent text-[#A0A4AC] transition-all duration-200',
              searchTerm
                ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 hover:shadow-sm'
                : 'pointer-events-none opacity-0',
            )}
          >
            <X className="h-4" />
          </button>

          {/* Animated focus underline */}
          <div className="absolute inset-x-4 bottom-0 h-0.5 scale-x-0 bg-primary transition-transform duration-200 focus-within:scale-x-100 origin-left" />
        </div>
      </div>
    </header>
  )
}
