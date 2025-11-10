import { useEffect } from 'react'
import { useStateContext } from '@/context/state-context'

const normalizeProductIdentifier = (value) =>
  value === undefined || value === null ? '' : String(value)

export function useSyncProductsWithCart(sourceProducts, options = {}) {
  const { cart, setProducts } = useStateContext()
  const { isLoading = false } = options

  useEffect(() => {
    if (isLoading) return

    const safeProducts = Array.isArray(sourceProducts) ? sourceProducts : []

    setProducts(
      safeProducts.map((product) => {
        const productId = normalizeProductIdentifier(product?.id)
        const productSku = normalizeProductIdentifier(product?.sku)

        const cartItem = cart.find((item) => {
          const cartId = normalizeProductIdentifier(item?.productId)
          return (
            (productId && cartId === productId) ||
            (productSku && cartId === productSku)
          )
        })

        const quantity = cartItem?.quantity || 0

        return {
          ...(product ?? {}),
          inCart: Boolean(cartItem),
          cartQuantity: quantity,
          quantity,
        }
      }),
    )
  }, [sourceProducts, cart, setProducts, isLoading])
}
