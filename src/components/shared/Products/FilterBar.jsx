import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Link } from '@tanstack/react-router'

const SORT_OPTIONS = [
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'name-ascending', label: 'Name Ascending' },
  { value: 'name-descending', label: 'Name Descending' },
]

const DEFAULT_OPTIONS = {
  price: { min: 0, max: 200000 },
  brand: [],
  color: [],
  storage: [],
  camera: [],
  display: [],
  ram: [],
}

const FILTER_CATEGORIES = [
  'brand',
  'color',
  'storage',
  'camera',
  'display',
  'ram',
]

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
    <g clipPath="url(#clip0_filterbar_check)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6599 4.55417C17.8161 4.71044 17.9039 4.92237 17.9039 5.14334C17.9039 5.36431 17.8161 5.57623 17.6599 5.7325L8.29158 15.1017C8.20646 15.1868 8.10539 15.2544 7.99414 15.3005C7.8829 15.3466 7.76366 15.3703 7.64325 15.3703C7.52284 15.3703 7.4036 15.3466 7.29236 15.3005C7.18111 15.2544 7.08004 15.1868 6.99492 15.1017L2.33992 10.4467C2.26249 10.3692 2.20107 10.2773 2.15917 10.1762C2.11727 10.075 2.0957 9.96658 2.0957 9.85709C2.0957 9.74759 2.11727 9.63917 2.15917 9.53801C2.20107 9.43684 2.26249 9.34493 2.33992 9.2675C2.41734 9.19008 2.50926 9.12866 2.61042 9.08676C2.71158 9.04486 2.82 9.02329 2.9295 9.02329C3.039 9.02329 3.14742 9.04486 3.24858 9.08676C3.34974 9.12866 3.44166 9.19008 3.51908 9.2675L7.64408 13.3925L16.4808 4.55417C16.637 4.39794 16.8489 4.31018 17.0699 4.31018C17.2909 4.31018 17.5036 4.39794 17.6599 4.55417Z"
        fill="#F47120"
      />
    </g>
    <defs>
      <clipPath id="clip0_filterbar_check">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const ArrowDownIcon = ({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.2802 10.0333L8.93355 5.68667C8.42021 5.17333 7.58021 5.17333 7.06688 5.68667L2.72021 10.0333"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckedCheckboxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4915 1.66666H6.50817C3.47484 1.66666 1.6665 3.475 1.6665 6.50833V13.4833C1.6665 16.525 3.47484 18.3333 6.50817 18.3333H13.4832C16.5165 18.3333 18.3248 16.525 18.3248 13.4917V6.50833C18.3332 3.475 16.5248 1.66666 13.4915 1.66666ZM13.9832 8.08333L9.25817 12.8083C9.1415 12.925 8.98317 12.9917 8.8165 12.9917C8.64984 12.9917 8.4915 12.925 8.37484 12.8083L6.0165 10.45C5.77484 10.2083 5.77484 9.80833 6.0165 9.56666C6.25817 9.325 6.65817 9.325 6.89984 9.56666L8.8165 11.4833L13.0998 7.2C13.3415 6.95833 13.7415 6.95833 13.9832 7.2C14.2248 7.44166 14.2248 7.83333 13.9832 8.08333Z"
      fill="#1C8546"
    />
  </svg>
)

const UncheckedCheckboxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.4998 18.9583H7.49984C2.97484 18.9583 1.0415 17.025 1.0415 12.5V7.5C1.0415 2.975 2.97484 1.04166 7.49984 1.04166H12.4998C17.0248 1.04166 18.9582 2.975 18.9582 7.5V12.5C18.9582 17.025 17.0248 18.9583 12.4998 18.9583ZM7.49984 2.29166C3.65817 2.29166 2.2915 3.65833 2.2915 7.5V12.5C2.2915 16.3417 3.65817 17.7083 7.49984 17.7083H12.4998C16.3415 17.7083 17.7082 16.3417 17.7082 12.5V7.5C17.7082 3.65833 16.3415 2.29166 12.4998 2.29166H7.49984Z"
      fill="#A0A4AC"
    />
  </svg>
)

