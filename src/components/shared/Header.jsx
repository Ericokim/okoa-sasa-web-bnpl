import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ShoppingCart,
  User,
  ChevronDown,
  Search, Menu, X,
  ChevronUp,
  LogOut,
  Box,
} from 'lucide-react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


export function Header() {
  const navigate = useNavigate()
  const { user, cart, logout } = useStateContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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
              <DropdownMenu onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200">
                    <div className="h-8 w-8 rounded-full ring-2 ring-white shadow-sm overflow-hidden">
                      <img
                        src="/avator.png"
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900">
                        {user?.name || 'User'}
                      </span>
                    </div>

                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-700" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-700" />
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 p-3 mt-2 rounded-2xl shadow-lg border border-gray-100 bg-white"
                >
                  {/* User Info Header */}
                  <div className="flex items-center gap-3 px-2 py-3">
                      <div className="h-8 w-8 rounded-full ring-2 ring-white shadow-sm overflow-hidden">
                      <img
                        src="/avator.png"
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[180px]">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="my-1" />

                  {/* Menu Items */}

                  <DropdownMenuItem asChild>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg cursor-pointer transition-colors"
                    >
                      <Box className="h-4 w-4" />
                      Order History
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg cursor-pointer transition-colors"
                    >
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors font-medium"
                  >
                    <LogOut className=" text-red-600 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  Sign In
                </span>
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
