import { createFileRoute, Link } from '@tanstack/react-router'
import { ProductGallery } from '@/components/shared/Products/ProductGallery'
import { ProductInfo } from '@/components/shared/Products/ProductInfo'
import { SpecificationsTable } from '@/components/shared/Products/SpecificationsTable'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'

function ProductDetailPage() {
  const { productId } = Route.useParams()

  const product = {
    id: productId,
    name: 'iPhone 14',
    description:
      "6.1''-6GB RAM - 128GB ROM - Midnight +Free (Cover + Screen Protector)",
    price: 'kES 87,696',
    stock: '20 in stock',
    images: ['/phone.png', '/phone.png', '/phone.png', '/phone.png'],
  }

  const specifications = {
    Display: '6.1"',
    Camera: 'Front Camera: 12 MP, Rear Camera : 12MP +12MP',
    Memory: 'RAM: 6GB, ROM : 128GB',
    network: 'Sim Type: Dual Sim',
    OS: 'IOS 16',
    Battery: '3279mAh',
    Warranty: '1 year',
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'iPhone 14', path: `/products/${productId}`, isCurrent: true },
  ]

  return (
    <div className="w-full">
      {/* Breadcrumbs - Desktop & Mobile */}
      <BreadCrumbs items={breadcrumbItems} className="px-0 pt-4 md:pt-8" />

      {/* Product Section - Desktop & Mobile */}
      <div className="px-0 py-4 md:py-8">
        <div className="flex w-full flex-col gap-5 lg:flex-row lg:gap-8">
          {/* Gallery */}
          <div className="w-full lg:w-[calc(58.33%-16px)]">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[calc(41.67%-16px)]">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Specifications Section - Desktop & Mobile */}
      <div className="px-0 pb-8 md:pb-12">
        <SpecificationsTable specifications={specifications} />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
})
