import { useState } from 'react'
import { Box, ChevronDown, ChevronUp, List, User } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { useAccountStore } from '@/data/accountStore'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { Button } from '@/components/ui/button'
import { BoxWhiteIcon, ProfileIcon, LogoutIcon,FileIcon, TruckIcon, XIcon } from '@/assets/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import logo from '@/assets/images/primaryLogoHorizontal.png'
import { X } from 'lucide-react'
const MobileSeparatedMenuItems = ({ onLogout }) => (
  <>
    {/* Order History */}
    <SheetClose asChild>
      <Button
        asChild
        variant="ghost"
        className="-mt-4 flex w-full items-center gap-3 px-4 py-2 font-sans text-base font-medium leading-[140%] text-[#252525] hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors h-auto justify-start"
      >
        <Link to="/orders">
          <BoxWhiteIcon className="h-5 w-5 text-[#252525]" />
          Order History
        </Link>
      </Button>
    </SheetClose>
    <Separator className="bg-gray-200" />

    {/* My Account */}
    <SheetClose asChild>
      <Button
        asChild
        variant="ghost"
        className="flex w-full items-center gap-3 px-4 py-2 font-sans text-base font-medium leading-[140%] text-[#252525] hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors h-auto justify-start"
      >
        <Link to="/profile">
          <ProfileIcon className="h-5 w-5 text-[#252525]" />
          My Account
        </Link>
      </Button>
    </SheetClose>
    <Separator className="bg-gray-200" />

    {/* All Orders */}
    <SheetClose asChild>
      <Button
        asChild
        variant="ghost"
        className="ml-1 flex w-full items-center gap-3 px-4 py-2 font-sans text-base font-medium leading-[140%] text-[#252525] hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors h-auto justify-start"
      >
        <Link to="/order_table">
          <List className="h-5 w-5 text-[#252525]" />
          All Orders
        </Link>
      </Button>
    </SheetClose>
    <Separator className="bg-gray-200" />

    {/* Log Out */}
    <Button
      onClick={onLogout}
      variant="ghost"
      className="mt-4 flex w-full items-center gap-3 px-4 py-2 font-sans text-base font-medium leading-[140%] text-red-600 hover:bg-red-50 rounded-lg transition-colors h-auto justify-start"
    >
      <LogoutIcon className="h-5 w-5" />
      Log Out
    </Button>
  </>
)


const MenuItems = ({ onLogout }) => (
  <>
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
        <List className="h-5 w-5 text-black" />
        All Orders
      </Link>
    </Button>

    <DropdownMenuSeparator className="my-1" />

    <Button
      onClick={onLogout}
      variant="ghost"
      className="flex w-full items-center gap-2 px-2 py-2 text-md text-red-600 hover:bg-red-50 rounded-lg cursor-pointer  font-medium h-auto justify-start mt-4"
    >
      <LogoutIcon className="h-6 w-6" />
      Log Out
    </Button>
  </>
)


const MobileSheet = ({ trigger, onLogout }) => {
  const { personalInfo } = useAccountStore()

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent 
        side="right" 
        className="w-[300px] p-0 bg-white flex flex-col"
        // ADD THIS LINE to hide the default close button
        hideCloseButton
      >
        {/* Your Custom Close Button */}
        <SheetClose asChild>
          <button
            className="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 z-10"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-[#09244B]" />
            <span className="sr-only">Close</span>
          </button>
        </SheetClose>

        {/* Logo */}
        <div className="p-6 pb-4">
          <img
            className="h-7 w-auto"
            src={logo}
            srcSet={`${logo} 1x, ${logo} 2x`}
            alt="Okoa Sasa Logo"
            loading="lazy"
            decoding="async"
          />
        </div>
        <Separator className="bg-gray-200" />

        {/* User Info */}
        <div className="px-6 py-5 flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
            <AvatarImage
              src={personalInfo.avatar || '/avator.png'}
              alt="avatar"
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="bg-brand-bg-2 text-sm font-medium">
              {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-sans text-base font-medium leading-[140%] text-[#252525]">
              {personalInfo.firstName} {personalInfo.lastName}
            </p>
            <p className="font-sans text-sm font-normal leading-[140%] text-[#252525]">
              {personalInfo.email}
            </p>
          </div>
        </div>
        <Separator className="bg-gray-200" />

        {/* Menu Items */}
        <div className="px-2 py-2 space-y-0 flex-1 overflow-y-auto">
          <MobileSeparatedMenuItems onLogout={onLogout} />
        </div>
      </SheetContent>
    </Sheet>
  )
}


export function UserDropdown({ isMobile = false }) {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user, isAuthenticated, logout } = useStateContext()
  const { personalInfo } = useAccountStore()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  /* ---------- NOT LOGGED IN mobile ---------- */
  if (!isAuthenticated || !user) {
    if (isMobile) {
      return (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="p-0"
            onClick={() => setShowAuthDialog(true)}
          >
            <Avatar className="h-9 w-9 ring-2 ring-white ">
              <AvatarFallback className="bg-brand-bg-2  text-sm font-medium">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
          <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
        </>
      )
    }

    return (
      <>
        <button
          onClick={() => setShowAuthDialog(true)}
          className="flex items-center gap-1 md:gap-2"
        >
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand-bg-2">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden text-base leading-[140%] md:inline">
            Account
          </span>
          <ChevronDown className="hidden h-4 w-4 md:inline" />
        </button>
        <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      </>
    )
  }

  /* ---------- LOGGED IN ---------- */
  const avatar = (
    <Avatar
      className={
        isMobile ? 'h-9 w-9 ring-2 ring-white ' : 'h-8 w-8 ring-2 ring-white'
      }
    >
      <AvatarImage src={personalInfo.avatar || '/avator.png'} />
      <AvatarFallback className="bg-brand-bg-2 text-sm font-medium">
        {personalInfo.firstName?.[0]}
        {personalInfo.lastName?.[0]}
      </AvatarFallback>
    </Avatar>
  )

  /* ----- MOBILE ----- */
  if (isMobile) {
    return <MobileSheet trigger={avatar} onLogout={handleLogout} />
  }

  /* ----- DESKTOP ----- */
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200">
          <div className="overflow-hidden rounded-full">{avatar}</div>
          <div className="hidden md:flex flex-col items-start">
            <span className="font-sans text-base font-medium leading-[140%] text-[#252525]">
              {personalInfo.firstName}
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
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="h-8 w-8 rounded-full ring-2 ring-white shadow-sm overflow-hidden">
            <img
              src={personalInfo.avatar || '/avator.png'}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base font-medium leading-[140%] text-[#252525]">
              {personalInfo.firstName} {personalInfo.lastName}
            </span>
            <span className="font-sans text-sm font-normal leading-[140%] text-[#252525]">
              {personalInfo.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1" />
        <div className="space-y-1 px-1">
          <MenuItems onLogout={handleLogout} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
