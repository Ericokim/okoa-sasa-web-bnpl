import { createFileRoute } from '@tanstack/react-router'

function ProductDetailPage() {
  const { productId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-96 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Product {productId}</h1>
            <p className="text-muted-foreground mt-2">SKU: PROD-{productId}</p>
          </div>

          <div className="space-y-2">
            <p className="text-3xl font-bold">KES 5,000</p>
            <p className="text-lg text-primary">
              Or pay KES 1,250/month for 4 months
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground">
              High-quality product with flexible payment options. Buy now and
              pay in installments with zero interest.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Payment Plans</h3>
            <div className="space-y-2">
              <div className="border rounded-lg p-4">
                <p className="font-medium">4 Payments of KES 1,250</p>
                <p className="text-sm text-muted-foreground">Interest-free</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium">6 Payments of KES 833</p>
                <p className="text-sm text-muted-foreground">Interest-free</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Add to Cart
            </button>
            <button className="px-6 py-3 border rounded-lg hover:bg-muted">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
})
