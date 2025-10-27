import { Link, createFileRoute } from '@tanstack/react-router'

function CartPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-4 flex gap-4">
              <div className="w-24 h-24 bg-muted rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">Product {i}</h3>
                <p className="text-sm text-muted-foreground">KES {i * 1000}</p>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 border rounded">-</button>
                  <span>1</span>
                  <button className="px-2 py-1 border rounded">+</button>
                </div>
              </div>
              <button className="text-destructive">Remove</button>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-6 space-y-4 h-fit">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>KES 3,000</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>KES 200</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>KES 3,200</span>
            </div>
          </div>
          <Link to="/checkout">
            <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/cart')({
  component: CartPage,
})
