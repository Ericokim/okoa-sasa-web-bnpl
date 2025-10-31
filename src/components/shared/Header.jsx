// src/components/Header.jsx
import { Link, useNavigate } from '@tanstack/react-router'
import { ShoppingCart, Search, X, Package, User, LogOut, ChevronDown, ChevronUp } from 'lucide-react'
import { useStateContext } from '@/context/state-context'
import { useAccountStore } from '@/data/accountStore'
import { cn } from '@/lib/utils'
import { HomeCartIcon } from '@/assets/icons'
import { UserDropdown } from '@/components/shared/UserDropdown'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { BoxWhiteIcon, ProfileIcon, LogoutIcon } from '@/assets/icons' 

export function Header() {
  const { products, searchTerm, setSearchTerm, user, isAuthenticated, logout } = useStateContext()
  const { personalInfo } = useAccountStore()
  const navigate = useNavigate()
  const cartItems = products.filter((p) => p.inCart === true).length

  const clearSearch = () => {
    if (!searchTerm) return
    setSearchTerm('')
  }

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <header className="w-full border-b border-[#E8ECF4] bg-white">
      {/* === DESKTOP HEADER === */}
      <div className="hidden lg:flex items-center justify-between px-8 py-5 lg:px-20 lg:py-6">
        <Link to="/" className="flex h-[43px] w-[158px] shrink-0">
          <img
            src="/primaryLogoHorizontal.png"
            alt="OKOA SASA"
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-8 max-w-[690px]">
          <div className="flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3">
            <Search className="h-6 w-6 text-[#A0A4AC]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  ? 'bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90'
                  : 'pointer-events-none opacity-0'
              )}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Cart + User */}
        <div className="flex items-center gap-5">
          <Link to="/cart" className="flex items-center gap-1.5 relative">
            <div className="relative">
              <HomeCartIcon className="h-6 w-6" strokeWidth={1.5} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </div>
            <span className="text-base leading-[140%]">Cart</span>
          </Link>
          <UserDropdown />
        </div>
      </div>

      {/* === MOBILE HEADER === */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        {/* Logo + Tagline */}
        <div className="flex flex-col">
          <Link to="/" className="flex h-[35px] w-[130px] shrink-0">
            <img
              src="/primaryLogoHorizontal.png"
              alt="OKOA SASA"
              className="h-full w-full object-contain"
            />
          </Link>
       
        </div>

        {/* Right Icons: Cart + Avatar */}
        <div className="flex items-center gap-5">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <HomeCartIcon className="h-5 w-5" strokeWidth={1.5} />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                {cartItems}
              </span>
            )}
          </Link>

          {/* Avatar → Opens Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-0">
                <Avatar className="h-9 w-9 ring-2 ring-orange-100">
                  <AvatarImage src={personalInfo.avatar || '/avator.png'} />
                  <AvatarFallback className="bg-linear-to-br from-orange-100 to-orange-200 text-orange-700 text-sm font-medium">
                    {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] p-0">
              <SheetHeader className="p-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/primaryLogoHorizontal.png"
                    alt="OKOA SASA"
                    className="h-7 w-auto"
                  />
                
                </div>
              
              </SheetHeader>

              <Separator />

              {/* User Info */}
              <div className="px-6 py-5 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full ring-2 ring-white shadow-sm overflow-hidden">
                  <img
                    src={personalInfo.avatar || '/avator.png'}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-sans text-base font-medium leading-[140%] text-[#252525]">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </p>
                  <p className="font-sans text-sm font-normal leading-[140%] text-[#252525]">
                    {personalInfo.email}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="px-4 py-2 space-y-1">
                <Button
                  asChild
                  variant="ghost"
                  className="flex w-full items-center gap-2 px-2 py-2 font-sans text-md font-medium leading-[140%] text-black hover:bg-orange-50 hover:text-orange-600 rounded-lg cursor-pointer transition-colors h-auto justify-start"
                >
                  <Link to="/orders">
                    <BoxWhiteIcon className="h-5 w-5 text-black" />
                    Order History
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="flex w-full items-center gap-2 px-2 py-2 font-sans text-md font-medium leading-[140%] text-black hover:bg-orange-50 hover:text-orange-600 rounded-lg cursor-pointer transition-colors h-auto justify-start"
                >
                  <Link to="/profile">
                    <ProfileIcon className="h-5 w-5 text-black" />
                    My Account
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="flex w-full items-center gap-2 px-2 py-2 font-sans text-md font-medium leading-[140%] text-black hover:bg-orange-50 hover:text-orange-600 rounded-lg cursor-pointer transition-colors h-auto justify-start"
                >
                  <Link to="/order_table">
                    <BoxWhiteIcon className="h-5 w-5 text-black" />
                    All Orders
                  </Link>
                </Button>
              </div>

              <Separator />

              {/* Logout */}
              <div className="px-4 py-2">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="flex w-full items-center gap-2 px-2 py-2 text-md text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors font-medium h-auto justify-start"
                >
                  <LogoutIcon className="h-6 w-6" />
                  Log Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* === MOBILE SEARCH BAR === */}
      <div className="border-t border-[#E8ECF4] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3">
          <Search className="h-5 w-5 text-[#A0A4AC]" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
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
                ? 'bg-linear-to-b from-[#F8971D] to-[#EE3124] text-white hover:opacity-90'
                : 'pointer-events-none opacity-0'
            )}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}