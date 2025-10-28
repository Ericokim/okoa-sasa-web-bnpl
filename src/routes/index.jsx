import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { ChevronDown, ShoppingCart, SlidersHorizontal, X } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB - Titanium',
    brand: 'Apple',
    deviceType: 'Phone',
    price: 184999,
    originalPrice: 199999,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra 12GB/256GB',
    brand: 'Samsung',
    deviceType: 'Phone',
    price: 169999,
    originalPrice: 179999,
    image: '/placeholder-phone.jpg',
    inCart: true,
  },
  {
    id: 3,
    name: 'Tecno Spark 20 8GB/256GB',
    brand: 'Tecno',
    deviceType: 'Phone',
    price: 23999,
    originalPrice: 25999,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
  {
    id: 4,
    name: 'Infinix Zero 30 5G 12GB/256GB',
    brand: 'Infinix',
    deviceType: 'Phone',
    price: 42999,
    originalPrice: 45999,
    image: '/placeholder-phone.jpg',
    inCart: true,
  },
  {
    id: 5,
    name: 'Apple MacBook Air 13" M2 8GB/256GB',
    brand: 'Apple',
    deviceType: 'Laptop',
    price: 148999,
    originalPrice: 159999,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
  {
    id: 6,
    name: 'HP Pavilion 15 16GB/512GB',
    brand: 'HP',
    deviceType: 'Laptop',
    price: 109999,
    originalPrice: 119999,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
  {
    id: 7,
    name: 'Samsung Galaxy Tab S9 8GB/256GB',
    brand: 'Samsung',
    deviceType: 'Tablet',
    price: 98999,
    originalPrice: 104999,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
  {
    id: 8,
    name: 'Lenovo Tab M10 Plus 4GB/128GB',
    brand: 'Lenovo',
    deviceType: 'Tablet',
    price: 44999,
    originalPrice: 47999,
    image: '/placeholder-phone.jpg',
    inCart: false,
  },
]

const brandOptions = Array.from(new Set(products.map((product) => product.brand))).sort()
const deviceTypeOptions = Array.from(new Set(products.map((product) => product.deviceType))).sort()

const priceBounds = products.reduce(
  (acc, product) => ({
    min: Math.min(acc.min, product.price),
    max: Math.max(acc.max, product.price),
  }),
  { min: Number.POSITIVE_INFINITY, max: 0 },
)

const normalizedMin = Number.isFinite(priceBounds.min) ? priceBounds.min : 0
const normalizedMax = priceBounds.max > 0 ? priceBounds.max : normalizedMin

const sliderMin = Math.max(0, Math.floor(normalizedMin / 1000) * 1000)
const sliderMaxBase = Math.ceil(normalizedMax / 1000) * 1000
const sliderMax = sliderMaxBase < sliderMin ? sliderMin : sliderMaxBase

const defaultPriceRange = [sliderMin, sliderMax]

const baseFilterBadges = [
  { id: 'brand', label: 'Brand', removable: false },
  { id: 'price', label: 'Price Range', removable: false },
  { id: 'device', label: 'Device Type', removable: false },
]

const formatKes = (value) => `KES ${value.toLocaleString('en-KE')}`

const createDefaultFilters = () => ({
  brand: [],
  priceRange: [...defaultPriceRange],
  deviceType: [],
})

function IndexPage() {
  const [activeFilters, setActiveFilters] = useState(createDefaultFilters)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isPriceDefault =
    activeFilters.priceRange[0] === defaultPriceRange[0] &&
    activeFilters.priceRange[1] === defaultPriceRange[1]

  const activeFilterChips = useMemo(() => {
    const chips = []

    activeFilters.brand.forEach((brand) => {
      chips.push({
        id: `brand-${brand}`,
        label: brand,
        removable: true,
        type: 'brand',
        value: brand,
      })
    })

    if (!isPriceDefault) {
      chips.push({
        id: 'priceRange',
        label: `${formatKes(activeFilters.priceRange[0])} - ${formatKes(activeFilters.priceRange[1])}`,
        removable: true,
        type: 'priceRange',
        value: [...activeFilters.priceRange],
      })
    }

    activeFilters.deviceType.forEach((device) => {
      chips.push({
        id: `device-${device}`,
        label: device,
        removable: true,
        type: 'deviceType',
        value: device,
      })
    })

    return chips
  }, [activeFilters, isPriceDefault])

  const hasActiveFilters = activeFilterChips.length > 0

  const openFilters = () => setIsDialogOpen(true)

  const handleChipKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openFilters()
    }
  }

  const handleRemoveChip = (chip) => {
    setActiveFilters((prev) => {
      if (chip.type === 'brand') {
        return {
          ...prev,
          brand: prev.brand.filter((item) => item !== chip.value),
        }
      }

      if (chip.type === 'deviceType') {
        return {
          ...prev,
          deviceType: prev.deviceType.filter((item) => item !== chip.value),
        }
      }

      if (chip.type === 'priceRange') {
        return {
          ...prev,
          priceRange: [...defaultPriceRange],
        }
      }

      return prev
    })
  }

  const handleResetFilters = () => {
    setActiveFilters(createDefaultFilters())
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchBrand =
        activeFilters.brand.length === 0 || activeFilters.brand.includes(product.brand)
      const matchPrice =
        product.price >= activeFilters.priceRange[0] &&
        product.price <= activeFilters.priceRange[1]
      const matchDevice =
        activeFilters.deviceType.length === 0 || activeFilters.deviceType.includes(product.deviceType)

      return matchBrand && matchPrice && matchDevice
    })
  }, [activeFilters])

  const noResults = filteredProducts.length === 0

  const toControlId = (prefix, value) =>
    `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <div className="space-y-10">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-6">
            {(hasActiveFilters ? activeFilterChips : baseFilterBadges).map((chip) => (
              <Badge
                key={chip.id}
                asChild
                variant="secondary"
                className="bg-brand-bg-2 text-brand-black border-none rounded-3xl px-4 py-2 text-base font-normal"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={openFilters}
                  onKeyDown={handleChipKeyDown}
                  className="inline-flex items-center gap-2 focus:outline-none"
                >
                  <span>{chip.label}</span>
                  {chip.removable && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleRemoveChip(chip)
                      }}
                      className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-bg-1 text-brand-black/60 transition-colors hover:bg-brand-primary-start/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary-start"
                      aria-label={`Remove ${chip.label}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </Badge>
            ))}

            <DialogTrigger asChild>
              <Badge
                asChild
                variant="outline"
                className="bg-brand-bg-2 text-brand-black border-none rounded-3xl px-4 py-2 text-base font-normal cursor-pointer"
              >
                <button type="button" className="inline-flex items-center gap-2">
                  All Filters
                  <SlidersHorizontal className="ml-2 h-4 w-4" />
                </button>
              </Badge>
            </DialogTrigger>
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

        <DialogContent className="h-[90vh] max-w-[calc(100%-1.5rem)] overflow-y-auto rounded-[32px] border border-brand-stroke/40 bg-white p-6 sm:h-auto sm:max-w-xl sm:p-8">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-lg font-semibold text-brand-black">All Filters</DialogTitle>
            <DialogDescription className="text-sm text-brand-mid-gray">
              Refine products by brand, price, or device type to match what you need.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-4">
            <section className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-mid-gray">Brand</h4>
              <div className="space-y-2">
                {brandOptions.map((brand) => {
                  const id = toControlId('brand', brand)
                  const checked = activeFilters.brand.includes(brand)

                  return (
                    <div key={brand} className="flex items-center gap-3">
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={(nextChecked) => {
                          const isChecked = Boolean(nextChecked)
                          setActiveFilters((prev) => ({
                            ...prev,
                            brand: isChecked
                              ? Array.from(new Set([...prev.brand, brand]))
                              : prev.brand.filter((item) => item !== brand),
                          }))
                        }}
                      />
                      <Label htmlFor={id} className="text-sm font-medium text-brand-black">
                        {brand}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-mid-gray">Price Range</h4>
              <Slider
                min={sliderMin}
                max={sliderMax}
                step={1000}
                value={activeFilters.priceRange}
                onValueChange={(value) => {
                  if (!Array.isArray(value)) return
                  setActiveFilters((prev) => ({
                    ...prev,
                    priceRange: value,
                  }))
                }}
              />
              <div className="flex items-center justify-between text-sm font-medium text-brand-black">
                <span>{formatKes(activeFilters.priceRange[0])}</span>
                <span>{formatKes(activeFilters.priceRange[1])}</span>
              </div>
            </section>

            <section className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-mid-gray">
                Device Type
              </h4>
              <div className="space-y-2">
                {deviceTypeOptions.map((device) => {
                  const id = toControlId('device', device)
                  const checked = activeFilters.deviceType.includes(device)

                  return (
                    <div key={device} className="flex items-center gap-3">
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={(nextChecked) => {
                          const isChecked = Boolean(nextChecked)
                          setActiveFilters((prev) => ({
                            ...prev,
                            deviceType: isChecked
                              ? Array.from(new Set([...prev.deviceType, device]))
                              : prev.deviceType.filter((item) => item !== device),
                          }))
                        }}
                      />
                      <Label htmlFor={id} className="text-sm font-medium text-brand-black">
                        {device}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          <DialogFooter className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:justify-between sm:pt-4">
            <Button variant="outline" className="sm:w-auto" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button className="sm:w-auto" onClick={() => setIsDialogOpen(false)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {noResults ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-stroke/50 bg-brand-bg-2/30 px-6 py-16 text-center">
            <p className="text-base font-medium text-brand-black">No products match your filters yet.</p>
            <p className="mt-2 text-sm text-brand-mid-gray">
              Try adjusting the filters or reset them to explore more devices.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-3xl border-brand-primary-start text-brand-primary-start"
              onClick={() => {
                handleResetFilters()
                setIsDialogOpen(false)
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="hover:brand-primary-end"
            >
              <Card className="border-none shadow-none">
                <CardContent className="space-y-4 p-0">
                  <div className="relative flex h-70 items-center justify-center overflow-hidden rounded-2xl bg-brand-bg-2">
                    <div className="flex h-56 w-56 items-center justify-center rounded-xl bg-gray-200">
                      <span className="text-sm text-gray-400">Product Image</span>
                    </div>

                    {product.inCart && (
                      <div className="absolute right-4 top-4">
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

                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-relaxed text-brand-black line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-brand-black">
                        {formatKes(product.price)}
                      </span>
                      <span className="text-sm font-medium text-brand-mid-gray line-through">
                        {formatKes(product.originalPrice)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-4 py-8">
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
          className="h-10 w-10 rounded-2xl border border-brand-primary-start bg-gradient-to-b from-brand-primary-start/12 to-brand-primary-end/12 text-brand-primary-start"
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

        <span className="font-semibold text-brand-black">...</span>

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
