import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, X, ChevronDown, SlidersHorizontal } from 'lucide-react'

// Mock product data to match Figma design
const products = [
  {
    id: 1,
    name: 'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover+...)',
    price: 87696,
    originalPrice: 97696,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
  {
    id: 2,
    name: 'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover+...)',
    price: 87696,
    originalPrice: 97696,
    image: '/placeholder-phone.jpg',
    inCart: true,
  },
  {
    id: 3,
    name: 'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover+...)',
    price: 87696,
    originalPrice: 97696,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
  {
    id: 4,
    name: 'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover+...)',
    price: 87696,
    originalPrice: 97696,
    image: '/placeholder-phone.jpg',
    inCart: true,
  },
]

const filters = [
  { label: 'Brand', removable: true },
  { label: 'Price Range', removable: true },
  { label: 'Device Type', removable: true },
]

function IndexPage() {
  return (
    <div className="space-y-10">
      {/* Filter Bar */}
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center gap-6">
          {filters.map((filter, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-brand-bg-2 text-brand-black border-none rounded-3xl px-4 py-2 text-base font-normal"
            >
              {filter.label}
              {filter.removable && (
                <X className="ml-2 h-4 w-4 cursor-pointer" />
              )}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="bg-brand-bg-2 text-brand-black border-none rounded-3xl px-4 py-2 text-base font-normal cursor-pointer"
          >
            All Filters
            <SlidersHorizontal className="ml-2 h-4 w-4" />
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-brand-primary-start text-brand-primary-start rounded-3xl px-4 py-2 bg-gradient-to-b from-transparent to-transparent hover:from-brand-primary-start/10 hover:to-brand-primary-end/10"
          >
            How it works
          </Button>
          <Button
            variant="outline"
            className="border-brand-stroke text-brand-black rounded-3xl px-4 py-2"
          >
            My Loan Limit
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-brand-stroke text-brand-black rounded-3xl px-4 py-2"
          >
            Sort By
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...products, ...products].map((product, index) => (
          <Link
            key={`${product.id}-${index}`}
            to={`/products/${product.id}`}
            className="hover:brand-primary-end"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-0 space-y-4">
                {/* Product Image */}
                <div className="relative bg-brand-bg-2 rounded-2xl h-70 flex items-center justify-center overflow-hidden">
                  <div className="w-56 h-56 bg-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Phone Image</span>
                  </div>

                  {/* Add to Cart Button */}
                  {product.inCart && (
                    <div className="absolute top-4 right-4">
                      <Button
                        size="icon"
                        variant="gradient"
                        className="h-12 w-12 rounded-full shadow-lg"
                      >
                        <ShoppingCart className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-brand-black leading-relaxed line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold text-brand-black">
                      KES {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-brand-mid-gray line-through">
                      KES {product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 py-8">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-2xl border-brand-stroke opacity-30"
          disabled
        >
          <ChevronDown className="h-4 w-4 rotate-90" />
        </Button>

        <Button
          size="icon"
          className="h-10 w-10 rounded-2xl bg-gradient-to-b from-brand-primary-start/12 to-brand-primary-end/12 border border-brand-primary-start text-brand-primary-start"
        >
          1
        </Button>

        {[2, 3].map((page) => (
          <Button
            key={page}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-2xl border-brand-stroke text-brand-black"
          >
            {page}
          </Button>
        ))}

        <span className="text-brand-black font-semibold">...</span>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-2xl border-brand-stroke text-brand-black"
        >
          7
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-2xl border-brand-stroke"
        >
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
