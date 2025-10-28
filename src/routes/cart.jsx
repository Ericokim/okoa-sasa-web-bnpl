import React from 'react'
import { Link, createFileRoute,useNavigate } from '@tanstack/react-router'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import { AuthDialog } from '@/components/shared/AuthDialog'

function CartPage() {
    const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [showAuthDialog, setShowAuthDialog] = React.useState(false)

  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image: '/api/placeholder/80/80',
    },
    {
      id: 2,
      name: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image: '/api/placeholder/80/80',
    },
    {
      id: 3,
      name: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image: '/api/placeholder/80/80',
    },
    {
      id: 4,
      name: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image: '/api/placeholder/80/80',
    },
  ])

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    )
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen w-full lg:h-[892px] lg:w-7xl space-y-4 lg:space-y-[30px] px-4 lg:px-0">
      {/* Breadcrumb */}
      <div className="h-6 text-sm text-gray-600">home cart</div>

      {/* Header */}
      <div className="lg:h-20">
        <p className="text-2xl lg:text-[36px] font-bold">My Cart</p>
        <p className="text-xs lg:text-[10px] font-semibold text-gray-600">
          Almost there! Ready to place your order?
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
        {/* Cart Items */}
        <div className="w-full lg:w-[848px] rounded-xl border p-4 lg:p-6">
          <div className="flex-1 bg-white">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 border-b-2 mb-4 pb-4 border-gray-200 w-[800px]">
              <div className="col-span-6 text-lg font-semibold">Item</div>
              <div className="col-span-3 text-lg font-semibold text-center">
                Quantity
              </div>
              <div className="col-span-3 text-lg font-semibold text-right">
                Subtotal
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4 lg:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 border-b-2 border-gray-100">
                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-4">
                    {/* Product Info */}
                    <div className="flex gap-3">
                      <div className="bg-gray-50 rounded-lg flex items-center justify-center shrink-0 w-20 h-20">
                        <div className="w-16 h-16 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 rounded-lg"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Quantity and Price Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 font-medium">
                          Quantity
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 border rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 border rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 w-8 h-8 flex items-center justify-center"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-600 font-medium">
                        Subtotal
                      </span>
                      <span className="text-lg font-semibold text-orange-600">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4 items-start w-[375px] h-[130px]">
                      <div className="bg-gray-50 rounded-lg flex items-center justify-center shrink-0 w-[139px] h-[130px]">
                        <div className="w-24 h-24 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 rounded-lg"></div>
                      </div>
                      <div className="flex-1 w-56 h-[99px]">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-3 flex items-center justify-center gap-4 h-[30px] w-[130px]">
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 border rounded-full cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 border rounded-full cursor-pointer"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price and Delete */}
                    <div className="col-span-3 flex items-center justify-end gap-4">
                      <span className="text-xl font-semibold text-orange-600 h-7 w-28">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 cursor-pointer w-[30px] h-[30px]"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border w-full lg:w-[412px] lg:h-[382px] rounded-xl py-6 px-4">
          <div className="lg:sticky lg:top-8">
            <div className="w-full lg:w-[380px]">
              <h2 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8">
                Order Summary
              </h2>
            </div>

            <div className="w-full lg:w-[380px] h-0.5 bg-gray-200 mb-6"></div>

            <div className="w-full lg:w-[380px] space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span className="text-sm lg:text-base">Total Items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="text-sm lg:text-base">Shipping Cost</span>
                <span className="font-semibold">KES 0</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="text-sm lg:text-base">Subtotal</span>
                <span className="font-semibold">
                  KES {subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-[380px] h-0.5 bg-gray-200 mb-6"></div>

            <div className="w-full lg:w-[380px] mb-6">
              <div className="flex justify-between text-base lg:text-md text-gray-900 font-semibold">
                <span>Grand Total</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button
                className="w-full h-12 lg:h-[46px] bg-linear-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                variant={'default'}
                size={'sm'}
              >
                Proceed To Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        redirectTo="/checkout"
      />
    </div>
  )
}

export const Route = createFileRoute('/cart')({
  component: CartPage,
})
