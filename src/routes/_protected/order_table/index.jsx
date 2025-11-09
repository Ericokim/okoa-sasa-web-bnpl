import { useMemo } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Package, Loader2 } from 'lucide-react'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { useGetOrdersList } from '@/lib/queries/orders'

const DEFAULT_ORDER_IMAGE = '/product.png'

const sanitizeOrderReference = (value = '') =>
  String(value).replace(/^#/, '')

const ensureDisplayOrderId = (value = '') =>
  value?.startsWith('#') ? value : `#${value || 'ORDER'}`

const formatOrderDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date)) {
    return value
  }
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const ORDER_LINE_COLLECTION_KEYS = [
  'orderLines',
  'items',
  'orderLine',
  'order_lines',
  'lineItems',
  'line_items',
  'products',
]

const getLineItemsFromOrder = (order) => {
  if (!order) return []
  for (const key of ORDER_LINE_COLLECTION_KEYS) {
    const collection = order?.[key]
    if (Array.isArray(collection)) {
      if (collection.length) return collection
      continue
    }
    if (collection && typeof collection === 'object') {
      return [collection]
    }
  }
  return []
}

const pickDisplayText = (...candidates) => {
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim()
    }
  }
  return ''
}

const pickImage = (...candidates) => {
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim()
    }
  }
  return DEFAULT_ORDER_IMAGE
}

const mapStatusVariant = (status = '') => {
  const normalized = status.toLowerCase()
  if (['fulfilled', 'delivered', 'completed'].includes(normalized)) {
    return 'success'
  }
  if (
    ['approved', 'on the way', 'shipped', 'processing'].includes(normalized)
  ) {
    return 'default'
  }
  if (['pending', 'requested'].includes(normalized)) {
    return 'secondary'
  }
  if (['declined', 'rejected', 'cancelled'].includes(normalized)) {
    return 'destructive'
  }
  return 'outline'
}

const getStatusBadgeClasses = (status = '') => {
  const normalized = (status || '').toLowerCase()
  if (['fulfilled', 'delivered', 'completed'].includes(normalized)) {
    return 'bg-green-100 text-green-800'
  }
  if (
    ['approved', 'on the way', 'shipped', 'processing'].includes(normalized)
  ) {
    return 'bg-blue-100 text-blue-800'
  }
  if (['pending', 'requested'].includes(normalized)) {
    return 'bg-yellow-100 text-yellow-800'
  }
  if (['declined', 'rejected', 'cancelled'].includes(normalized)) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-gray-100 text-gray-700'
}

const normalizeOrderForTable = (order, index = 0) => {
  if (!order) return null
  const reference =
    order.quoteReference || order.orderId || order.id || `ORD-${index + 1}`
  const orderLines = getLineItemsFromOrder(order)
  const primaryLine = orderLines[0]

  return {
    orderId: ensureDisplayOrderId(reference),
    rawReference: sanitizeOrderReference(reference),
    createdDate: formatOrderDate(order.orderDate || order.createdDate || order.date),
    name: order.customer?.fullName || order.customer?.name || '',
    device:
      pickDisplayText(
        primaryLine?.name,
        primaryLine?.title,
        primaryLine?.description,
        primaryLine?.productName,
        primaryLine?.product_name,
        order.productName,
        order.product_name,
        order.product,
        order.title,
        order.device,
        order.name,
      ) || 'BNPL Order',
    loanAmount:
      Number(order.totalAmount) ||
      Number(order.amount) ||
      Number(order.loanAmount) ||
      0,
    status: order.status || order.statusText || 'Pending',
    statusVariant: mapStatusVariant(order.status || order.statusText || 'Pending'),
    badgeClass: getStatusBadgeClasses(order.status || order.statusText || 'Pending'),
    image: pickImage(
      primaryLine?.image,
      primaryLine?.thumbnail,
      primaryLine?.photo,
      order.image,
      DEFAULT_ORDER_IMAGE,
    ),
  }
}

