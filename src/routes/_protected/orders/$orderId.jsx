import { createFileRoute } from '@tanstack/react-router'

function OrderDetailPage() {
  const { orderId } = Route.useParams()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Order #{orderId}</h1>
          <p className="text-muted-foreground">Placed on October 20, 2025</p>
        </div>
        <span className="px-4 py-2 bg-success/10 text-success rounded-full">
          Delivered
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Order Items</h2>
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 pb-4 border-b last:border-0">
                <div className="w-20 h-20 bg-muted rounded-lg"></div>
                <div className="flex-1">
                  <h3 className="font-semibold">Product {i}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: 1</p>
                  <p className="font-semibold mt-2">KES {i * 1000}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Payment Schedule</h2>
            <p className="text-sm text-muted-foreground">
              4 monthly installments of KES 800
            </p>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span>Payment 1 - Paid</span>
                <span className="text-success">✓ KES 800</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Payment 2 - Due Nov 20</span>
                <span>KES 800</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Payment 3 - Due Dec 20</span>
                <span>KES 800</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Payment 4 - Due Jan 20</span>
                <span>KES 800</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6 space-y-4">
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
          </div>

          <div className="border rounded-lg p-6 space-y-2">
            <h2 className="font-semibold">Shipping Address</h2>
            <p className="text-sm">John Doe</p>
            <p className="text-sm text-muted-foreground">
              123 Main Street
              <br />
              Nairobi, 00100
              <br />
              Kenya
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/orders/$orderId')({
  component: OrderDetailPage,
})
