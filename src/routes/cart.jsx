import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { Cart } from '@/components/shared'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { TrashIcon } from '@/assets/icons'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'

function CartPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [showAuthDialog, setShowAuthDialog] = React.useState(false)

  const productImages = Array(4).fill('/phone.png')

  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      title: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/ba62717ea27b54a9f3d68b5571d4ff38ea4aaaa6?width=192',
    },
    {
      id: 2,
      title: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/ba62717ea27b54a9f3d68b5571d4ff38ea4aaaa6?width=192',
    },
    {
      id: 3,
      title: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/ba62717ea27b54a9f3d68b5571d4ff38ea4aaaa6?width=192',
    },
    {
      id: 4,
      title: 'iPhone 14',
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

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Cart', path: `/cart`, isCurrent: true },
  ]

  return (
    <div className="min-h-screen w-full  lg:w-7xl space-y-4 lg:space-y-[30px] px-4 lg:px-0">
      <BreadCrumbs items={breadcrumbItems} className="my-6 mb-10" />
      {/* Header */}
      <div className="lg:h-20">
        <p className="text-2xl lg:text-[36px] font-bold">My Cart</p>
        <p className="w-[536px] h-[22px] text-base font-medium leading-[140%] text-[#676D75] self-stretch">
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
              <div className="col-span-6 w-[401px] h-7 text-xl font-semibold leading-[140%] capitalize text-black">
                Item
              </div>
              <div className="col-span-3 w-44 h-7 text-xl font-semibold leading-[140%] capitalize text-black text-start">
                Quantity
              </div>
              <div className="col-span-3 text-xl font-semibold leading-[1.4] capitalize text-black text-start">
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
                        <div className="w-16 h-16 bg-linear-to-b from-gray-300 via-gray-200 to-gray-300 rounded-lg"></div>
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
                        <TrashIcon className="w-5 h-5" />
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
                      <div className="bg-brand-bg-2 rounded-lg flex items-center justify-center shrink-0 w-[139px] h-[130px]">
                        {/* <div className="w-24 h-24 bg-linear-to-b from-gray-300 via-gray-200 to-gray-300 rounded-lg"></div> */}
                        <img
                          src={productImages}
                          alt="Product main view"
                          className="w-24 h-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain rounded-2xl"
                        />
                      </div>
                      <div className="flex-1 w-56 h-[99px]">
                        <h3 className="font-semibold text-lg leading-[1.4] capitalize text-black w-56 h-[25px]">
                          {item.name}
                        </h3>
                        <p className="text-base font-normal leading-[1.4] text-[#676D75] w-56 h-[66px]">
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
                      <span className="text-xl font-semibold leading-[1.4] capitalize h-7 w-28 bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 cursor-pointer w-[30px] h-[30px]"
                      >
                        <TrashIcon />
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
              <h2 className="text-2xl font-semibold leading-[1.4] capitalize text-black lg:mb-8">
                Order Summary
              </h2>
            </div>

            <div className="w-[380px] h-px bg-[#E8ECF4] self-stretch my-5"></div>

            <div className="w-full lg:w-[380px]  space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="capitalize text-[#676D75] lg:text-base text-lg font-medium">
                  Total Items
                </span>
                <span className="text-lg font-medium  capitalize text-black">
                  {totalItems}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="capitalize text-[#676D75] lg:text-base text-lg font-medium">
                  Shipping Cost
                </span>
                <span className="text-lg font-medium  capitalize text-black">
                  KES 0
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="capitalize text-[#676D75] lg:text-base text-lg font-medium">
                  Subtotal
                </span>
                <span className="text-lg font-medium  capitalize text-black">
                  KES {subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="w-[380px] h-px bg-[#E8ECF4] self-stretch my-5"></div>

            <div className="w-full lg:w-[380px] mb-6">
              <div className="flex justify-between text-base lg:text-md text-gray-900 font-semibold">
                <span className="capitalize text-[#676D75] lg:text-base text-lg font-medium">
                  Grand Total
                </span>
                <span className="text-lg font-medium  capitalize text-black">
                  KES {subtotal.toLocaleString()}
                </span>
              </div>
            </div>
            <Link to="/checkout">
              <Button
                className="w-full lg:w-[380px] h-12 lg:h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white rounded-[24px] font-semibold hover:opacity-90 transition-all shadow-md flex flex-row justify-center items-center px-4 py-3 gap-2.5"
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
        redirectTo="/otp"
      />
    </div>
  )
}

export const Route = createFileRoute('/cart')({
  component: CartPage,
})
