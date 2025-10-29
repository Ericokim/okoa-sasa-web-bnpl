import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Button } from '@/components/ui/button'
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

function ProductDetailPage() {
  const [activeTab, setActiveTab] = React.useState('specifications')
  const [quantity, setQuantity] = React.useState(1)

  const specifications = [
    { label: 'Display', value: '6.1"' },
    { label: 'Camera', value: 'Front Camera: 12 MP, Rear Camera : 12MP +12MP' },
    { label: 'Memory', value: 'RAM: 6GB, ROM : 128GB' },
    { label: 'Network', value: 'Sim Type: Dual Sim' },
    { label: 'OS', value: 'IOS 16' },
    { label: 'Battery', value: '3279mAh' },
    { label: 'Warranty', value: '1 Year' },
  ]

  return (
    <div>
      {/* DESKTOP VIEW  */}
      <div className="hidden lg:block">
        <div className="w-7xl h-[617px] flex justify-between">
          <div className=" h-[617px] w-[168px] space-y-2 bg-white">
            <div className="w-[168px] h-[148.25px] rounded-2xl flex justify-center bg-gray-50">
              <div className="bg-black w-[49px] h-[97px] rounded-md m-[25.625px]"></div>
            </div>
            <div className="w-[168px] h-[148.25px] rounded-2xl flex justify-center bg-gray-50">
              <div className="bg-black w-[49px] h-[97px] rounded-md m-[25.625px]"></div>
            </div>
            <div className="w-[168px] h-[148.25px] rounded-2xl flex justify-center bg-gray-50">
              <div className="bg-black w-[49px] h-[97px] rounded-md m-[25.625px]"></div>
            </div>
            <div className="w-[168px] h-[148.25px] rounded-2xl flex justify-center bg-gray-50">
              <div className="bg-black w-[49px] h-[97px] rounded-md m-[25.625px]"></div>
            </div>
          </div>
          <div className=" m-5 w-[536px] h-[580px] rounded-2xl bg-gray-50">
            <div className="w-[479px] h-[479px] my-[50.5px] mx-[28.5px] relative">
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all z-10"
                onClick={() => {}}
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="w-[300px] h-[479px] mx-[89.5px] bg-black rounded-2xl "></div>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all z-10"
                onClick={() => {}}
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-[617px] w-[536px] ">
            <div className="w-[536px] h-[142px] space-y-2 mb-5 ">
              <div className=" h-[65px] grid justify-end">
                <div className="h-[17px] text-xs justify-end font-semibold mb-2">
                  Share With Others
                </div>
                <div className="h-10 flex px-2.5 w-[300px] space-x-2">
                  <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                    <Link2 className="text-primary" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                    <Facebook className="text-primary" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                    <Twitter className="text-primary" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                    <Instagram className="text-primary" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                    <MessageCircle className="text-primary" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-100 p-2">
                    <Music2 className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="text-[26px] font-semibold">Iphone 14</div>
              <div className="font-semibold text-gray-400 -mt-2">
                6.1''-6GB RAM - 128GB ROM - Midnight +Free (Cover + Screen
                Protector)
              </div>
            </div>
            <div className="my-5 h-0.5 bg-gray-200"></div>
            <div className="flex justify-between h-9 mb-5 ">
              <p>KES 87,969</p>
              <div className="bg-primary w-[107px] text-center rounded-full h-9 p-[4.5px] ">
                20 in stock
              </div>
            </div>
            <div className=" h-[74px] mb-5 ">
              <div className="h-[46px] w-[250px] rounded-full bg-gray-100">
                <div className="flex py-2 px-4 justify-between">
                  <Button
                    className={
                      'rounded-full cursor-pointer w-[30px] h-[30px] bg-white text-primary'
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
                <p className="text-gray-400">Maximum purchase 5</p>
              </div>
            </div>
            <div className="mb-5 h-[104px] space-y-3 ">
              <Button className="w-[536px] h-[46px] bg-white border border-primary text-primary rounded-full">
                <ShoppingCart /> Add To Cart
              </Button>
              <Button className="w-[536px] h-[46px] bg-primary text-white rounded-full">
                Buy now
              </Button>
            </div>
            <div className="bg-gray-50 rounded-2xl h-40 p-3 space-y-2">
              <div className="h-10 flex">
                <div className="h-10 w-10 rounded-full p-2 bg-orange-100">
                  <Box className="text-primary" />
                </div>
                <p className=" my-[9px] font-semibold ml-2">
                  15GB + 500 Mins + Unlimited SMS at KES 1,000/Month
                </p>
              </div>
              <div className="h-10 flex">
                <div className="h-10 w-10 rounded-full p-2 bg-orange-100">
                  <Truck className="text-primary" />
                </div>
                <p className=" my-[9px] font-semibold ml-2">
                  Country Wide Delivery
                </p>
              </div>
              <div className="h-10 flex">
                <div className="h-10 w-10 rounded-full p-2 bg-orange-100">
                  <Settings className="text-primary" />
                </div>
                <p className=" my-[9px] font-semibold ml-2">
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
                      className="px-6 py-5 text-gray-700 border-b last:border-b-0 border-gray-200 h-[60px]"
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

      {/* MOBILE VIEW */}
      <div className="lg:hidden max-w-md mx-auto bg-white min-h-screen">
        <div className="relative bg-gray-50 h-80 flex items-center justify-center">
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-32 h-56 bg-gray-800 rounded-lg"></div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-16 h-24 bg-gray-50 rounded-lg flex items-center justify-center"
            >
              <div className="w-6 h-12 bg-gray-800 rounded"></div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3">
          <div className="text-xs font-semibold text-gray-600 mb-2 text-right">
            Share With Others
          </div>
          <div className="flex gap-2 justify-end">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Link2 className="w-4 h-4 text-orange-500" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Facebook className="w-4 h-4 text-orange-500" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Twitter className="w-4 h-4 text-orange-500" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Instagram className="w-4 h-4 text-orange-500" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-orange-500" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Music2 className="w-4 h-4 text-orange-500" />
            </div>
          </div>
        </div>
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold mb-2">iPhone 14</h1>
          <p className="text-sm text-gray-500 mb-4">
            6.1" - 6GB RAM - 128GB ROM - Midnight +Free (Cover + Screen
            Protector)
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-orange-500">KES 87,969</div>
            <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              20 in stock
            </div>
          </div>
          <div className="mb-4">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 font-bold"
              >
                −
              </button>
              <span className="mx-6 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(5, quantity + 1))}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 font-bold"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Maximum purchase 5</p>
          </div>
          <div className="space-y-3 mb-4">
            <button className="w-full py-3 border-2 border-orange-500 text-orange-500 rounded-full font-semibold flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add To Cart
            </button>
            <button className="w-full py-3 bg-orange-500 text-white rounded-full font-semibold">
              Buy Now
            </button>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-sm font-semibold pt-2">
                15GB + 500 Mins + Unlimited SMS at KES 1,000/Month
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-sm font-semibold pt-2">
                Country Wide Delivery
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-sm font-semibold pt-2">
                Warranty on all mobile phone
              </p>
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="flex gap-6 border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-3 text-sm font-semibold relative ${activeTab === 'specifications' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              Specifications
              {activeTab === 'specifications' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-sm font-semibold relative ${activeTab === 'description' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              Description
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 text-sm font-semibold relative ${activeTab === 'benefits' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              Benefits
              {activeTab === 'benefits' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </button>
          </div>
          <div className="pb-6">
            {activeTab === 'specifications' && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex border-b last:border-b-0">
                    <div className="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-sm text-gray-900 border-r">
                      {spec.label}
                    </div>
                    <div className="w-2/3 px-4 py-3 text-sm text-gray-700">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'description' && (
              <div className="text-gray-700 text-sm">
                Description content goes here...
              </div>
            )}
            {activeTab === 'benefits' && (
              <div className="text-gray-700 text-sm">
                Benefits content goes here...
              </div>
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
