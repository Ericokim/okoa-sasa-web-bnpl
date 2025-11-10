import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { Cart } from '@/components/shared'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { useProductList } from '@/lib/queries/products'
import { useSyncProductsWithCart } from '@/hooks/use-sync-products-with-cart'

function CartPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [showAuthDialog, setShowAuthDialog] = React.useState(false)
  const { data: fetchedProducts, isLoading } = useProductList()

  useSyncProductsWithCart(fetchedProducts, { isLoading })

  const handleCheckout = () => {
    // if (!isAuthenticated) {
    //   setShowAuthDialog(true)
    //   return
    // }
    navigate({ to: '/checkout' })
  }

  return (
    <div className="mx-auto w-full py-6 md:py-8">
      <Cart onCheckout={handleCheckout} />

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
