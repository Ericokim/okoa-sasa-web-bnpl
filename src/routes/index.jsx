import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useState, useEffect, useMemo } from 'react'
import { FilterBar } from '@/components/shared/Products/FilterBar'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { LoanLimitCalculator } from '@/components/shared/LoanLimitCalculator'
import { ProductCard } from '@/components/shared/Products/ProductCard'
import { PaginationComponent } from '@/components/shared/PaginationComponent'
import NotFound from '@/container/NotFound'

const PRODUCT_CATALOG = [
  {
    id: 1,
    name: 'iPhone 14 - 6.1" - 6GB RAM - 128GB ROM - Midnight',
    price: 87696,
    originalPrice: 95000,
    image: '/phone.png',
    inCart: false,
    brand: 'Apple',
    color: 'Black',
    storage: '128 GB',
    camera: '12MP',
    display: '6.1"',
    ram: '6GB',
    category: 'smartphone',
  },
  {
    id: 2,
    name: 'iPhone 14 Pro - 6.1" - 8GB RAM - 256GB ROM - Deep Purple',
    price: 120000,
    originalPrice: 130000,
    image: '/phone.png',
    inCart: true,
    brand: 'Apple',
    color: 'Purple',
    storage: '256 GB',
    camera: '48MP',
    display: '6.1"',
    ram: '8GB',
    category: 'smartphone',
  },
  {
    id: 3,
    name: 'TECNO Spark 10 - 6.6" - 4GB RAM - 128GB ROM - Green',
    price: 25000,
    originalPrice: 28000,
    image: '/phone.png',
    inCart: false,
    brand: 'TECNO',
    color: 'Green',
    storage: '128 GB',
    camera: '50MP',
    display: '6.6"',
    ram: '4GB',
    category: 'smartphone',
  },
  {
    id: 4,
    name: 'Samsung Galaxy A54 - 6.4" - 8GB RAM - 256GB ROM - Black',
    price: 45000,
    originalPrice: 50000,
    image: '/phone.png',
    inCart: true,
    brand: 'Samsung',
    color: 'Black',
    storage: '256 GB',
    camera: '50MP',
    display: '6.4"',
    ram: '8GB',
    category: 'smartphone',
  },
  {
    id: 5,
    name: 'TCL 20 Pro - 6.67" - 6GB RAM - 256GB ROM - Blue',
    price: 35000,
    originalPrice: 40000,
    image: '/phone.png',
    inCart: false,
    brand: 'TCL',
    color: 'Blue',
    storage: '256 GB',
    camera: '48MP',
    display: '6.67"',
    ram: '6GB',
    category: 'smartphone',
  },
  {
    id: 6,
    name: 'iPhone 15 - 6.1" - 8GB RAM - 128GB ROM - Green',
    price: 105000,
    originalPrice: 115000,
    image: '/phone.png',
    inCart: true,
    brand: 'Apple',
    color: 'Green',
    storage: '128 GB',
    camera: '48MP',
    display: '6.1"',
    ram: '8GB',
    category: 'smartphone',
  },
  {
    id: 7,
    name: 'TECNO Phantom X2 - 6.8" - 8GB RAM - 256GB ROM - Black',
    price: 55000,
    originalPrice: 62000,
    image: '/phone.png',
    inCart: false,
    brand: 'TECNO',
    color: 'Black',
    storage: '256 GB',
    camera: '64MP',
    display: '6.8"',
    ram: '8GB',
    category: 'smartphone',
  },
  {
    id: 8,
    name: 'Samsung Galaxy S23 - 6.1" - 8GB RAM - 128GB ROM - Green',
    price: 75000,
    originalPrice: 85000,
    image: '/phone.png',
    inCart: true,
    brand: 'Samsung',
    color: 'Green',
    storage: '128 GB',
    camera: '50MP',
    display: '6.1"',
    ram: '8GB',
    category: 'smartphone',
  },
  {
    id: 9,
    name: 'TCL 30 SE - 6.52" - 4GB RAM - 128GB ROM - Gray',
    price: 20000,
    originalPrice: 25000,
    image: '/phone.png',
    inCart: false,
    brand: 'TCL',
    color: 'Gray',
    storage: '128 GB',
    camera: '50MP',
    display: '6.52"',
    ram: '4GB',
    category: 'smartphone',
  },
  {
    id: 10,
    name: 'iPhone 13 - 6.1" - 4GB RAM - 128GB ROM - Blue',
    price: 65000,
    originalPrice: 75000,
    image: '/phone.png',
    inCart: false,
    brand: 'Apple',
    color: 'Blue',
    storage: '128 GB',
    camera: '12MP',
    display: '6.1"',
    ram: '4GB',
    category: 'smartphone',
  },
  {
    id: 11,
    name: 'TECNO Camon 20 - 6.67" - 8GB RAM - 256GB ROM - Gold',
    price: 40000,
    originalPrice: 45000,
    image: '/phone.png',
    inCart: true,
    brand: 'TECNO',
    color: 'Gold',
    storage: '256 GB',
    camera: '64MP',
    display: '6.67"',
    ram: '8GB',
    category: 'smartphone',
  },
  {
    id: 12,
    name: 'Samsung Galaxy A34 - 6.6" - 6GB RAM - 128GB ROM - Silver',
    price: 38000,
    originalPrice: 42000,
    image: '/phone.png',
    inCart: false,
    brand: 'Samsung',
    color: 'Silver',
    storage: '128 GB',
    camera: '48MP',
    display: '6.6"',
    ram: '6GB',
    category: 'smartphone',
  },
]

