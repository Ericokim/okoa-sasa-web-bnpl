import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 6.5H16"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6.5H2"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 17.5H18"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 17.5H2"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_450_10792)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6599 4.55417C17.8161 4.71044 17.9039 4.92237 17.9039 5.14334C17.9039 5.36431 17.8161 5.57623 17.6599 5.7325L8.29158 15.1017C8.20646 15.1868 8.10539 15.2544 7.99414 15.3005C7.8829 15.3466 7.76366 15.3703 7.64325 15.3703C7.52284 15.3703 7.4036 15.3466 7.29236 15.3005C7.18111 15.2544 7.08004 15.1868 6.99492 15.1017L2.33992 10.4467C2.26249 10.3692 2.20107 10.2773 2.15917 10.1762C2.11727 10.075 2.0957 9.96658 2.0957 9.85709C2.0957 9.74759 2.11727 9.63917 2.15917 9.53801C2.20107 9.43684 2.26249 9.34493 2.33992 9.2675C2.41734 9.19008 2.50926 9.12866 2.61042 9.08676C2.71158 9.04486 2.82 9.02329 2.9295 9.02329C3.039 9.02329 3.14742 9.04486 3.24858 9.08676C3.34974 9.12866 3.44166 9.19008 3.51908 9.2675L7.64408 13.3925L16.4808 4.55417C16.637 4.39794 16.8489 4.31018 17.0699 4.31018C17.2909 4.31018 17.5036 4.39794 17.6599 4.55417Z"
        fill="#F47120"
      />
    </g>
    <defs>
      <clipPath id="clip0_450_10792">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const brands = ['Apple', 'Samsung', 'Tecno', 'Infinix']
const deviceTypes = ['Phone', 'Laptop', 'Tablet']

export function FilterBar({ className = "" }) {
  const [selectedPaymentType, setSelectedPaymentType] = useState('basic')
  const [activeFilters, setActiveFilters] = useState({
    brand: ['Brand'],
    priceRange: ['Price Range'],
    deviceType: ['Device Type'],
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState({
    brand: [],
    priceRange: [0, 200000],
    deviceType: [],
  })

  const removeFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }))
  }

  const applyFilters = () => {
    const newFilters = {
      brand: tempFilters.brand.length > 0 ? tempFilters.brand : ['Brand'],
      priceRange:
        tempFilters.priceRange[0] !== 0 || tempFilters.priceRange[1] !== 200000
          ? [
              `KES ${tempFilters.priceRange[0].toLocaleString()} - KES ${tempFilters.priceRange[1].toLocaleString()}`,
            ]
          : ['Price Range'],
      deviceType:
        tempFilters.deviceType.length > 0
          ? tempFilters.deviceType
          : ['Device Type'],
    }
    setActiveFilters(newFilters)
    setIsFiltersOpen(false)
  }

  const resetFilters = () => {
    setTempFilters({
      brand: [],
      priceRange: [0, 200000],
      deviceType: [],
    })
    setActiveFilters({
      brand: ['Brand'],
      priceRange: ['Price Range'],
      deviceType: ['Device Type'],
    })
  }

  return (
    <div className={`flex flex-col gap-4 border-b border-[#E8ECF4] py-4 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8 ${className}`}>
      <div className="flex flex-wrap items-center gap-2 md:gap-[26px]">
        {activeFilters.brand.map((brand) => (
          <div
            key={brand}
            className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2"
          >
            <span className="text-sm font-normal capitalize text-black md:text-base">
              {brand}
            </span>
            <button
              onClick={() => removeFilter('brand', brand)}
              className="flex items-center justify-center"
            >
              <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
            </button>
          </div>
        ))}

        {activeFilters.priceRange.map((range) => (
          <div
            key={range}
            className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2"
          >
            <span className="text-sm font-normal capitalize text-black md:text-base">
              {range}
            </span>
            <button
              onClick={() => removeFilter('priceRange', range)}
              className="flex items-center justify-center"
            >
              <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
            </button>
          </div>
        ))}

        {activeFilters.deviceType.map((device) => (
          <div
            key={device}
            className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2"
          >
            <span className="text-sm font-normal capitalize text-black md:text-base">
              {device}
            </span>
            <button
              onClick={() => removeFilter('deviceType', device)}
              className="flex items-center justify-center"
            >
              <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
            </button>
          </div>
        ))}

        <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-sm font-normal capitalize text-black md:text-base">
                All Filters
              </span>
              <FilterIcon />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>All Filters</DialogTitle>
              <DialogDescription>
                Refine products by brand, price, or device type.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase text-brand-mid-gray">
                  Brand
                </h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center gap-3">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={tempFilters.brand.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTempFilters((prev) => ({
                              ...prev,
                              brand: [...prev.brand, brand],
                            }))
                          } else {
                            setTempFilters((prev) => ({
                              ...prev,
                              brand: prev.brand.filter((b) => b !== brand),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase text-brand-mid-gray">
                  Price Range
                </h4>
                <Slider
                  min={0}
                  max={200000}
                  step={1000}
                  value={tempFilters.priceRange}
                  onValueChange={(value) => {
                    setTempFilters((prev) => ({
                      ...prev,
                      priceRange: value,
                    }))
                  }}
                />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>
                    KES {tempFilters.priceRange[0].toLocaleString()}
                  </span>
                  <span>
                    KES {tempFilters.priceRange[1].toLocaleString()}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase text-brand-mid-gray">
                  Device Type
                </h4>
                <div className="space-y-2">
                  {deviceTypes.map((type) => (
                    <div key={type} className="flex items-center gap-3">
                      <Checkbox
                        id={`type-${type}`}
                        checked={tempFilters.deviceType.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTempFilters((prev) => ({
                              ...prev,
                              deviceType: [...prev.deviceType, type],
                            }))
                          } else {
                            setTempFilters((prev) => ({
                              ...prev,
                              deviceType: prev.deviceType.filter(
                                (t) => t !== type,
                              ),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end md:gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button className="rounded-3xl border border-[#F8971D] bg-gradient-to-b from-transparent to-transparent px-3 py-1.5 md:px-4 md:py-2">
              <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-sm font-normal capitalize text-transparent md:text-base">
                How it works
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[210px] rounded-2xl bg-white p-4 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedPaymentType('basic')}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedPaymentType === 'basic'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-medium leading-[140%] ${
                    selectedPaymentType === 'basic'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Basic Pay
                </span>
                {selectedPaymentType === 'basic' && <CheckIcon />}
              </button>
              <button
                onClick={() => setSelectedPaymentType('net')}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                  selectedPaymentType === 'net'
                    ? 'bg-[rgba(244,113,32,0.12)]'
                    : ''
                }`}
              >
                <span
                  className={`flex-1 text-left text-sm font-medium leading-[140%] ${
                    selectedPaymentType === 'net'
                      ? 'text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  Net Pay
                </span>
                {selectedPaymentType === 'net' && <CheckIcon />}
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <button className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-3 py-1.5 md:px-4 md:py-2">
          <span className="text-sm font-normal capitalize text-black md:text-base">
            My Loan Limit
          </span>
          <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <button className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-3 py-1.5 md:px-4 md:py-2">
          <span className="text-sm font-normal capitalize text-black md:text-base">
            Sort By
          </span>
          <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  )
}