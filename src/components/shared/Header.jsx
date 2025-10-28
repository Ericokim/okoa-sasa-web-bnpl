import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ShoppingCart, User, ChevronDown, Search } from 'lucide-react'
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
import { AuthDialog } from '@/components/shared/AuthDialog'

export function Header() {
  const navigate = useNavigate()
  const { user, cart, logout } = useStateContext()
  const cartCount = cart?.length || 0
  const isAuthenticated = !!user
  const cartItemCount = cartCount || 0

  const [showAuthDialog, setShowAuthDialog] = useState(false)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
    } else {
      navigate({ to: '/checkout' })
    }
  }

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

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-[24px] hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-1">
                      <User className="h-6 w-6 text-black" />
                      <span className="text-base font-normal text-black hidden sm:inline">
                        Account
                      </span>
                    </div>
                    <ChevronDown className="h-6 w-6 text-black" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user?.name || 'User'}
                      </p>
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
                    <Link to="/settings" className="cursor-pointer">
                      Settings
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
              <Link to="/signin" className="flex items-center gap-1 px-2 py-1">
                <User className="h-6 w-6 text-black" />
                <span className="text-base font-normal text-black hidden sm:inline">
                  Account
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
