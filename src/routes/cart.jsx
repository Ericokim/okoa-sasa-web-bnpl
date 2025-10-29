import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { Cart } from '@/components/shared'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { TrashIcon } from '@/assets/icons'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

function CartPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [showAuthDialog, setShowAuthDialog] = React.useState(false)

  const productImages = Array(4).fill('/phone.png')

  const initialCartItems = [
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
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/ba62717ea27b54a9f3d68b5571d4ff38ea4aaaa6?width=192',
    },
  ]
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
      return
    }
    navigate({ to: '/checkout' })
  }

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
      image: '/phone.png',
    },
    {
      id: 3,
      title: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image: '/phone.png',
    },
    {
      id: 4,
      title: 'iPhone 14',
      description:
        'iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight + free(Cover + Screen Protector',
      price: 87696,
      quantity: 1,
      image: '/phone.png',
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
    <div className="mx-auto w-full py-6 md:py-8">
      <Cart initialItems={initialCartItems} onCheckout={handleCheckout} />

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
