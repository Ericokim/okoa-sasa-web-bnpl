import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react'
import { FilterBar } from '@/components/shared/Products/FilterBar'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { LoanLimitCalculator } from '@/components/shared/LoanLimitCalculator'
import { ProductCard } from '@/components/shared/Products/ProductCard'
import { PaginationComponent } from '@/components/shared/PaginationComponent'
import NotFound from '@/container/NotFound'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import { useProductList } from '@/lib/queries/products'
import { DEFAULT_FILTER_VALUES } from '@/constants/filterDefaults'
import logo from '@/assets/images/primaryLogoVertical.png'
import { useSyncProductsWithCart } from '@/hooks/use-sync-products-with-cart'

const LogoLoader = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-16">
    <div className="relative h-28 w-28 sm:h-32 sm:w-32">
      <img
        src={logo}
        srcSet={`${logo} 1x, ${logo} 2x`}
        alt="Okoa Sasa Logo"
        loading="lazy"
        decoding="async"
        className="relative h-full w-full object-contain animate-pulse"
      />
    </div>
    <p className="text-sm font-medium text-[#676D75] sm:text-base">
      Loading...
    </p>
  </div>
)

const PRODUCTS_PER_PAGE = 8
const DEFAULT_SORT = 'price-low-high'
const SORT_OPTIONS = new Set([
  'price-low-high',
  'price-high-low',
  'name-ascending',
  'name-descending',
])
const FILTER_CATEGORIES = [
  'category',
  'brand',
  'color',
  'storage',
  'camera',
  'display',
  'ram',
]

const parseNumber = (value) => {
  if (value === null || value === undefined) return undefined
  const num = Number(value)
  return Number.isFinite(num) ? num : undefined
}

const parseListParam = (value, allowedValues = []) => {
  if (typeof value !== 'string' || value.length === 0) return []
  const parts = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  if (!allowedValues.length) {
    return Array.from(new Set(parts))
  }
  const allowedSet = new Set(allowedValues)
  return Array.from(new Set(parts.filter((item) => allowedSet.has(item))))
}

const buildFiltersFromSearch = (searchParams, filterOptions) => {
  const minPrice =
    parseNumber(searchParams?.priceMin) ?? filterOptions.price.min
  const maxPrice =
    parseNumber(searchParams?.priceMax) ?? filterOptions.price.max
  const clampedMin = Math.max(
    filterOptions.price.min,
    Math.min(minPrice, filterOptions.price.max),
  )
  const clampedMax = Math.max(
    clampedMin,
    Math.min(maxPrice, filterOptions.price.max),
  )

  return {
    priceRange: [clampedMin, clampedMax],
    category: parseListParam(searchParams?.category, filterOptions.category),
    brand: parseListParam(searchParams?.brand, filterOptions.brand),
    color: parseListParam(searchParams?.color, filterOptions.color),
    storage: parseListParam(searchParams?.storage, filterOptions.storage),
    camera: parseListParam(searchParams?.camera, filterOptions.camera),
    display: parseListParam(searchParams?.display, filterOptions.display),
    ram: parseListParam(searchParams?.ram, filterOptions.ram),
  }
}

const formatListParam = (values = []) =>
  values.length ? values.join(',') : undefined

const areFiltersEqual = (a, b) => {
  if (!a || !b) return false
  if (
    a.priceRange[0] !== b.priceRange[0] ||
    a.priceRange[1] !== b.priceRange[1]
  ) {
    return false
  }
  return FILTER_CATEGORIES.every((category) => {
    const aValues = a[category] ?? []
    const bValues = b[category] ?? []
    if (aValues.length !== bValues.length) return false
    const setB = new Set(bValues)
    return aValues.every((value) => setB.has(value))
  })
}