const FilterSection = ({ title, children, isOpen, onToggle }) => (
  <div className="flex flex-col items-start gap-3 self-stretch">
    <button
      onClick={onToggle}
      className="flex items-center justify-between self-stretch"
    >
      <span className="font-['Public_Sans'] text-sm font-medium leading-[140%] text-black">
        {title}
      </span>
      <ArrowDownIcon
        className={`transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
      />
    </button>
    {isOpen && children}
  </div>
)

const FilterCheckboxItem = ({ label, checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className="flex items-center justify-center gap-2 self-stretch rounded-lg px-2 py-1"
  >
    {checked ? <CheckedCheckboxIcon /> : <UncheckedCheckboxIcon />}
    <span className="flex-1 text-left font-['Public_Sans'] text-sm font-medium leading-[140%] text-[#252525]">
      {label}
    </span>
  </button>
)

const SelectedFilterChip = ({ label, onRemove }) => (
  <div className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2">
    <span className="text-sm font-normal capitalize text-black md:text-base">
      {label}
    </span>
    <button
      onClick={onRemove}
      className="flex items-center justify-center"
      aria-label={`Remove ${label}`}
    >
      <X className="h-5 w-5 text-[#09244B] md:h-6 md:w-6" />
    </button>
  </div>
)

const uniqueList = (items = []) =>
  Array.from(new Set(items.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  )

const buildToggleState = (items) =>
  items.reduce((acc, item) => ({ ...acc, [item]: false }), {})

const buildToggleStateFromSelection = (items, selected = []) =>
  items.reduce((acc, item) => ({ ...acc, [item]: selected.includes(item) }), {})

const areFilterStatesEqual = (a, b, categories) => {
  if (!a || !b) return false
  if (
    a.priceRange[0] !== b.priceRange[0] ||
    a.priceRange[1] !== b.priceRange[1]
  ) {
    return false
  }
  if (a.priceMin !== b.priceMin || a.priceMax !== b.priceMax) {
    return false
  }
  return categories.every((category) => {
    const aEntries = a[category] ?? {}
    const bEntries = b[category] ?? {}
    const keys = new Set([...Object.keys(aEntries), ...Object.keys(bEntries)])
    for (const key of keys) {
      if (!!aEntries[key] !== !!bEntries[key]) {
        return false
      }
    }
    return true
  })
}

const buildDefaultFilters = (options) => ({
  priceRange: [options.price.min, options.price.max],
  priceMin: `${options.price.min}`,
  priceMax: `${options.price.max}`,
  brand: buildToggleState(options.brand),
  color: buildToggleState(options.color),
  storage: buildToggleState(options.storage),
  camera: buildToggleState(options.camera),
  display: buildToggleState(options.display),
  ram: buildToggleState(options.ram),
})

export function FilterBar({
  className = '',
  onLoanCalculatorOpen,
  onFiltersChange,
  onSortChange,
  initialSort = 'price-low-high',
  options = DEFAULT_OPTIONS,
  selectedFilters,
  selectedSort,
}) {
  const normalizedOptions = useMemo(() => {
    const priceMin = options?.price?.min ?? DEFAULT_OPTIONS.price.min
    const priceMaxRaw = options?.price?.max ?? DEFAULT_OPTIONS.price.max
    const priceMax = priceMaxRaw < priceMin ? priceMin : priceMaxRaw

    return {
      price: { min: priceMin, max: priceMax },
      brand: uniqueList(options?.brand ?? DEFAULT_OPTIONS.brand),
      color: uniqueList(options?.color ?? DEFAULT_OPTIONS.color),
      storage: uniqueList(options?.storage ?? DEFAULT_OPTIONS.storage),
      camera: uniqueList(options?.camera ?? DEFAULT_OPTIONS.camera),
      display: uniqueList(options?.display ?? DEFAULT_OPTIONS.display),
      ram: uniqueList(options?.ram ?? DEFAULT_OPTIONS.ram),
    }
  }, [options])

  const defaultFilters = useMemo(
    () => buildDefaultFilters(normalizedOptions),
    [normalizedOptions],
  )

  const [filters, setFilters] = useState(defaultFilters)
  const [selectedPaymentType, setSelectedPaymentType] = useState('basic')
  const validInitialSort = SORT_OPTIONS.some(
    (item) => item.value === initialSort,
  )
    ? initialSort
    : SORT_OPTIONS[0].value
  const [sortSelection, setSortSelection] = useState(validInitialSort)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    storage: true,
    camera: true,
    display: true,
    ram: true,
    brand: true,
  })

  useEffect(() => {
    const priceMinValue =
      selectedFilters?.priceRange?.[0] ?? normalizedOptions.price.min
    const priceMaxValue =
      selectedFilters?.priceRange?.[1] ?? normalizedOptions.price.max
    const clampedMin = Math.max(
      normalizedOptions.price.min,
      Math.min(priceMinValue, normalizedOptions.price.max),
    )
    const clampedMax = Math.max(
      clampedMin,
      Math.min(priceMaxValue, normalizedOptions.price.max),
    )

    const nextFilters = {
      priceRange: [clampedMin, clampedMax],
      priceMin: `${clampedMin}`,
      priceMax: `${clampedMax}`,
      brand: buildToggleStateFromSelection(
        normalizedOptions.brand,
        selectedFilters?.brand ?? [],
      ),
      color: buildToggleStateFromSelection(
        normalizedOptions.color,
        selectedFilters?.color ?? [],
      ),
      storage: buildToggleStateFromSelection(
        normalizedOptions.storage,
        selectedFilters?.storage ?? [],
      ),
      camera: buildToggleStateFromSelection(
        normalizedOptions.camera,
        selectedFilters?.camera ?? [],
      ),
      display: buildToggleStateFromSelection(
        normalizedOptions.display,
        selectedFilters?.display ?? [],
      ),
      ram: buildToggleStateFromSelection(
        normalizedOptions.ram,
        selectedFilters?.ram ?? [],
      ),
    }

    setFilters((prev) =>
      areFilterStatesEqual(prev, nextFilters, FILTER_CATEGORIES)
        ? prev
        : nextFilters,
    )
  }, [defaultFilters, selectedFilters, normalizedOptions])

  useEffect(() => {
    const nextSort =
      selectedSort && SORT_OPTIONS.some((item) => item.value === selectedSort)
        ? selectedSort
        : validInitialSort
    setSortSelection(nextSort)
  }, [validInitialSort, selectedSort])

  useEffect(() => {
    if (!onFiltersChange) return

    const toSelected = (category) =>
      Object.entries(filters[category] ?? {})
        .filter(([, isSelected]) => isSelected)
        .map(([value]) => value)

    onFiltersChange({
      priceRange: filters.priceRange,
      brand: toSelected('brand'),
      color: toSelected('color'),
      storage: toSelected('storage'),
      camera: toSelected('camera'),
      display: toSelected('display'),
      ram: toSelected('ram'),
    })
  }, [filters, onFiltersChange])

  useEffect(() => {
    if (onSortChange) {
      onSortChange(sortSelection)
    }
  }, [sortSelection, onSortChange])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceRangeChange = (value) => {
    const [minValue, maxValue] = value
    setFilters((prev) => ({
      ...prev,
      priceRange: [minValue, maxValue],
      priceMin: `${minValue}`,
      priceMax: `${maxValue}`,
    }))
  }

  const handlePriceInputChange = (field, value) => {
    const numericValue = value.replace(/[^\d]/g, '')
    setFilters((prev) => ({
      ...prev,
      [field]: numericValue,
    }))
  }

  const handleApplyPrice = () => {
    const minBound = normalizedOptions.price.min
    const maxBound = normalizedOptions.price.max

    let minValue = parseInt(filters.priceMin || '', 10)
    let maxValue = parseInt(filters.priceMax || '', 10)

    if (Number.isNaN(minValue)) minValue = filters.priceRange[0]
    if (Number.isNaN(maxValue)) maxValue = filters.priceRange[1]

    minValue = Math.max(minBound, Math.min(minValue, maxBound))
    maxValue = Math.max(minBound, Math.min(maxValue, maxBound))

    if (minValue > maxValue) {
      ;[minValue, maxValue] = [maxValue, minValue]
    }

    setFilters((prev) => ({
      ...prev,
      priceRange: [minValue, maxValue],
      priceMin: `${minValue}`,
      priceMax: `${maxValue}`,
    }))
  }

  const handleCheckboxToggle = (category, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: checked,
      },
    }))
  }

  const handleClearAll = () => {
    setFilters(defaultFilters)
  }

  const activeFilterChips = useMemo(() => {
    const chips = []
    const [minPrice, maxPrice] = filters.priceRange

    if (
      minPrice > normalizedOptions.price.min ||
      maxPrice < normalizedOptions.price.max
    ) {
      chips.push({
        category: 'price',
        label: `KES ${minPrice.toLocaleString()} - KES ${maxPrice.toLocaleString()}`,
      })
    }

    ;['brand', 'color', 'storage', 'camera', 'display', 'ram'].forEach(
      (category) => {
        Object.entries(filters[category] ?? {}).forEach(
          ([value, isSelected]) => {
            if (isSelected) {
              chips.push({
                category,
                value,
                label: value,
              })
            }
          },
        )
      },
    )

    return chips
  }, [filters, normalizedOptions.price.max, normalizedOptions.price.min])

  const handleRemoveChip = (chip) => {
    if (chip.category === 'price') {
      setFilters((prev) => ({
        ...prev,
        priceRange: [normalizedOptions.price.min, normalizedOptions.price.max],
        priceMin: `${normalizedOptions.price.min}`,
        priceMax: `${normalizedOptions.price.max}`,
      }))
      return
    }

    handleCheckboxToggle(chip.category, chip.value, false)
  }

  return (
    <div
      className={`flex flex-col gap-4 border-b border-[#E8ECF4] py-4 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2 md:gap-[26px]">
        {activeFilterChips.map((chip) => (
          <SelectedFilterChip
            key={`${chip.category}-${chip.label}`}
            label={chip.label}
            onRemove={() => handleRemoveChip(chip)}
          />
        ))}

        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-3xl bg-[#F9FAFB] px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-sm font-normal capitalize text-black md:text-base">
                All Filters
              </span>
              <FilterIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[300px] rounded-2xl border-none bg-white p-0 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <span className="font-['Public_Sans'] text-base font-medium leading-[140%] text-black">
                  Filters
                </span>
                <button
                  onClick={handleClearAll}
                  className="font-['Public_Sans'] text-xs font-medium leading-[140%] text-[#F25E5E]"
                >
                  Clear
                </button>
              </div>
              <ScrollArea className="h-[60vh] w-full">
                <div className="flex flex-col gap-4 px-4 pb-4">
                  <FilterSection
                    title="Price"
                    isOpen={openSections.price}
                    onToggle={() => toggleSection('price')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      <Slider
                        value={filters.priceRange}
                        min={normalizedOptions.price.min}
                        max={normalizedOptions.price.max}
                        step={1000}
                        onValueChange={handlePriceRangeChange}
                        className="w-full [&_[data-slot=slider-track]]:h-3.5 [&_[data-slot=slider-track]]:rounded-full [&_[data-slot=slider-track]]:border [&_[data-slot=slider-track]]:border-black/[0.06] [&_[data-slot=slider-track]]:bg-[#F5F5F5] [&_[data-slot=slider-range]]:bg-gradient-to-b [&_[data-slot=slider-range]]:from-[#F8971D] [&_[data-slot=slider-range]]:to-[#EE3124] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border [&_[data-slot=slider-thumb]]:border-black/15 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_6px_14px_0_rgba(0,0,0,0.15)]"
                      />

                      <div className="flex items-start gap-2 self-stretch">
                        <div className="flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-[#E8ECF4] px-3 py-1">
                          <input
                            type="text"
                            value={filters.priceMin}
                            onChange={(event) =>
                              handlePriceInputChange(
                                'priceMin',
                                event.target.value,
                              )
                            }
                            className="w-full font-['Public_Sans'] text-sm font-normal leading-[140%] text-[#A0A4AC] outline-none"
                            placeholder="Min"
                          />
                        </div>
                        <div className="flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-[#E8ECF4] px-3 py-1">
                          <input
                            type="text"
                            value={filters.priceMax}
                            onChange={(event) =>
                              handlePriceInputChange(
                                'priceMax',
                                event.target.value,
                              )
                            }
                            className="w-full font-['Public_Sans'] text-sm font-normal leading-[140%] text-[#A0A4AC] outline-none"
                            placeholder="Max"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleApplyPrice}
                        className="flex items-center justify-center gap-2 self-stretch rounded-3xl bg-[#F47120] px-4 py-2"
                      >
                        <span className="font-['Public_Sans'] text-xs font-medium leading-[140%] text-white">
                          Apply
                        </span>
                      </button>
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>

                  <FilterSection
                    title="Color"
                    isOpen={openSections.color}
                    onToggle={() => toggleSection('color')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      {normalizedOptions.color.map((color) => (
                        <FilterCheckboxItem
                          key={color}
                          label={color}
                          checked={filters.color[color]}
                          onChange={(checked) =>
                            handleCheckboxToggle('color', color, checked)
                          }
                        />
                      ))}
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>

                  <FilterSection
                    title="Storage Capacity"
                    isOpen={openSections.storage}
                    onToggle={() => toggleSection('storage')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      {normalizedOptions.storage.map((storage) => (
                        <FilterCheckboxItem
                          key={storage}
                          label={storage}
                          checked={filters.storage[storage]}
                          onChange={(checked) =>
                            handleCheckboxToggle('storage', storage, checked)
                          }
                        />
                      ))}
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>

                  <FilterSection
                    title="Camera Megapixel"
                    isOpen={openSections.camera}
                    onToggle={() => toggleSection('camera')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      {normalizedOptions.camera.map((camera) => (
                        <FilterCheckboxItem
                          key={camera}
                          label={camera}
                          checked={filters.camera[camera]}
                          onChange={(checked) =>
                            handleCheckboxToggle('camera', camera, checked)
                          }
                        />
                      ))}
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>

                  <FilterSection
                    title="Display Size"
                    isOpen={openSections.display}
                    onToggle={() => toggleSection('display')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      {normalizedOptions.display.map((display) => (
                        <FilterCheckboxItem
                          key={display}
                          label={display}
                          checked={filters.display[display]}
                          onChange={(checked) =>
                            handleCheckboxToggle('display', display, checked)
                          }
                        />
                      ))}
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>

                  <FilterSection
                    title="RAM"
                    isOpen={openSections.ram}
                    onToggle={() => toggleSection('ram')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      {normalizedOptions.ram.map((ram) => (
                        <FilterCheckboxItem
                          key={ram}
                          label={ram}
                          checked={filters.ram[ram]}
                          onChange={(checked) =>
                            handleCheckboxToggle('ram', ram, checked)
                          }
                        />
                      ))}
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>

                  <FilterSection
                    title="Brand"
                    isOpen={openSections.brand}
                    onToggle={() => toggleSection('brand')}
                  >
                    <div className="flex flex-col items-start gap-3 self-stretch">
                      {normalizedOptions.brand.map((brand) => (
                        <FilterCheckboxItem
                          key={brand}
                          label={brand}
                          checked={filters.brand[brand]}
                          onChange={(checked) =>
                            handleCheckboxToggle('brand', brand, checked)
                          }
                        />
                      ))}
                      <div className="h-px self-stretch bg-[#E8ECF4]" />
                    </div>
                  </FilterSection>
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end md:gap-3">
        <Link
          to="/FAQs"
          className="rounded-3xl border border-[#F8971D] bg-gradient-to-b from-transparent to-transparent px-3 py-1.5 transition-opacity hover:opacity-90 md:px-4 md:py-2"
        >
          <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-sm font-normal capitalize text-transparent md:text-base">
            How it works
          </span>
        </Link>

        <button
          onClick={() => {
            onLoanCalculatorOpen?.()
          }}
          className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-3 py-1.5 md:px-4 md:py-2"
        >
          <span className="text-sm font-normal capitalize text-black md:text-base">
            My Loan Limit
          </span>
        </button>

        {/* <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-sm font-normal capitalize text-black md:text-base">
                My Loan Limit
              </span>
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[210px] rounded-2xl bg-white p-4 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            <div className="flex flex-col gap-2">
              {[
                { value: 'basic', label: 'Basic Pay' },
                { value: 'net', label: 'Net Pay' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onLoanCalculatorOpen?.()
                    setSelectedPaymentType(option.value)
                  }}
                  className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 ${
                    selectedPaymentType === option.value
                      ? 'bg-[rgba(244,113,32,0.12)]'
                      : ''
                  }`}
                >
                  <span
                    className={`flex-1 text-left text-sm font-medium leading-[140%] ${
                      selectedPaymentType === option.value
                        ? 'text-[#F47120]'
                        : 'text-[#252525]'
                    }`}
                  >
                    {option.label}
                  </span>
                  {selectedPaymentType === option.value && <CheckIcon />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-3xl border border-[#E8ECF4] px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-sm font-normal capitalize text-black md:text-base">
                Sort By
              </span>
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[210px] border-none bg-white p-2 shadow-[0_4px_24px_0_rgba(37,37,37,0.08)]"
          >
            {SORT_OPTIONS.map((option) => {
              const isActive = sortSelection === option.value
              return (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => setSortSelection(option.value)}
                  className={`flex items-center justify-between gap-2 rounded-lg px-3 py-3 text-sm font-normal leading-[140%] ${
                    isActive
                      ? 'bg-[rgba(244,113,32,0.12)] text-[#F47120]'
                      : 'text-[#252525]'
                  }`}
                >
                  <span>{option.label}</span>
                  {isActive && <CheckIcon />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
