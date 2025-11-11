import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { BreadCrumbs } from '../BreadCrumbs'
import { CartList } from './CartList'
import { CartSummary } from './CartSummary'
import { useStateContext } from '@/context/state-context'

export function Cart({ onCheckout }) {
  const { cartProducts, updateCartQuantity, removeFromCart, clearCart } =
    useStateContext()

  const cartItems = useMemo(() => cartProducts ?? [], [cartProducts])

  const handleQuantityChange = (id, newQuantity) => {
    const clampedQuantity = Math.max(1, newQuantity)
    updateCartQuantity?.(id, clampedQuantity)
  }

  const handleRemove = (id) => {
    removeFromCart?.(id)
  }

  const handleClearCart = () => {
    clearCart?.()
  }

  const { totalItems, subtotal } = useMemo(() => {
    const totals = cartItems.reduce(
      (acc, item) => {
        const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
        return {
          totalItems: acc.totalItems + quantity,
          subtotal: acc.subtotal + item.price * quantity,
        }
      },
      { totalItems: 0, subtotal: 0 },
    )

    return totals
  }, [cartItems])

  const layoutRef = useRef(null)
  const summaryColumnRef = useRef(null)
  const summaryCardRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [summaryStyles, setSummaryStyles] = useState({})
  const [placeholderHeight, setPlaceholderHeight] = useState(0)
  const [columnMinHeight, setColumnMinHeight] = useState(0)
  const [affixMode, setAffixMode] = useState('relative')

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = () => setIsDesktop(mediaQuery.matches)
    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const updateStickyPosition = useCallback(() => {
    if (!isDesktop || typeof window === 'undefined') {
      setSummaryStyles({})
      setPlaceholderHeight(0)
      setColumnMinHeight(0)
      setAffixMode('relative')
      return
    }

    const layoutNode = layoutRef.current
    const columnNode = summaryColumnRef.current
    const summaryNode = summaryCardRef.current

    if (!layoutNode || !columnNode || !summaryNode) return

    const layoutHeight = layoutNode.offsetHeight
    if (layoutHeight && columnMinHeight !== layoutHeight) {
      setColumnMinHeight(layoutHeight)
    }

    const summaryHeight = summaryNode.offsetHeight
    if (summaryHeight && placeholderHeight !== summaryHeight) {
      setPlaceholderHeight(summaryHeight)
    }

    const layoutRect = layoutNode.getBoundingClientRect()
    const columnRect = columnNode.getBoundingClientRect()
    const scrollTop = window.scrollY || window.pageYOffset
    const layoutTop = scrollTop + layoutRect.top
    const columnTop = scrollTop + columnRect.top
    const layoutBottom = layoutTop + layoutHeight

    const STICKY_TOP_OFFSET = 32
    const STICKY_BOTTOM_OFFSET = 48

    const stickyStart = columnTop - STICKY_TOP_OFFSET
    const maxScrollTop =
      layoutBottom - summaryHeight - STICKY_BOTTOM_OFFSET

    if (scrollTop <= stickyStart) {
      setAffixMode('relative')
      setSummaryStyles({
        position: 'relative',
        top: 0,
        left: 'auto',
        width: '100%',
      })
      return
    }

    if (scrollTop >= maxScrollTop) {
      const absoluteTop = Math.max(
        layoutHeight - summaryHeight - STICKY_BOTTOM_OFFSET,
        0,
      )
      setAffixMode('absolute')
      setSummaryStyles({
        position: 'absolute',
        top: absoluteTop,
        left: 0,
        width: '100%',
      })
      return
    }

    setAffixMode('fixed')
    setSummaryStyles({
      position: 'fixed',
      top: STICKY_TOP_OFFSET,
      left: columnRect.left,
      width: columnRect.width,
      zIndex: 50,
    })
  }, [columnMinHeight, isDesktop, placeholderHeight])

  useEffect(() => {
    if (!isDesktop) {
      setSummaryStyles({})
      setPlaceholderHeight(0)
      setColumnMinHeight(0)
      setAffixMode('relative')
      return
    }

    const handleScroll = () => updateStickyPosition()
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [
    isDesktop,
    updateStickyPosition,
    cartItems.length,
    totalItems,
    subtotal,
  ])

  return (
    <div className="flex w-full flex-col items-start gap-6 md:gap-[30px]">
      {/* Breadcrumbs */}
      <BreadCrumbs
        items={[
          { path: '/', label: 'Home' },
          { path: '/cart', label: 'My Cart', isCurrent: true },
        ]}
      />

      {/* Page Header */}
      <div className="flex w-full flex-col items-start gap-2 md:h-20 md:max-w-[536px]">
        <h1 className="self-stretch text-2xl font-semibold capitalize leading-[140%] text-[#252525] md:text-4xl">
          My Cart
        </h1>
        <p className="self-stretch text-sm font-medium leading-[140%] text-[#676D75] md:text-base">
          Almost there! Ready to place your order?
        </p>
      </div>

      {/* Cart Content - Responsive Layout */}
      <div
        ref={layoutRef}
        className="flex w-full flex-col gap-5 lg:flex-row lg:items-start lg:gap-6 xl:gap-8 2xl:gap-10"
      >
        <div className="w-full flex-1">
          <CartList
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </div>

        <div
          ref={summaryColumnRef}
          className="relative w-full lg:w-[320px] xl:w-[360px] 2xl:w-[400px] lg:shrink-0 lg:self-stretch"
          style={
            isDesktop && columnMinHeight
              ? { minHeight: columnMinHeight }
              : undefined
          }
        >
          {isDesktop && affixMode === 'fixed' ? (
            <div aria-hidden="true" style={{ height: placeholderHeight }} />
          ) : null}
          <div
            ref={summaryCardRef}
            className="w-full lg:max-w-none"
            style={isDesktop ? summaryStyles : undefined}
          >
            <CartSummary
              totalItems={totalItems}
              shippingCost={0}
              subtotal={subtotal}
              onCheckout={onCheckout}
              onClearCart={cartItems.length ? handleClearCart : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
