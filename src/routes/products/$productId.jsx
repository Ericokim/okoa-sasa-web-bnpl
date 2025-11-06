import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { ProductGallery } from '@/components/shared/Products/ProductGallery'
import { ProductInfo } from '@/components/shared/Products/ProductInfo'
import { SpecificationsTable } from '@/components/shared/Products/SpecificationsTable'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import NotFound from '@/container/NotFound'
import { useStateContext } from '@/context/state-context'
import { useProductList } from '@/lib/queries/products'

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const { data: fetchedProducts = [], isLoading } = useProductList()
  const products = useMemo(
    () => (Array.isArray(fetchedProducts) ? fetchedProducts : []),
    [fetchedProducts],
  )
  const { cart, setProducts } = useStateContext()

  const targetProduct = useMemo(() => {
    const targetId = String(productId)

    return (
      products.find((item) => {
        if (!item) return false
        const matchesId =
          item.id !== undefined && String(item.id) === targetId
        const matchesSku =
          item.sku !== undefined && String(item.sku) === targetId
        return matchesId || matchesSku
      }) ?? null
    )
  }, [products, productId])

  useEffect(() => {
    if (isLoading) {
      return
    }

    setProducts((prevProducts = []) => {
      const nextProducts = products.map((product) => {
        const cartItem = cart.find(
          (item) => String(item.productId) === String(product.id),
        )
        const quantity = cartItem?.quantity || 0
        return {
          ...product,
          inCart: !!cartItem,
          quantity,
          cartQuantity: quantity,
        }
      })

      if (prevProducts.length !== nextProducts.length) {
        return nextProducts
      }

      const isSame = prevProducts.every(
        (prevItem, index) => prevItem === nextProducts[index],
      )

      return isSame ? prevProducts : nextProducts
    })
  }, [products, cart, setProducts, isLoading])

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm text-[#676D75]">
        Loading product...
      </div>
    )
  }

  if (!targetProduct) {
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
    typeof targetProduct.image === 'string' && targetProduct.image.trim().length
      ? targetProduct.image.trim()
      : '/product.png'
  const sourceGallery =
    Array.isArray(targetProduct.gallery) && targetProduct.gallery.length > 0
      ? targetProduct.gallery.filter(Boolean)
      : []
  const galleryImages =
    sourceGallery.length > 0 ? [...sourceGallery] : [fallbackImage]

  while (galleryImages.length < 4) {
    galleryImages.push(
      galleryImages[galleryImages.length - 1] ?? fallbackImage,
    )
  }

  const displayProduct = {
    ...targetProduct,
    price:
      targetProduct.priceLabel ??
      `KES ${Number(targetProduct.price ?? 0).toLocaleString()}`,
    stock: targetProduct.stock ?? 'Available in store',
    images:
      galleryImages.length > 4 ? galleryImages.slice(0, 4) : galleryImages,
  }

  const specifications = {
    ...(targetProduct.specifications ?? {}),
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    {
      label: targetProduct.name,
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
          descriptionHtml={targetProduct.descriptionHtml}
          descriptionText={targetProduct.descriptionText}
          benefits={targetProduct.benefits}
        />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
})
