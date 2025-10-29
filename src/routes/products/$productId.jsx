import { createFileRoute } from '@tanstack/react-router'
import { ProductGallery } from '@/components/shared/Products/ProductGallery'
import { ProductInfo } from '@/components/shared/Products/ProductInfo'
import { SpecificationsTable } from '@/components/shared/Products/SpecificationsTable'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import NotFound from '@/container/NotFound'
import { findProductById } from '@/data/products'

function ProductDetailPage() {
  const { productId } = Route.useParams()

  const catalogProduct = findProductById(productId)

  if (!catalogProduct) {
    return (
      <div className="py-10">
        <NotFound actionHref="/" />
      </div>
    )
  }

  const product = {
    ...catalogProduct,
    description: `${catalogProduct.name} with flexible financing options from Okoa Sasa.`,
    price: `KES ${catalogProduct.price.toLocaleString()}`,
    stock: 'Available in store',
    images: [
      catalogProduct.image,
      catalogProduct.image,
      catalogProduct.image,
      catalogProduct.image,
    ],
  }

  const specifications = {
    Brand: catalogProduct.brand,
    Display: catalogProduct.display,
    Camera: catalogProduct.camera,
    Memory: `RAM: ${catalogProduct.ram}, Storage: ${catalogProduct.storage}`,
    Colour: catalogProduct.color,
    Category: catalogProduct.category,
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    {
      label: catalogProduct.name,
      path: `/products/${productId}`,
      isCurrent: true,
    },
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
