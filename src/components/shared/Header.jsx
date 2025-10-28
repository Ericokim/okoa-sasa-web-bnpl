import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ShoppingCart, User, ChevronDown,Search, ChevronUp, LogOut, Box } from 'lucide-react'
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
  const { user, cart, logout } = useStateContext()
  const cartCount = cart?.length || 0
  const isAuthenticated = !!user
  const cartItemCount = cartCount || 0
  const [isOpen, setIsOpen] = useState(false);

  // Fallback initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <header className="w-full border-b border-[#e8ecf4] bg-white">
      <div className="px-4 lg:px-20">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex h-[43px] w-[158px] shrink-0">
            <img
              src="/primaryLogoHorizontal.png"
              alt="Okoa Sasa"
              className="h-full w-full object-contain"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center bg-[#f3f3f3] rounded-[24px] px-4 py-3 w-[690px] gap-3 mx-4">
            <Search className="h-6 w-6 text-[#a0a4ac] shrink-0" />
            <input
              type="text"
              placeholder="Search for Devices"
              className="bg-transparent border-none outline-none text-sm font-normal text-[#a0a4ac] flex-1 placeholder:text-[#67696d]"
            />
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="flex items-center gap-1 px-2 py-1">
              <ShoppingCart className="h-6 w-6 text-black" />
              <span className="text-base font-normal text-black hidden sm:inline">
                Cart
              </span>
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>

        

            {isAuthenticated ? (
              <DropdownMenu onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200">
                    <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-sm font-medium">
                        {user?.name ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
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
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-medium">
                        {user?.name ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
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

        {/* Search Bar - Mobile */}
        <div className="lg:hidden pb-4">
          <div className="flex items-center bg-[#f9fafb] rounded-[24px] px-4 py-3 gap-3">
            <Search className="h-6 w-6 text-[#a0a4ac] shrink-0" />
            <input
              type="text"
              placeholder="Search for Devices"
              className="bg-transparent border-none outline-none text-sm font-normal text-[#a0a4ac] flex-1 placeholder:text-[#a0a4ac]"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
