import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Button } from '@/components/ui/button'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import {
  Box,
  Settings,
  Facebook,
  Instagram,
  Link2,
  MessageCircle,
  Minus,
  Music2,
  Plus,
  ShoppingCart,
  Truck,
  Twitter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const [activeTab, setActiveTab] = React.useState('specifications')
  const [quantity, setQuantity] = React.useState(1)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const specifications = [
    { label: 'Display', value: '6.1"' },
    { label: 'Camera', value: 'Front Camera: 12 MP, Rear Camera : 12MP +12MP' },
    { label: 'Memory', value: 'RAM: 6GB, ROM : 128GB' },
    { label: 'Network', value: 'Sim Type: Dual Sim' },
    { label: 'OS', value: 'IOS 16' },
    { label: 'Battery', value: '3279mAh' },
    { label: 'Warranty', value: '1 Year' },
  ]

  const productImages = Array(4).fill('/phone.png')

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'iPhone 14', path: `/products/${productId}`, isCurrent: true },
  ]

  return (
    <div className=" mx-auto">
      <BreadCrumbs items={breadcrumbItems} className="my-6 mb-10" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex flex-row gap-2 md:flex-col md:gap-2">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F9FAFB] transition-all md:h-[148px] md:w-[168px] ${
                    currentImageIndex === index
                      ? 'ring-2 ring-brand-primary-start'
                      : ''
                  }`}
                >
                  <img
                    src={productImages[index]}
                    alt={`Product view ${index + 1}`}
                    className="h-12 w-12 object-contain md:h-24 md:w-24"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex flex-1 items-center justify-center rounded-2xl bg-[#F9FAFB] p-8 md:h-[617px]">
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? productImages.length - 1 : prev - 1,
                  )
                }
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>

              <img
                src={productImages[currentImageIndex]}
                alt="Product main view"
                className="h-64 w-64 object-contain md:h-[479px] md:w-[300px]"
              />

              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === productImages.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-brand-black md:text-[26px]">
                  iPhone 14
                </h1>
                <p className="mt-2 text-sm font-medium text-[#A0A4AC] md:text-base">
                  6.1" - 6GB RAM - 128GB ROM - Midnight +Free (Cover + Screen
                  Protector)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-semibold text-brand-mid-gray">
                Share With Others
              </span>
            </div>

            <div className="flex items-center justify-end gap-2">
              {[Link2, Facebook, Twitter, Instagram, MessageCircle, Music2].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9FAFB] transition-colors hover:bg-gray-200"
                  >
                    <Icon className="h-5 w-5 text-brand-primary-start" />
                  </button>
                ),
              )}
            </div>

            <div className="my-4 h-px bg-gray-200" />

            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-brand-black">
                KES 87,969
              </p>
              <div className="rounded-full bg-gradient-to-b from-[#F8971D] to-[#EE3124] px-6 py-2 text-center text-sm font-medium text-white">
                20 in stock
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-6 rounded-full bg-[#F9FAFB] px-4 py-2">
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-white text-brand-primary-start hover:bg-white"
                >
                  <Minus size={16} />
                </Button>
                <span className="min-w-[20px] text-center font-semibold">
                  {quantity}
                </span>
                <Button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-white text-brand-primary-start hover:bg-white"
                >
                  <Plus size={16} />
                </Button>
              </div>
              <p className="text-sm text-[#A0A4AC]">Maximum purchase 5</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="h-12 w-full rounded-full border-2 border-brand-primary-start text-brand-primary-start hover:bg-brand-primary-start/10"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add To Cart
              </Button>
              <Button
                variant="gradient"
                className="h-12 w-full rounded-full text-white"
              >
                Buy now
              </Button>
            </div>

            <div className="space-y-3 rounded-2xl bg-[#F9FAFB] p-4">
              {[
                {
                  icon: Box,
                  text: '15GB + 500 Mins + Unlimited SMS at KES 1,000/Month',
                },
                { icon: Truck, text: 'Country Wide Delivery' },
                { icon: Settings, text: 'Warranty on all mobile phone' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(244,113,32,0.12)]">
                    <item.icon className="h-5 w-5 text-[#F47120]" />
                  </div>
                  <p className="pt-2 text-sm font-semibold text-brand-black">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 mb-4">
        <div className="flex gap-8 border-b-2 border-gray-200">
          {['specifications', 'description', 'benefits'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-4 text-base font-semibold capitalize transition-colors md:text-lg ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-4xl bg-brand-primary-gradient" />
              )}
            </button>
          ))}
        </div>

        <div className="my-8 mb-4">
          {activeTab === 'specifications' && (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 bg-[#F9FAFB] px-4 py-5 font-semibold text-brand-black last:border-b-0 md:px-6"
                    >
                      {spec.label}
                    </div>
                  ))}
                </div>
                <div className="md:w-3/4 md:border-l md:border-gray-200">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 px-4 py-5 text-gray-700 last:border-b-0 md:px-6"
                    >
                      {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'description' && (
            <div className="text-gray-700">
              <p>
                The iPhone 14 features a stunning 6.1-inch Super Retina XDR
                display, offering an immersive viewing experience with vibrant
                colors and deep blacks. Powered by the A15 Bionic chip, it
                delivers exceptional performance for all your tasks.
              </p>
            </div>
          )}
          {activeTab === 'benefits' && (
            <div className="text-gray-700">
              <ul className="list-disc space-y-2 pl-6">
                <li>Advanced dual-camera system for stunning photos</li>
                <li>All-day battery life</li>
                <li>Durable design with Ceramic Shield</li>
                <li>5G capable for super-fast downloads</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
})
