import { useState } from 'react'
import { ChevronDown, Package, User, LogOut } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { AuthDialog } from '@/components/shared/AuthDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const BoxIcon = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.64258 6.2L10.0009 10.4583L17.3092 6.225"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 18.0083V10.45"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.27552 2.06667L3.82552 4.53333C2.81719 5.09167 1.99219 6.49167 1.99219 7.64167V12.35C1.99219 13.5 2.81719 14.9 3.82552 15.4583L8.27552 17.9333C9.22552 18.4583 10.7839 18.4583 11.7339 17.9333L16.1839 15.4583C17.1922 14.9 18.0172 13.5 18.0172 12.35V7.64167C18.0172 6.49167 17.1922 5.09167 16.1839 4.53333L11.7339 2.05833C10.7755 1.53333 9.22552 1.53333 8.27552 2.06667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProfileIcon = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1341 9.05833C10.0508 9.05 9.95078 9.05 9.85911 9.05833C7.87578 8.99166 6.30078 7.36666 6.30078 5.36666C6.30078 3.325 7.95078 1.66666 10.0008 1.66666C12.0424 1.66666 13.7008 3.325 13.7008 5.36666C13.6924 7.36666 12.1174 8.99166 10.1341 9.05833Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.96758 12.1333C3.95091 13.4833 3.95091 15.6833 5.96758 17.025C8.25924 18.5583 12.0176 18.5583 14.3092 17.025C16.3259 15.675 16.3259 13.475 14.3092 12.1333C12.0259 10.6083 8.26758 10.6083 5.96758 12.1333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LogoutIcon = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.4409 15.37C17.2509 15.37 17.0609 15.3 16.9109 15.15C16.6209 14.86 16.6209 14.38 16.9109 14.09L18.9409 12.06L16.9109 10.03C16.6209 9.74 16.6209 9.26 16.9109 8.97C17.2009 8.68 17.6809 8.68 17.9709 8.97L20.5309 11.53C20.8209 11.82 20.8209 12.3 20.5309 12.59L17.9709 15.15C17.8209 15.3 17.6309 15.37 17.4409 15.37Z"
      fill="#F25E5E"
    />
    <path
      d="M19.9298 12.81H9.75977C9.34977 12.81 9.00977 12.47 9.00977 12.06C9.00977 11.65 9.34977 11.31 9.75977 11.31H19.9298C20.3398 11.31 20.6798 11.65 20.6798 12.06C20.6798 12.47 20.3398 12.81 19.9298 12.81Z"
      fill="#F25E5E"
    />
    <path
      d="M11.7598 20.75C6.60977 20.75 3.00977 17.15 3.00977 12C3.00977 6.85 6.60977 3.25 11.7598 3.25C12.1698 3.25 12.5098 3.59 12.5098 4C12.5098 4.41 12.1698 4.75 11.7598 4.75C7.48977 4.75 4.50977 7.73 4.50977 12C4.50977 16.27 7.48977 19.25 11.7598 19.25C12.1698 19.25 12.5098 19.59 12.5098 20C12.5098 20.41 12.1698 20.75 11.7598 20.75Z"
      fill="#F25E5E"
    />
  </svg>
)

export function UserDropdown() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user, isAuthenticated, logout } = useStateContext()

  if (!isAuthenticated || !user) {
    return (
      <>
        <button
          onClick={() => setShowAuthDialog(true)}
          className="flex items-center gap-1 md:gap-2"
        >
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200">
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-base leading-[140%] text-[#252525]">
              {user?.name || 'James'}
            </span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[240px] rounded-3xl bg-white p-6 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200">
              <User className="h-5 w-5" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="text-base font-medium leading-[140%] text-[#252525]">
                {user?.name || 'James'}
              </div>
              <div className="text-sm leading-[140%] text-[#252525]">
                {user?.email || 'James@gmail.com'}
              </div>
            </div>
          </div>

          <div className="h-px w-[192px] bg-[#E8ECF4]"></div>

          <Link to="/protected/orders" className="flex items-center gap-2 py-2">
            <BoxIcon className="h-5 w-5 text-[#292D32]" />
            <span className="flex-1 text-base font-medium leading-[140%] text-black">
              Order History
            </span>
          </Link>

          <Link
            to="/protected/profile"
            className="flex items-center gap-2 py-2"
          >
            <ProfileIcon className="h-5 w-5 text-[#292D32]" />
            <span className="text-base font-medium leading-[140%] text-black">
              My Account
            </span>
          </Link>

          <div className="h-px w-[192px] bg-[#E8ECF4]"></div>

          <button onClick={logout} className="flex items-center gap-2 py-2">
            <LogoutIcon className="h-6 w-6" />
            <span className="flex-1 text-base font-medium leading-[140%] text-[#F25E5E]">
              Log Out
            </span>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