function OrdersTableHistory() {
  const navigate = useNavigate()
  const { data, isPending, isError, refetch } = useGetOrdersList()

  const orderHistory = useMemo(() => {
    const apiOrders = Array.isArray(data?.data) ? data.data : []
    return apiOrders
      .map((order, index) => normalizeOrderForTable(order, index))
      .filter(Boolean)
  }, [data])

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Order History', path: '/orders', isCurrent: true },
  ]

  const handleViewDetails = (orderId) => {
    navigate({ to: `/orders/${orderId.replace('#', '')}` })
  }

  const showEmptyState = !isPending && orderHistory.length === 0

  return (
    <div className="min-h-screen">
      <BreadCrumbs
        items={breadcrumbItems}
        className="px-4 pt-6 md:pt-8 -ml-7"
      />

      <main className="w-full flex flex-col py-4">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          My Order History
        </h1>
        <p className="text-gray-600 mb-8">Overview of all of your activities</p>

        {isError && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load your latest orders right now.
            <button
              type="button"
              onClick={() => refetch()}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {isPending && orderHistory.length === 0 && (
          <div className="mb-6 flex items-center gap-2 rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
            <span>Fetching your latest orders...</span>
          </div>
        )}

        {showEmptyState && (
          <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-600">
            There are no recent orders.
          </div>
        )}

        {!showEmptyState && orderHistory.length > 0 && (
          <div className="-mt-2">
            <div className="hidden md:block">
              <Card className="shadow-none overflow-hidden">
                <CardContent>
                  {orderHistory.map((order, idx) => (
                    <div key={order.orderId}>
                      <div
                        className="flex gap-4 py-1 px-6 items-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleViewDetails(order.orderId)}
                      >
                        <div className="shrink-0 rounded-2xl bg-brand-bg-2 p-3 overflow-hidden">
                          <img
                            src={order.image}
                            alt={order.device}
                            className="h-22 w-22 object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-lg text-gray-900 truncate flex items-center">
                            {order.device}
                            <Badge
                              variant={order.statusVariant}
                              className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${order.badgeClass}`}
                            >
                              {order.status}
                            </Badge>
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 mb-2">
                            {order.orderId}
                            <span className="mx-2">•</span>
                            {order.createdDate}
                            {order.name && (
                              <>
                                <span className="mx-2">•</span>
                                {order.name}.
                              </>
                            )}
                          </p>
                          <p className="font-bold text-lg bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent whitespace-nowrap">
                            KES {order.loanAmount.toLocaleString()}
                          </p>
                        </div>

                        <Button
                          variant="gradient"
                          size="sm"
                          className="flex items-center justify-center gap-2 h-[46px] px-4 py-3  bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl  text-white font-medium text-base shadow-sm hover:opacity-90 transition-all w-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails(order.orderId)
                          }}
                        >
                          View Details
                        </Button>
                      </div>

                      {idx < orderHistory.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="md:hidden space-y-4">
              {orderHistory.map((order) => (
                <Card
                  key={order.orderId}
                  className="shadow-none border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-lg text-gray-900">
                          {order.orderId}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {order.createdDate}
                        </div>
                      </div>
                      <Badge
                        variant={order.statusVariant}
                        className={`text-xs font-medium px-2 py-0.5 ${order.badgeClass}`}
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex gap-4 mb-4">
                      <img
                        src={order.image}
                        alt={order.device}
                        className="h-16 w-16 rounded-2xl bg-[#F9FAFB] object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900">
                          {order.device}
                        </p>
                        <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          {order.name || 'Customer'}
                        </div>
                        <p className="font-semibold text-lg bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent mt-2">
                          KES {order.loanAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full rounded-3xl border-[#F8971D] text-[#F8971D]"
                      onClick={() => handleViewDetails(order.orderId)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_protected/order_table/')({
  component: OrdersTableHistory,
})