function IndexPage() {
  const search = useSearch({ from: '/' })
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showLoanCalculator, setShowLoanCalculator] = useState(false)
  const filterOptions = useMemo(() => {
    if (PRODUCT_CATALOG.length === 0) {
      return {
        price: { min: 0, max: 0 },
        brand: [],
        color: [],
        storage: [],
        camera: [],
        display: [],
        ram: [],
      }
    }

    const priceValues = PRODUCT_CATALOG.map((product) => product.price)
    const minPrice = Math.min(...priceValues)
    const maxPrice = Math.max(...priceValues)

    const uniqueForKey = (key) =>
      Array.from(
        new Set(PRODUCT_CATALOG.map((product) => product[key]).filter(Boolean)),
      )

    return {
      price: { min: minPrice, max: maxPrice },
      brand: uniqueForKey('brand'),
      color: uniqueForKey('color'),
      storage: uniqueForKey('storage'),
      camera: uniqueForKey('camera'),
      display: uniqueForKey('display'),
      ram: uniqueForKey('ram'),
    }
  }, [])

  const defaultFilterState = useMemo(
    () => ({
      priceRange: [filterOptions.price.min, filterOptions.price.max],
      brand: [],
      color: [],
      storage: [],
      camera: [],
      display: [],
      ram: [],
    }),
    [filterOptions],
  )

  const [activeFilters, setActiveFilters] = useState(defaultFilterState)
  const [sortOption, setSortOption] = useState('price-low-high')
  const [filterResetSignal, setFilterResetSignal] = useState(0)

  useEffect(() => {
    if (search?.auth === 'login') {
      setShowAuthDialog(true)
    }
    if (search?.calculator === 'loan') {
      setShowLoanCalculator(true)
    }
  }, [search])

  useEffect(() => {
    setActiveFilters(defaultFilterState)
  }, [defaultFilterState])

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = activeFilters.priceRange ?? [
      filterOptions.price.min,
      filterOptions.price.max,
    ]

    const matchesSelection = (category, value) => {
      const selections = activeFilters[category]
      return !selections?.length || selections.includes(value)
    }

    const filtered = PRODUCT_CATALOG.filter((product) => {
      const withinPrice = product.price >= minPrice && product.price <= maxPrice

      return (
        withinPrice &&
        matchesSelection('brand', product.brand) &&
        matchesSelection('color', product.color) &&
        matchesSelection('storage', product.storage) &&
        matchesSelection('camera', product.camera) &&
        matchesSelection('display', product.display) &&
        matchesSelection('ram', product.ram)
      )
    })

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-high-low':
          return b.price - a.price
        case 'name-ascending':
          return a.name.localeCompare(b.name)
        case 'name-descending':
          return b.name.localeCompare(a.name)
        case 'price-low-high':
        default:
          return a.price - b.price
      }
    })

    return sorted
  }, [
    activeFilters,
    sortOption,
    filterOptions.price.max,
    filterOptions.price.min,
  ])

  const handleResetFilters = () => {
    setActiveFilters({
      ...defaultFilterState,
      priceRange: [...defaultFilterState.priceRange],
    })
    setSortOption('price-low-high')
    setFilterResetSignal((prev) => prev + 1)
  }

  return (
    <div className="mx-auto">
      <FilterBar
        options={filterOptions}
        onLoanCalculatorOpen={() => setShowLoanCalculator(true)}
        onFiltersChange={setActiveFilters}
        onSortChange={setSortOption}
        initialSort={sortOption}
        resetSignal={filterResetSignal}
      />

      <div className="py-6 md:py-8 lg:py-[38px]">
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-[30px]">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={`KES ${product.price.toLocaleString()}`}
                  oldPrice={`KES ${product.originalPrice.toLocaleString()}`}
                  image={product.image}
                  hasCartButton={product.inCart}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 md:mt-10">
              <PaginationComponent />
            </div>
          </>
        ) : (
          <div className="py-10">
            <NotFound onAction={handleResetFilters} />
          </div>
        )}
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      <LoanLimitCalculator
        open={showLoanCalculator}
        onOpenChange={setShowLoanCalculator}
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
  validateSearch: (search) => ({
    auth: search?.auth,
    calculator: search?.calculator,
  }),
})
