import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, X, MessageCircle } from 'lucide-react'
import { SiTiktok } from 'react-icons/si'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-neutral-900 py-10 px-4 sm:px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section with Logo and Social Media */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 md:gap-0">
          {/* Logo */}
          <div className="w-full md:w-[395px] h-auto md:h-[109px]">
            <img
              src="/primaryLogoHorizontal.png"
              alt="Okoa Sasa"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 md:gap-5">
            <a
              href="#"
              className="w-[50px] h-[50px] md:w-[63px] md:h-[63px] bg-white/10 rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-colors"
            >
              <Facebook className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
            <a
              href="#"
              className="w-[50px] h-[50px] md:w-[63px] md:h-[63px] bg-white/10 rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
            <a
              href="#"
              className="w-[50px] h-[50px] md:w-[63px] md:h-[63px] bg-white/10 rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-colors"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
            <a
              href="#"
              className="w-[50px] h-[50px] md:w-[63px] md:h-[63px] bg-white/10 rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
            <a
              href="#"
              className="w-[50px] h-[50px] md:w-[63px] md:h-[63px] bg-white/10 rounded-full flex items-center justify-center shadow-[0px_22.483px_33.725px_-6.745px_rgba(0,0,0,0.1),0px_8.993px_13.49px_-8.993px_rgba(0,0,0,0.1)] hover:bg-white/20 transition-colors"
            >
              <SiTiktok className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">
          {/* Useful Links */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 capitalize">
              Useful Links
            </h3>
            <div className="space-y-2 md:space-y-3">
              <Link
                to="/how-it-works"
                className="block text-white text-base font-medium hover:text-brand-primary-start transition-colors"
              >
                How it Works
              </Link>
              <Link
                to="/faqs"
                className="block text-white text-base font-medium hover:text-brand-primary-start transition-colors"
              >
                FAQs
              </Link>
              <Link
                to="/terms"
                className="block text-white text-base font-medium hover:text-brand-primary-start transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Other Links */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 capitalize">
              Other Links
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div className="text-white text-base font-medium">
                USSD code *884#
              </div>
              <Link
                to="/privacy"
                className="block text-white text-base font-medium hover:text-brand-primary-start transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/insurance"
                className="block text-white text-base font-medium hover:text-brand-primary-start transition-colors"
              >
                Insurance Policy
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 capitalize">
              Contact Us
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div className="text-white text-base font-medium">
                +09 456 789
              </div>
              <div className="text-white text-base font-medium">
                OkoaSASA@gmail.com
              </div>
              <div className="text-white text-base font-medium">
                1234 Building, Kenya
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="w-full md:w-[400px]">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 capitalize text-center md:text-left">
              You Can Find Us On!
            </h3>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Input
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#2c2d2f] border-none text-brand-mid-gray placeholder:text-brand-mid-gray rounded-2xl px-4 md:px-6 py-3 h-auto flex-1"
              />
              <Button
                variant="gradient"
                className="rounded-3xl px-4 md:px-6 py-3 h-auto text-base font-medium"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