function IndexPage() {
  const { debouncedSearchTerm, products: contextProducts } = useStateContext()
  const {
    data: fetchedProducts,
    isLoading,
    isError,
    error: productsError,
    refetch: refetchProducts,
  } = useProductList()
  useSyncProductsWithCart(fetchedProducts, { isLoading })
  const products = useMemo(
    () => (Array.isArray(contextProducts) ? contextProducts : []),
    [contextProducts],
  )

  const search = useSearch({ from: '/' })
  const navigate = useNavigate({ from: '/' })
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showLoanCalculator, setShowLoanCalculator] = useState(false)

  const filterOptions = useMemo(() => {
    if (products.length === 0) {
      return {
        price: { min: 0, max: 0 },
        category: [...DEFAULT_FILTER_VALUES.category],
        brand: [...DEFAULT_FILTER_VALUES.brand],
        color: [...DEFAULT_FILTER_VALUES.color],
        storage: [...DEFAULT_FILTER_VALUES.storage],
        camera: [...DEFAULT_FILTER_VALUES.camera],
        display: [...DEFAULT_FILTER_VALUES.display],
        ram: [...DEFAULT_FILTER_VALUES.ram],
      }
    }

    const priceValues = products.map((product) =>
      Number.isFinite(product.price) ? product.price : 0,
    )
    const minPrice = Math.min(...priceValues)
    const maxPrice = Math.max(...priceValues)

    const normalizeList = (items = []) =>
      Array.from(
        new Set(
          items
            .map((value) => (typeof value === 'string' ? value.trim() : ''))
            .filter(Boolean),
        ),
      ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

    const uniqueForKey = (key) =>
      normalizeList(products.map((product) => product[key]))

    const mergedValues = (key) =>
      normalizeList([
        ...(DEFAULT_FILTER_VALUES[key] ?? []),
        ...uniqueForKey(key),
      ])

    return {
      price: { min: minPrice, max: maxPrice },
      category: mergedValues('category'),
      brand: mergedValues('brand'),
      color: mergedValues('color'),
      storage: mergedValues('storage'),
      camera: mergedValues('camera'),
      display: mergedValues('display'),
      ram: mergedValues('ram'),
    }
  }, [products])

  const parsedSearch = useMemo(() => {
    const sortValue =
      typeof search?.sort === 'string' && SORT_OPTIONS.has(search.sort)
        ? search.sort
        : DEFAULT_SORT

    const pageValue = parseNumber(search?.page)
    const filtersFromSearch = buildFiltersFromSearch(search, filterOptions)

    return {
      sort: sortValue,
      page: pageValue && pageValue > 0 ? pageValue : 1,
      filters: filtersFromSearch,
    }
  }, [search, filterOptions])

  const [activeFilters, setActiveFilters] = useState(parsedSearch.filters)
  const [sortOption, setSortOption] = useState(parsedSearch.sort)
  const [currentPage, setCurrentPage] = useState(parsedSearch.page)
  const [loanLimit, setLoanLimit] = useState(null)
  const lastSyncedSearchRef = useRef(null)
  const syncingFromSearchRef = useRef(false)

  const handleFiltersChange = useCallback((nextFilters) => {
    setActiveFilters((prev) => {
      if (areFiltersEqual(prev, nextFilters)) {
        return prev
      }
      setCurrentPage(1)
      return nextFilters
    })
  }, [])

  const handleSortChange = useCallback((nextSort) => {
    setSortOption((prev) => {
      if (prev === nextSort) {
        return prev
      }
      setCurrentPage(1)
      return nextSort
    })
  }, [])

  const handleLoanProceed = useCallback(
    (loanAmount) => {
      if (!loanAmount || loanAmount <= 0) return
      const minBound = filterOptions.price.min
      const maxBound = filterOptions.price.max
      if (maxBound <= 0) return

      const clampedMax = Math.max(minBound, Math.min(loanAmount, maxBound))
      const nextFilters = {
        ...activeFilters,
        priceRange: [minBound, clampedMax],
      }

      setLoanLimit(loanAmount)
      handleFiltersChange(nextFilters)
    },
    [
      activeFilters,
      filterOptions.price.max,
      filterOptions.price.min,
      handleFiltersChange,
    ],
  )

  const handleLoanLimitClear = useCallback(() => {
    setLoanLimit(null)
    handleFiltersChange({
      ...activeFilters,
      priceRange: [filterOptions.price.min, filterOptions.price.max],
    })
  }, [
    activeFilters,
    filterOptions.price.max,
    filterOptions.price.min,
    handleFiltersChange,
  ])

  useEffect(() => {
    if (search?.auth === 'login') {
      setShowAuthDialog(true)
    }
    if (search?.calculator === 'loan') {
      setShowLoanCalculator(true)
    }
  }, [search])

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = activeFilters.priceRange ?? [
      filterOptions.price.min,
      filterOptions.price.max,
    ]

    const matchesSelection = (category, value) => {
      const selections = activeFilters[category]
      return !selections?.length || selections.includes(value)
    }

    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const withinPrice = product.price >= minPrice && product.price <= maxPrice
      const withinLoanLimit = !loanLimit || product.price <= loanLimit
      const matchesSearch =
        !normalizedSearch ||
        [product.name, product.brand, product.category, product.description]
          .filter(Boolean)
          .some((field) =>
            String(field).toLowerCase().includes(normalizedSearch),
          )

      return (
        withinPrice &&
        withinLoanLimit &&
        matchesSelection('category', product.category) &&
        matchesSelection('brand', product.brand) &&
        matchesSelection('color', product.color) &&
        matchesSelection('storage', product.storage) &&
        matchesSelection('camera', product.camera) &&
        matchesSelection('display', product.display) &&
        matchesSelection('ram', product.ram) &&
        matchesSearch
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
    products,
    debouncedSearchTerm,
    loanLimit,
  ])

  const totalProducts = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE))

  useLayoutEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const showPagination = totalProducts > PRODUCTS_PER_PAGE

  const handleResetFilters = () => {
    const resetFilters = buildFiltersFromSearch({}, filterOptions)
    handleFiltersChange(resetFilters)
    handleSortChange(DEFAULT_SORT)
    setLoanLimit(null)
  }

  useEffect(() => {
    const normalized = {
      page: parsedSearch.page,
      sort: parsedSearch.sort,
      filters: parsedSearch.filters,
    }

    const last = lastSyncedSearchRef.current
    const hasSynced =
      last &&
      last.page === normalized.page &&
      last.sort === normalized.sort &&
      areFiltersEqual(last.filters, normalized.filters)

    if (!hasSynced) {
      let didUpdate = false
      if (!areFiltersEqual(activeFilters, normalized.filters)) {
        setActiveFilters(normalized.filters)
        didUpdate = true
      }
      if (sortOption !== normalized.sort) {
        setSortOption(normalized.sort)
        didUpdate = true
      }
      if (currentPage !== normalized.page) {
        setCurrentPage(normalized.page)
        didUpdate = true
      }
      if (didUpdate) {
        syncingFromSearchRef.current = true
      }
      lastSyncedSearchRef.current = normalized
    }
  }, [parsedSearch, activeFilters, sortOption, currentPage])

  useEffect(() => {
    if (syncingFromSearchRef.current) {
      syncingFromSearchRef.current = false
      lastSyncedSearchRef.current = {
        page: currentPage,
        sort: sortOption,
        filters: activeFilters,
      }
      return
    }

    const [minPrice, maxPrice] = activeFilters.priceRange ?? [
      filterOptions.price.min,
      filterOptions.price.max,
    ]

    const nextSearch = {}

    if (search?.auth !== undefined) {
      nextSearch.auth = search.auth
    }
    if (search?.calculator !== undefined) {
      nextSearch.calculator = search.calculator
    }

    const pageParam = currentPage > 1 ? currentPage : undefined
    const sortParam = sortOption !== DEFAULT_SORT ? sortOption : undefined
    const priceMinParam =
      minPrice !== filterOptions.price.min ? minPrice : undefined
    const priceMaxParam =
      maxPrice !== filterOptions.price.max ? maxPrice : undefined

    if (pageParam !== undefined) nextSearch.page = pageParam
    if (sortParam !== undefined) nextSearch.sort = sortParam
    if (priceMinParam !== undefined) nextSearch.priceMin = priceMinParam
    if (priceMaxParam !== undefined) nextSearch.priceMax = priceMaxParam

    const categoryParam = formatListParam(activeFilters.category)
    const brandParam = formatListParam(activeFilters.brand)
    const colorParam = formatListParam(activeFilters.color)
    const storageParam = formatListParam(activeFilters.storage)
    const cameraParam = formatListParam(activeFilters.camera)
    const displayParam = formatListParam(activeFilters.display)
    const ramParam = formatListParam(activeFilters.ram)

    if (categoryParam !== undefined) nextSearch.category = categoryParam
    if (brandParam !== undefined) nextSearch.brand = brandParam
    if (colorParam !== undefined) nextSearch.color = colorParam
    if (storageParam !== undefined) nextSearch.storage = storageParam
    if (cameraParam !== undefined) nextSearch.camera = cameraParam
    if (displayParam !== undefined) nextSearch.display = displayParam
    if (ramParam !== undefined) nextSearch.ram = ramParam

    const keysToCompare = [
      'auth',
      'calculator',
      'page',
      'sort',
      'priceMin',
      'priceMax',
      'category',
      'brand',
      'color',
      'storage',
      'camera',
      'display',
      'ram',
    ]

    const searchChanged = keysToCompare.some((key) => {
      const currentValue = search?.[key]
      const nextValue = nextSearch[key]
      return currentValue !== nextValue
    })

    if (searchChanged) {
      lastSyncedSearchRef.current = {
        page: currentPage,
        sort: sortOption,
        filters: activeFilters,
      }

      navigate({
        to: '.',
        search: () => nextSearch,
        replace: true,
      })
    } else {
      lastSyncedSearchRef.current = {
        page: currentPage,
        sort: sortOption,
        filters: activeFilters,
      }
    }
  }, [
    activeFilters,
    currentPage,
    sortOption,
    filterOptions.price.min,
    filterOptions.price.max,
    navigate,
    search,
  ])

  return (
    <div className="mx-auto ">
      <FilterBar
        options={filterOptions}
        onLoanCalculatorOpen={() => setShowLoanCalculator(true)}
        onFiltersChange={handleFiltersChange}
        onSortChange={handleSortChange}
        initialSort={sortOption}
        selectedFilters={activeFilters}
        selectedSort={sortOption}
        loanLimit={loanLimit}
        onLoanLimitClear={handleLoanLimitClear}
        isLoanCalculatorOpen={showLoanCalculator}
      />

      <div className="py-6 md:py-8 lg:py-[38px]">
        {isLoading ? (
          <LogoLoader />
        ) : isError ? (
          <div className="py-10">
            <NotFound
              title="We can't load devices right now"
              description={
                'Please try again in a few moments or refresh the page.'
              }
              actionLabel="Try Again"
              onAction={() => refetchProducts?.()}
            />
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6 2xl:gap-[30px]">
              {paginatedProducts.map((product) => {
                const priceLabel =
                  product.priceLabel ??
                  `KES ${Number(product.price ?? 0).toLocaleString()}`
                const hasDiscount =
                  Number(product.originalPrice ?? 0) >
                  Number(product.price ?? 0)
                const oldPriceLabel = hasDiscount
                  ? (product.originalPriceLabel ??
                    `KES ${Number(
                      product.originalPrice ?? product.price ?? 0,
                    ).toLocaleString()}`)
                  : priceLabel

                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={priceLabel}
                    oldPrice={''}
                    image={product.image}
                    hasCartButton={product.inCart}
                  />
                )
              })}
            </div>

            {showPagination && (
              <div className="mt-8 flex items-center justify-center gap-4 md:mt-10">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="py-10">
            {loanLimit ? (
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[#F8971D]/60 bg-[#FFF7F0] px-6 py-10 text-center">
                <h3 className="text-xl font-semibold text-[#252525]">
                  No devices match your loan limit
                </h3>
                <p className="max-w-md text-sm text-[#676D75]">
                  We couldn&apos;t find any products priced at or below KES{' '}
                  {loanLimit.toLocaleString()}. You can adjust your loan limit
                  or reset the filters to explore more devices.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => setShowLoanCalculator(true)}
                    className="rounded-3xl px-4 py-2"
                  >
                    Adjust Loan Limit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetFilters}
                    className="rounded-3xl px-4 py-2"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              <NotFound onAction={handleResetFilters} />
            )}
          </div>
        )}
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      <LoanLimitCalculator
        open={showLoanCalculator}
        onOpenChange={setShowLoanCalculator}
        onProceed={handleLoanProceed}
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
  validateSearch: (search) => ({
    auth: search?.auth,
    calculator: search?.calculator,
    page: parseNumber(search?.page),
    sort:
      typeof search?.sort === 'string' && SORT_OPTIONS.has(search.sort)
        ? search.sort
        : undefined,
    priceMin: parseNumber(search?.priceMin),
    priceMax: parseNumber(search?.priceMax),
    brand: typeof search?.brand === 'string' ? search.brand : undefined,
    color: typeof search?.color === 'string' ? search.color : undefined,
    storage: typeof search?.storage === 'string' ? search.storage : undefined,
    camera: typeof search?.camera === 'string' ? search.camera : undefined,
    display: typeof search?.display === 'string' ? search.display : undefined,
    ram: typeof search?.ram === 'string' ? search.ram : undefined,
  }),
})
