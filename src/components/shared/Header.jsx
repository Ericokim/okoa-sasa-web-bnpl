import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, ShoppingCart, User, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useStateContext } from '@/context/state-context'

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/products/categories' },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useStateContext()
  const cartItemCount = 0 // TODO: Connect to actual cart state

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-brand-primary-gradient">
              Okoa Sasa
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{
                className: 'text-sm font-medium text-primary transition-colors',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Button - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Menu / Auth Buttons */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {user && user.name ? user.name : 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user && user.email ? user.email : 'user@example.com'}
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
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-brand-primary-gradient">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-brand-primary-gradient">
                  Okoa Sasa
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {/* Search - Mobile */}
                <div className="pb-4 border-b border-border">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search products...
                  </Button>
                </div>

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground/80 hover:text-primary transition-colors py-2"
                    activeProps={{
                      className: 'text-primary transition-colors py-2',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Auth Buttons - Mobile */}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-brand-primary-gradient">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}

                {/* User Info - Mobile */}
                {isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <div className="px-2 py-2">
                      <p className="text-sm font-medium">
                        {user && user.name ? user.name : 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user && user.email ? user.email : 'user@example.com'}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-foreground/80 hover:text-primary transition-colors py-2"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-foreground/80 hover:text-primary transition-colors py-2"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/change-password"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-foreground/80 hover:text-primary transition-colors py-2"
                    >
                      Settings
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full mt-2"
                    >
                      Log out
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
