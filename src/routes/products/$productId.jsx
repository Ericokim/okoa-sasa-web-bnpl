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
  Package,
} from 'lucide-react'
import {
  BoxIcon,
  CartIcon,
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  TikTokIcon,
  TruckIcon,
  VerifyIcon,
  WhatsAppIcon,
  XIcon,
} from '@/assets/icons'

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
    <div>
      {/* DESKTOP VIEW  */}
      <BreadCrumbs items={breadcrumbItems} className="my-6 mb-10" />

      <div className="hidden mb-[50px] lg:block">
        <div className="w-7xl h-[617px] flex justify-between">
          <div className="h-[617px] w-[168px] space-y-2 bg-white">
            {productImages.map((image, index) => (
              <div key={index} className="w-[168px] h-[148.25px]">
                <button
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-[139px] w-full rounded-2xl flex justify-center bg-brand-bg-2 transition-all ${
                    currentImageIndex === index ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-[49px] h-[97px] rounded-md m-[25.625px] object-contain"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="m-5 w-[536px] h-[580px] rounded-2xl bg-gray-50">
            <div className="w-[479px] h-[479px] my-[50.5px] mx-[28.5px] relative">
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer w-[34px] h-[34px] rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all z-10"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? productImages.length - 1 : prev - 1,
                  )
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0898 19.92L8.56984 13.4C7.79984 12.63 7.79984 11.37 8.56984 10.6L15.0898 4.08"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <img
                src={productImages[currentImageIndex]}
                alt="Product main view"
                className="absolute w-[400px] h-[479px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain rounded-2xl"
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-[34px] h-[34px] rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all z-10"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === productImages.length - 1 ? 0 : prev + 1,
                  )
                }
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="17"
                    cy="17"
                    r="16.5"
                    fill="white"
                    stroke="#E8ECF4"
                  />
                  <path
                    d="M13.9102 24.92L20.4302 18.4C21.2002 17.63 21.2002 16.37 20.4302 15.6L13.9102 9.08"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-[617px] w-[536px] ">
            <div className="w-[536px] h-[142px] space-y-2 mb-5 ">
              <div className=" h-[65px] grid justify-end">
                <div className="w-[104px] h-[17px] text-xs font-medium leading-[140%] text-black mb-2 ml-46">
                  Share With Others
                </div>
                <div className="h-10 flex px-2.5 w-[300px] space-x-2">
                  <div className="h-10 w-10 rounded-full bg-brand-bg-2 p-2">
                    <LinkIcon />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-brand-bg-2 p-2">
                    <FacebookIcon />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-brand-bg-2 p-2">
                    <XIcon />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-brand-bg-2 p-2">
                    <InstagramIcon />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-brand-bg-2 p-2">
                    <WhatsAppIcon />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-brand-bg-2 p-2">
                    <TikTokIcon />
                  </div>
                </div>
              </div>
              <div className="w-[536px] h-[39px] text-[28px] font-semibold leading-[140%] capitalize text-black self-stretch">
                iPhone 14
              </div>
              <div className="w-[533px] h-[22px] text-base font-medium leading-[140%] text-brand-gray -mt-2">
                6.1''-6GB RAM - 128GB ROM - Midnight +Free (Cover + Screen
                Protector)
              </div>
            </div>
            <div className="w-[536px] h-px bg-[#E8ECF4] self-stretch my-5"></div>
            <div className="flex justify-between h-9 mb-5 ">
              <p className="w-[134px] h-[34px] text-2xl font-semibold leading-[140%] capitalize bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent">
                KES 87,696
              </p>
              <div className="flex flex-row justify-center items-center px-4 py-2 gap-2.5 w-[107px] h-9 bg-[rgba(244,113,32,0.12)] rounded-3xl">
                <p className="w-[75px] h-5 text-sm font-semibold leading-[140%] capitalize text-[#F47120]">
                  20 in stock
                </p>
              </div>
            </div>
            <div className=" h-[74px] mb-5 ">
              <div className="h-[46px] w-[250px] rounded-full bg-brand-bg-2">
                <div className="flex py-2 px-4 justify-between">
                  <Button
                    className={
                      'rounded-full cursor-pointer w-[30px] h-[30px] bg-white text-primary '
                    }
                    variant={'default'}
                    size={'sm'}
                  >
                    <Plus size={16} className=" hover:bg-white" />
                  </Button>
                  <div>1</div>
                  <Button
                    className={
                      'rounded-full cursor-pointer w-[30px] h-[30px] bg-white text-primary'
                    }
                    variant={'default'}
                    size={'sm'}
                  >
                    <Minus size={16} className=" hover:bg-white" />
                  </Button>
                </div>
                <p className="w-[142px] mt-2 h-5 text-sm font-medium leading-[140%] capitalize text-[#A0A4AC]">
                  Maximum purchase 5
                </p>
              </div>
            </div>
            <div className="mb-5 h-[104px] space-y-3 ">
              <Button className="w-[536px] h-[46px] bg-white border border-primary text-primary rounded-full">
                <CartIcon />{' '}
                <p className="w-[88px] h-[22px] text-base font-medium leading-[140%] capitalize bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent">
                  Add To Cart
                </p>
              </Button>
              <Button className="flex flex-row justify-center items-center px-4 py-3 gap-[10px] w-[536px] h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl self-stretch text-white">
                <p className="w-[67px] h-[22px] text-base font-medium leading-[140%] capitalize text-white">
                  Buy Now
                </p>
              </Button>
            </div>
            <div className="bg-gray-50 rounded-2xl h-40 p-3 space-y-2">
              <div className="h-10 flex">
                <div className="h-10 w-10 rounded-full p-2 bg-orange-100">
                  <BoxIcon />
                </div>
                <p className="w-[407px] h-[22px] text-base font-medium leading-[140%] text-center text-black my-[9px] ml-2">
                  15GB + 500 Mins + Unlimited SMS at KES 1,000/Month
                </p>
              </div>
              <div className="h-10 flex">
                <div className="h-10 w-10 rounded-full p-2 bg-orange-100">
                  <TruckIcon />
                </div>
                <p className="w-[171px] h-[22px] text-base font-medium leading-[140%] text-center text-black my-[9px] ml-2">
                  Country Wide Delivery
                </p>
              </div>
              <div className="h-10 flex">
                <div className="h-10 w-10 rounded-full p-2 bg-orange-100">
                  <VerifyIcon />
                </div>
                <p className="w-[218px] h-[22px] text-base font-medium leading-[140%] text-center text-black my-[9px] ml-2">
                  Warranty on all mobile phone
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 h-[510px] w-[770px]">
          <div className="flex gap-8 border-b-2 border-gray-200 mb-8 w-[591px] h-[50px] ">
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === 'specifications' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              Specifications
              {activeTab === 'specifications' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-lg font-semibold transition-colors ${activeTab === 'description' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-4 text-lg font-semibold transition-colors ${activeTab === 'benefits' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              Benefits
            </button>
          </div>
          <div className="mt-10">
            {activeTab === 'specifications' && (
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 flex h-[420px]">
                <div className="w-1/4 bg-gray-50">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="px-6 py-5 font-semibold text-gray-900 border-b last:border-b-0 border-gray-200 h-[60px]"
                    >
                      {spec.label}
                    </div>
                  ))}
                </div>
                <div className="w-3/4 border-l border-gray-200">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="px-6 py-5 border-b text-lg font-medium capitalize text-[#252525] last:border-b-0 border-gray-200 h-[60px]"
                    >
                      {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'description' && (
              <div className="text-gray-700">
                Description content goes here...
              </div>
            )}
            {activeTab === 'benefits' && (
              <div className="text-gray-700">Benefits content goes here...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
})
