import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Categories', href: '/products/categories' },
    { label: 'New Arrivals', href: '/products' },
    { label: 'Best Sellers', href: '/products' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Track Order', href: '/orders' },
    { label: 'Returns', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-xl font-bold text-foreground">
              Okoa Sasa
            </h3>
            <p className="mb-4 text-sm text-foreground/70">
              Buy Now, Pay Later. Shop with flexible payment options that work
              for you.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-md p-2 text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="mx-auto max-w-md">
            <h4 className="mb-2 text-center text-sm font-semibold text-foreground">
              Stay Updated
            </h4>
            <p className="mb-4 text-center text-sm text-foreground/70">
              Subscribe to get special offers and updates
            </p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button type="submit" size="sm" className="sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Legal Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-foreground/70 sm:flex-row">
          <p>© 2025 Okoa Sasa. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="#" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
