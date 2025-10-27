import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

function CheckoutPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="flex items-center justify-between mb-8">
        <div
          className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
            1
          </div>
          <span className="ml-2">Shipping</span>
        </div>
        <div className="flex-1 h-0.5 bg-border mx-4"></div>
        <div
          className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
            2
          </div>
          <span className="ml-2">Payment Plan</span>
        </div>
        <div className="flex-1 h-0.5 bg-border mx-4"></div>
        <div
          className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
            3
          </div>
          <span className="ml-2">Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Continue to Payment Plan
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Choose Payment Plan</h2>
              <div className="space-y-3">
                <div className="border-2 border-primary rounded-lg p-4 cursor-pointer">
                  <p className="font-semibold">4 Monthly Payments</p>
                  <p className="text-2xl font-bold">KES 800/month</p>
                  <p className="text-sm text-muted-foreground">Interest-free</p>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                  <p className="font-semibold">6 Monthly Payments</p>
                  <p className="text-2xl font-bold">KES 533/month</p>
                  <p className="text-sm text-muted-foreground">Interest-free</p>
                </div>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Continue to Confirmation
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Confirm Your Order</h2>
              <p className="text-muted-foreground">
                Review your order details before completing your purchase
              </p>
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Complete Purchase
              </button>
            </div>
          )}
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
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/checkout/')({
  component: CheckoutPage,
})
