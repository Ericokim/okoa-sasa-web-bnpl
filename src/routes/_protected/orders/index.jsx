import { useMemo } from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Package, DollarSign, Loader2 } from 'lucide-react'
import { TrashIcon } from '@/assets/icons'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { Progress } from '@/components/ui/progress'
import { useGetOrdersList } from '@/lib/queries/orders'

export const recentOrders = [
  {
    id: '1',
    orderId: 'REQ-20458',
    title: 'Samsung Galaxy A35',
    specs: 'Samsung Galaxy A35 - 6.4" - 8GB RAM - 128GB ROM - Awesome Navy',
    price: 38500,
    status: 'Pending', // From orderHistory
    statusColor: 'yellow',
    statusVariant: 'secondary', // From orderHistory
    image: '/phone.png',
    date: '12/10/2025 14:30:00',
    invoice: 'S-INV+0942801',
    amount: 38500,
    dispatchTo: 'Jane Mwangi, Westlands, Nairobi, 00100',
    statusText: 'PENDING',
    items: [
      {
        name: 'Samsung Galaxy A35 - Navy',
        qty: 1,
        price: 38500,
        total: 38500,
      },
    ],
    delivery: {
      type: 'door',
      recipient: {
        firstName: 'Jane',
        lastName: 'Mwangi',
        phone: '+254712345678',
      },
      region: 'nairobi',
      address: 'Westlands Road, Nairobi, 00100, Kenya',
      pickupStore: null,
    },
    shippingAddress: {
      name: 'Jane Mwangi',
      street: 'Westlands Road',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 38500,
      shipping: 0,
      total: 38500,
    },
    statusStep: 0, // Pending → first step
  },

  {
    id: '2',
    orderId: 'REQ-20459',
    title: 'Samsung Galaxy A35',
    specs: 'Samsung Galaxy A35 - 6.4" - 8GB RAM - 128GB ROM - Awesome Navy',
    price: 38500,
    status: 'Approved', // From orderHistory
    statusColor: 'blue',
    statusVariant: 'default', // From orderHistory
    image: '/phone.png',
    date: '12/10/2025 09:15:00',
    invoice: 'S-INV+0942802',
    amount: 38500,
    dispatchTo: 'Jane Mwangi, Kilimani, Nairobi',
    statusText: 'APPROVED',
    items: [
      {
        name: 'Samsung Galaxy A35 - Navy',
        qty: 1,
        price: 38500,
        total: 38500,
      },
    ],
    delivery: {
      type: 'pickup',
      recipient: {
        firstName: 'Jane',
        lastName: 'Mwangi',
        phone: '+254798765432',
      },
      region: 'nairobi',
      address: null,
      pickupStore: 'City Center Post',
    },
    shippingAddress: {
      name: 'Jane Mwangi',
      street: 'Argwings Kodhek Rd',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 38500,
      shipping: 0,
      total: 38500,
    },
    statusStep: 1, // Approved → "On the way"
  },

  {
    id: '3',
    orderId: 'REQ-20460',
    title: 'Samsung Galaxy A35',
    specs: 'Samsung Galaxy A35 - 6.4" - 8GB RAM - 128GB ROM - Awesome Navy',
    price: 38500,
    status: 'Fulfilled', // From orderHistory
    statusColor: 'green',
    statusVariant: 'success', // From orderHistory
    image: '/phone.png',
    date: '12/10/2025 11:45:00',
    invoice: 'S-INV+0942803',
    amount: 38500,
    dispatchTo: 'Jane Mwangi, Lavington, Nairobi',
    statusText: 'FULFILLED',
    items: [
      {
        name: 'Samsung Galaxy A35 - Navy',
        qty: 1,
        price: 38500,
        total: 38500,
      },
    ],
    delivery: {
      type: 'door',
      recipient: {
        firstName: 'Jane',
        lastName: 'Mwangi',
        phone: '+254711223344',
      },
      region: 'nairobi',
      address: 'James Gichuru Rd, Lavington, Nairobi, 00100',
      pickupStore: null,
    },
    shippingAddress: {
      name: 'Jane Mwangi',
      street: 'James Gichuru Rd',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 38500,
      shipping: 0,
      total: 38500,
    },
    statusStep: 2, // Fulfilled → final step "Delivered"
  },

  {
    id: '4',
    orderId: 'REQ-20461',
    title: 'Samsung Galaxy A35',
    specs: 'Samsung Galaxy A35 - 6.4" - 8GB RAM - 128GB ROM - Awesome Navy',
    price: 38500,
    status: 'Declined', // From orderHistory
    statusColor: 'red',
    statusVariant: 'destructive', // From orderHistory
    image: '/phone.png',
    date: '12/10/2025 16:20:00',
    invoice: 'S-INV+0942804',
    amount: 38500,
    dispatchTo: 'Jane Mwangi, Karen, Nairobi',
    statusText: 'DECLINED',
    items: [
      {
        name: 'Samsung Galaxy A35 - Navy',
        qty: 1,
        price: 38500,
        total: 38500,
      },
    ],
    delivery: {
      type: 'pickup',
      recipient: {
        firstName: 'Jane',
        lastName: 'Mwangi',
        phone: '+254722334455',
      },
      region: 'nairobi',
      address: null,
      pickupStore: 'Westlands Station',
    },
    shippingAddress: {
      name: 'Jane Mwangi',
      street: 'Ngong Road',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 38500,
      shipping: 0,
      total: 38500,
    },
    statusStep: -1, // Declined → rejected
  },
]

