import { Link } from '@tanstack/react-router'
import { X, ChevronDown, Search, Settings, ShoppingCart } from 'lucide-react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Button } from '@/components/ui/button'

const NotFoundFilterBar = () => {
  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden items-center justify-between border-b border-[#E8ECF4] px-20 py-8 lg:flex">
        {/* Left Side Filters */}
        <div className="flex items-center gap-[26px]">
          {/* Brand Filter */}
          <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Brand
            </span>
            <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Price Range
            </span>
            <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
          </div>

          {/* Device Type Filter */}
          <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Device Type
            </span>
            <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
          </div>

          {/* All Filters */}
          <div className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-4 py-3">
            <Settings className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              All Filters
            </span>
            <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
          </div>
        </div>

        {/* Right Side Filters */}
        <div className="flex items-center gap-3">
          {/* How it works */}
          <div className="flex items-center gap-2 rounded-3xl border border-[#F8971D] px-4 py-2">
            <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-base font-normal capitalize leading-[140%] text-transparent">
              How it works
            </span>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-4 py-2">
            <span className="text-base font-normal capitalize leading-[140%] text-black">
              Sort By
            </span>
            <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Bar */}
      <div className="flex flex-col gap-4 px-5 py-4 lg:hidden">
        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-[6px]">
          {/* Brand Filter */}
          <div className="flex items-center gap-1 rounded-3xl bg-[#F9FAFB] px-3 py-2">
            <span className="text-sm font-normal leading-[140%] text-black">
              Brand
            </span>
            <X className="h-4 w-4" strokeWidth={2} />
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-1 rounded-3xl bg-[#F9FAFB] px-3 py-2">
            <span className="text-sm font-normal leading-[140%] text-black">
              Price Range
            </span>
            <X className="h-4 w-4" strokeWidth={2} />
          </div>

          {/* Device Type Filter */}
          <div className="flex items-center gap-1 rounded-3xl bg-[#F9FAFB] px-3 py-2">
            <span className="text-sm font-normal leading-[140%] text-black">
              Device Type
            </span>
            <X className="h-4 w-4" strokeWidth={2} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* How it works */}
          <div className="flex flex-1 items-center justify-center gap-2 rounded-3xl border border-[#F8971D] px-4 py-2">
            <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-sm font-medium capitalize leading-[140%] text-transparent">
              How it works
            </span>
          </div>

          {/* Sort By */}
          <div className="flex flex-1 items-center gap-2 rounded-3xl border border-[#E8ECF4] px-4 py-2">
            <span className="text-sm font-medium capitalize leading-[140%] text-black">
              Sort By
            </span>
            <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </>
  )
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Filter Bar */}
      <NotFoundFilterBar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-8 md:px-20 lg:px-20 lg:py-16">
        {/* 404 Illustration */}
        <div className="mb-8 flex w-full max-w-[650px] items-center justify-center">
          <img
            src="/404.png"
            alt="404 Error - Product not Found"
            className="h-auto w-full max-w-[334px] lg:max-w-[650px]"
          />
        </div>

        {/* Error Message */}
        <div className="flex w-full max-w-[650px] flex-col items-center gap-4 px-5 text-center lg:px-0">
          <h1 className="text-lg font-medium capitalize leading-[140%] text-[#1A2E35] lg:text-4xl lg:font-semibold">
            Ooops! Product not found
          </h1>
          <p className="text-sm font-medium leading-[140%] text-[#A0A4AC] lg:text-[22px]">
            The Product you are looking for doesn't exist
          </p>

          {/* Back to Home Button */}
          <Link to="/" className="w-full lg:w-auto">
            <Button
              variant="gradient"
              className="w-full rounded-3xl border border-[#F8971D] px-4 py-3 text-base font-medium capitalize leading-[140%] text-white lg:w-[344px]"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
