import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { FilterBar } from '@/components/shared/Products/FilterBar'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { ProductCard } from '@/components/shared/Products/ProductCard'
import { PaginationComponent } from '@/components/shared/PaginationComponent'

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
  const search = useSearch({ from: '/' })
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  useEffect(() => {
    if (search?.auth === 'login') {
      setShowAuthDialog(true)
    }
  }, [search])

  return (
    <div className="mx-auto">
      <FilterBar />

      <div className="py-6 md:py-8 lg:py-[38px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-[30px]">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              price={`kES ${product.price.toLocaleString()}`}
              oldPrice={`KES ${product.originalPrice.toLocaleString()}`}
              image={product.image}
              hasCartButton={product.inCart}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 md:mt-10">
          <PaginationComponent />
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
  validateSearch: (search) => ({
    auth: search?.auth,
  }),
})
