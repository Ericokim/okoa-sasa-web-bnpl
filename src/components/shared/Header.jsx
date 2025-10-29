import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ShoppingCart, User, ChevronDown, Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useStateContext } from '@/context/state-context'

export function Header() {
  const navigate = useNavigate()
  const { user, cart, logout } = useStateContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = cart?.length || 0
  const isAuthenticated = !!user
  const cartItemCount = cartCount || 0

  return (
    <header className="w-full border-b border-[#E8ECF4] bg-white">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-5 lg:px-20 lg:py-6">
        <Link to="/" className="flex h-[35px] w-[130px] shrink-0 md:h-[43px] md:w-[158px]">
          <img
            src="/primaryLogoHorizontal.png"
            alt="OKOA SASA"
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="hidden flex-1 items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3 md:mx-6 lg:mx-8 lg:flex lg:max-w-[690px]">
          <Search className="h-6 w-6 text-[#A0A4AC]" />
          <input
            type="text"
            placeholder="Search for Devices"
            className="flex-1 bg-transparent text-sm text-[#A0A4AC] placeholder:text-[#A0A4AC] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-1 rounded-full px-2 py-2 transition-colors hover:bg-gray-50 md:px-3"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-[10px] font-semibold text-white">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden text-base md:inline">Cart</span>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 rounded-3xl px-2 py-2 transition-colors hover:bg-gray-50 md:gap-2 md:px-4">
                  <div className="flex items-center gap-1">
                    <User className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="hidden text-base md:inline">Account</span>
                  </div>
                  <ChevronDown className="h-4 w-4 md:h-6 md:w-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/change-password" className="cursor-pointer">
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/signin"
              className="flex items-center gap-1 rounded-full px-2 py-2 transition-colors hover:bg-gray-50 md:px-3"
            >
              <User className="h-5 w-5 md:h-6 md:w-6" />
              <span className="hidden text-base md:inline">Account</span>
            </Link>
          )}
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
