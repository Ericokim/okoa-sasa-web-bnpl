import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { FilterBar } from '@/components/shared/FilterBar'

const products = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: 'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover+...',
    price: 87696,
    originalPrice: 87696,
    image: '/phone.png',
    inCart: index === 1 || index === 3 || index === 5 || index === 7,
  }))

function IndexPage() {
  return (
    <div className="mx-auto">
      <FilterBar />

      <div className="py-6 md:py-8 lg:py-[38px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-[30px]">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="flex flex-col items-start gap-4"
            >
              <div className="relative flex h-[240px] w-full items-center justify-center self-stretch rounded-2xl bg-[#F9FAFB] md:h-[280px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[180px] w-[180px] md:h-[224px] md:w-[224px]"
                />
                {product.inCart && (
                  <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#F8971D] to-[#EE3124] md:right-4 md:top-4 md:h-12 md:w-12">
                    <ShoppingCart
                      className="h-5 w-5 text-white md:h-6 md:w-6"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start gap-2 self-stretch">
                <p className="line-clamp-2 self-stretch text-sm font-medium leading-[140%] text-black md:text-base">
                  {product.name}
                </p>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-sm font-semibold capitalize leading-[140%] text-black md:text-base">
                    kES {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium leading-[140%] text-[#A0A4AC] line-through">
                    KES {product.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 md:mt-10 md:gap-4">
          <button
            disabled
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E8ECF4] bg-white opacity-30"
          >
            <ChevronLeft className="h-5 w-5 text-[#252525] md:h-6 md:w-6" />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#F8971D] bg-gradient-to-b from-[rgba(248,151,29,0.12)] to-[rgba(238,49,36,0.12)]">
            <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-center text-base font-semibold leading-normal text-transparent">
              1
            </span>
          </button>

          {[2, 3].map((page) => (
            <button
              key={page}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E8ECF4] bg-white"
            >
              <span className="text-center text-base font-semibold leading-normal text-[#252525]">
                {page}
              </span>
            </button>
          ))}

          <span className="hidden text-center text-base font-semibold leading-normal text-[#252525] md:inline">
            ...
          </span>

          <button className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-[#E8ECF4] bg-white md:flex">
            <span className="text-center text-base font-semibold leading-normal text-[#252525]">
              7
            </span>
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E8ECF4] bg-white">
            <ChevronRight className="h-5 w-5 text-[#252525] md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