const DEFAULT_ORDER_IMAGE = '/phone.png'

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

const calculateOrderLineTotals = (orderLines = []) => {
  if (!Array.isArray(orderLines)) return { subtotal: 0 }
  const subtotal = orderLines.reduce((sum, line) => {
    const qty = Number(line?.quantity) || 0
    const price = Number(line?.unitPrice) || 0
    return sum + qty * price
  }, 0)
  return { subtotal }
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

const getStatusBadgeClasses = (status) => {
  const normalized = (status || '').toLowerCase()
  if (['fulfilled', 'delivered', 'completed'].includes(normalized)) {
    return 'bg-green-100 text-green-800'
  }
  if (['approved', 'on the way', 'shipped', 'processing'].includes(normalized)) {
    return 'bg-blue-100 text-blue-800'
  }
  if (['declined', 'rejected', 'cancelled'].includes(normalized)) {
    return 'bg-red-100 text-red-800'
  }
  if (['pending', 'requested'].includes(normalized)) {
    return 'bg-yellow-100 text-yellow-800'
  }
  return 'bg-gray-100 text-gray-700'
}

const normalizeApiOrderForList = (order, index = 0) => {
  if (!order) return null
  const reference =
    order.quoteReference || order.orderId || order.id || `ORD-${index + 1}`
  const orderLines = Array.isArray(order.orderLines) ? order.orderLines : []
  const { subtotal } = calculateOrderLineTotals(orderLines)
  const totalAmount =
    Number(order.totalAmount) ||
    Number(order.amount) ||
    Number(order.loanAmount) ||
    subtotal

  return {
    key: sanitizeOrderReference(reference),
    linkId: sanitizeOrderReference(reference) || `${index}`,
    orderId: ensureDisplayOrderId(reference),
    displayId: ensureDisplayOrderId(reference),
    createdDate: formatOrderDate(order.orderDate || order.createdDate || order.date),
    name: order.customer?.fullName || order.customer?.name || order.name || '',
    device:
      orderLines[0]?.name || order.title || order.device || 'BNPL Order',
    loanAmount: totalAmount,
    status: order.status || order.statusText || 'Pending',
    statusVariant: mapStatusVariant(order.status || order.statusText || 'Pending'),
    badgeClass: getStatusBadgeClasses(order.status || order.statusText || 'Pending'),
    image: orderLines[0]?.image || order.image || DEFAULT_ORDER_IMAGE,
    raw: order,
  }
}

const normalizeMockOrderForList = (order, index = 0) => {
  const ref = order.orderId || `ORD-${index + 1}`
  return {
    key: sanitizeOrderReference(ref),
    linkId: sanitizeOrderReference(ref) || `${index}`,
    orderId: ensureDisplayOrderId(ref),
    displayId: ensureDisplayOrderId(ref),
    createdDate: formatOrderDate(order.date || order.createdDate),
    name: order.dispatchTo?.split(',')?.[0] || 'Customer',
    device: order.title || order.name || 'BNPL Order',
    loanAmount: order.amount || order.price || order.loanAmount || 0,
    status: order.statusText || order.status || 'Pending',
    statusVariant: mapStatusVariant(order.statusText || order.status || 'Pending'),
    badgeClass: getStatusBadgeClasses(order.statusText || order.status || 'Pending'),
    image: order.image || DEFAULT_ORDER_IMAGE,
    raw: order,
  }
}

function OrdersPage() {
  const navigate = useNavigate()
  const { data, isPending, isError, refetch } = useGetOrdersList()

  const hasApiOrders = Array.isArray(data?.data) && data.data.length > 0

  const orderHistory = useMemo(() => {
    const source = hasApiOrders ? data.data : recentOrders
    return source
      .map((order, index) =>
        hasApiOrders
          ? normalizeApiOrderForList(order, index)
          : normalizeMockOrderForList(order, index),
      )
      .filter(Boolean)
  }, [data, hasApiOrders])

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Order History', path: `/orders`, isCurrent: true },
  ]

  const handleViewDetails = (order) => {
    const reference =
      typeof order === 'string'
        ? order
        : order?.linkId || order?.orderId || order?.displayId
    if (!reference) return
    navigate({
      to: '/orders/$orderId',
      params: { orderId: sanitizeOrderReference(reference) },
    })
  }

  return (
    <div className="min-h-screen">
      <BreadCrumbs
        items={breadcrumbItems}
        className="px-0 pt-4 md:pt-8 -ml-3"
      />
      <main className="w-full flex flex-col py-4">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          My Order History
        </h1>
        <p className="text-gray-600 mb-8">Overview of all of your activities</p>

        {isError && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load your latest orders at the moment.
            <button
              type="button"
              onClick={() => refetch()}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {isPending && !hasApiOrders && (
          <div className="mb-6 flex items-center gap-2 rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
            <span>Fetching your latest orders...</span>
          </div>
        )}

        {!isPending && orderHistory.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-600">
            <p className="mb-4 text-base">You haven't placed any orders yet.</p>
            <Link to="/" className="inline-block">
              <Button variant="gradient" className="rounded-3xl px-8">
                Browse devices
              </Button>
            </Link>
          </div>
        )}

        {/* Order History - Responsive Layout */}
        <div className="-mt-2">
          <div className="hidden md:block">
            <Card className="shadow-none overflow-hidden">
              <CardContent className="">
                {orderHistory.map((order, idx) => {
                  const orderKey = order.key || `${order.orderId}-${idx}`

                  return (
                    <div key={orderKey}>
                      <div
                        className="flex gap-4 py-1 px-6 items-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleViewDetails(order)}
                      >
                        {/* Image */}
                        <div className="shrink-0 rounded-2xl bg-brand-bg-2 p-3 overflow-hidden">
                          <img
                            src={order.image}
                            alt={order.device}
                            className="h-22 w-22 object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-lg text-gray-900 truncate">
                            {order.device}.{' '}
                            <Badge
                              variant={order.statusVariant || 'secondary'}
                              className={`self-end text-xs font-medium px-2 py-0.5 mx-2 rounded-full ${order.badgeClass}`}
                            >
                              {order.status}
                            </Badge>
                          </h4>

                          {/* Increased spacing using • with extra space */}
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

                          {/* Gradient price – unchanged */}
                          <p
                            className={`font-bold text-lg  bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent whitespace-nowrap`}
                          >
                            KES {order.loanAmount.toLocaleString()}
                          </p>
                        </div>

                        {/* View Details */}

                        <Button
                          variant="gradient"
                          size="sm"
                          className="flex items-center justify-center gap-2 h-[46px] px-4 py-3 
                           bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                          text-white font-medium text-base shadow-sm hover:opacity-90 transition-all w-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails(order)
                          }}
                        >
                          View Details
                        </Button>
                      </div>

                      {idx < orderHistory.length - 1 && (
                        <Separator className={'my-4'} />
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* ================== MOBILE – View  ================== */}
          <div className="md:hidden space-y-4">
            {orderHistory.map((order, idx) => {
              const orderKey = order.key || `${order.orderId}-${idx}`

              return (
                <Card
                  key={orderKey}
                  className="shadow-none border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <CardContent className="p-4">
                    {/* Header – Order ID + Date + Status */}
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
                        className={`text-xs font-medium px-2 py-0.5 ${getStatusBadgeClasses(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <Separator className="my-3" />

                    {/* Device + Image */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex-shrink-0 rounded-xl bg-brand-bg-2 p-2">
                        <img
                          src={order.image}
                          alt={order.device}
                          className="h-12 w-12 object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {order.device}
                        </p>
                        {order.name && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {order.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ----------  Loan Amount + View Details (same line) ---------- */}
                    <div className="flex items-center justify-between">
                      {/* Loan Amount */}
                      <div className="flex items-start">
                        <DollarSign className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Loan Amount</p>
                          <p className="text-sm font-semibold text-gray-900">
                            KES {order.loanAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Button
                        variant="gradient"
                        size="sm"
                        className="h-11 px-5 rounded-3xl bg-gradient-to-b from-[#F8971D] to-[#EE3124]
                         text-white font-medium text-base shadow-sm hover:opacity-90
                         transition-all whitespace-nowrap"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewDetails(order)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_protected/orders/')({
  component: OrdersPage,
})
