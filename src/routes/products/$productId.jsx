import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ProductGallery } from '@/components/shared/Products/ProductGallery'
import { ProductInfo } from '@/components/shared/Products/ProductInfo'
import { SpecificationsTable } from '@/components/shared/Products/SpecificationsTable'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import NotFound from '@/container/NotFound'
import { useStateContext } from '@/context/state-context'
import { productsQueryOptions, applyCartState } from '@/lib/queries/products'

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const { product: loadedProduct, products: loaderProducts = [] } =
    Route.useLoaderData()
  const { cart, setProducts } = useStateContext()

  useEffect(() => {
    setProducts((prevProducts = []) => {
      const nextProducts = applyCartState(loaderProducts, cart)
      if (prevProducts.length !== nextProducts.length) {
        return nextProducts
      }

      const isSame = prevProducts.every(
        (prevItem, index) => prevItem === nextProducts[index],
      )

      return isSame ? prevProducts : nextProducts
    })
  }, [loaderProducts, cart, setProducts])

  if (!loadedProduct) {
    return (
      <div className="py-10">
        <NotFound
          title="404 - Page Not Found"
          description="The page you are looking for doesn't exist."
          actionLabel="Back to Home"
          actionHref="/"
        />
      </div>
    )
  }

  const fallbackImage =
    (typeof loadedProduct.image === 'string' &&
    loadedProduct.image.trim().length > 0
      ? loadedProduct.image.trim()
      : '/product.png')
  const sourceGallery =
    Array.isArray(loadedProduct.gallery) && loadedProduct.gallery.length > 0
      ? loadedProduct.gallery.filter(Boolean)
      : []
  const galleryImages =
    sourceGallery.length > 0 ? [...sourceGallery] : [fallbackImage]

  while (galleryImages.length < 4) {
    galleryImages.push(
      galleryImages[galleryImages.length - 1] ?? fallbackImage,
    )
  }

  const displayProduct = {
    ...loadedProduct,
    price:
      loadedProduct.priceLabel ??
      `KES ${Number(loadedProduct.price ?? 0).toLocaleString()}`,
    stock: loadedProduct.stock ?? 'Available in store',
    images:
      galleryImages.length > 4 ? galleryImages.slice(0, 4) : galleryImages,
  }

  const specifications = {
    ...(loadedProduct.specifications ?? {}),
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    {
      label: loadedProduct.name,
      path: `/products/${productId}`,
      isCurrent: true,
    },
  ]

  return (
    <div className="mx-auto w-full">
      {/* Breadcrumbs - Desktop & Mobile */}
      <BreadCrumbs
        items={breadcrumbItems}
        className="px-4 pt-4 md:px-0 md:pt-8"
      />

      {/* Product Section - Desktop & Mobile */}
      <div className="px-4 py-4 md:px-0 md:py-8">
        <div className="flex w-full flex-col gap-5 lg:flex-row lg:gap-8">
          {/* Gallery */}
          <div className="w-full lg:w-[calc(58.33%-16px)]">
            <ProductGallery
              images={displayProduct.images}
              name={displayProduct.name}
            />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[calc(41.67%-16px)]">
            <ProductInfo product={displayProduct} />
          </div>
        </div>
      </div>

      {/* Specifications Section - Desktop & Mobile */}
      <div className="px-4 pb-8 md:px-0 md:pb-12">
        <SpecificationsTable
          specifications={specifications}
          descriptionText={loadedProduct.descriptionText}
          benefits={loadedProduct.benefits}
        />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params, context: { queryClient } }) => {
    const listData = await queryClient.ensureQueryData(productsQueryOptions())
    const targetId = String(params.productId)
    const product =
      listData.products.find((item) => {
        if (!item) return false
        const matchesId = item.id !== undefined && String(item.id) === targetId
        const matchesSku =
          item.sku !== undefined && String(item.sku) === targetId
        return matchesId || matchesSku
      }) ?? null

    return {
      product,
      products: listData.products,
      meta: listData.meta,
    }
  },
  component: ProductDetailPage,
})
