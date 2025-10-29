import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { Cart } from '@/components/shared'
import { AuthDialog } from '@/components/shared/AuthDialog'

function CartPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [showAuthDialog, setShowAuthDialog] = React.useState(false)

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
