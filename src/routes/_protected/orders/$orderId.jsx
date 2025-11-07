import React, { useMemo } from 'react'
import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import {
  Package,
  MapPin,
  Truck,
  Store,
  ListCheck,
  Loader2,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { recentOrders } from './index'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { comma } from '@/lib/utils'
import {
  useGetOrderDetail,
  useUpdateOrder,
  useCreateOrder,
} from '@/lib/queries/orders'

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

const mapStatusToStep = (status = '') => {
  const normalized = status.toLowerCase()
  if (['declined', 'rejected', 'cancelled'].includes(normalized)) return -1
  if (['pending', 'processing', 'requested'].includes(normalized)) return 0
  if (['approved', 'on the way', 'shipped'].includes(normalized)) return 1
  if (['fulfilled', 'delivered', 'completed'].includes(normalized)) return 2
  return 0
}

const getStatusBadgeClasses = (status) => {
  const normalized = (status || '').toLowerCase()
  if (['fulfilled', 'delivered', 'completed'].includes(normalized)) {
    return 'bg-green-100 text-green-800'
  }
  if (
    ['approved', 'on the way', 'shipped', 'processing'].includes(normalized)
  ) {
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

const buildDeliveryFromDetail = (shippingDetail = {}, customer = {}) => {
  const recipientName =
    shippingDetail.recipientName || customer.fullName || 'Recipient'
  const [firstName = '', ...rest] = recipientName.split(' ')
  const lastName = rest.join(' ')
  const deliveryType = (shippingDetail.type || '').toLowerCase()
  return {
    type: deliveryType === 'pickup' ? 'pickup' : 'door',
    recipient: {
      firstName,
      lastName,
      phone:
        shippingDetail.recipientPhoneNumber ||
        shippingDetail.recipient?.phone ||
        customer.phoneNumber ||
        '',
    },
    region: shippingDetail.region || '',
    address: shippingDetail.recipientAddress || shippingDetail.address || '',
    pickupStore: shippingDetail.store || shippingDetail.pickupStore || '',
  }
}

const normalizeApiOrderDetail = (order) => {
  if (!order) return null
  const reference =
    order.quoteReference || order.orderId || order.id || 'ORDER-DETAIL'
  const orderLines = Array.isArray(order.orderLines) ? order.orderLines : []
  const items = orderLines.map((line) => {
    const qty = Number(line?.quantity) || 0
    const unitPrice = Number(line?.unitPrice) || 0
    return {
      name: line?.name || line?.sku || 'Item',
      qty,
      price: unitPrice,
      total: qty * unitPrice,
    }
  })
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const shippingFee = Number(order?.shippingDetail?.shippingFee) || 0
  const status = order.status || 'Pending'

  return {
    orderId: ensureDisplayOrderId(reference),
    rawReference: sanitizeOrderReference(reference),
    date: formatOrderDate(order.orderDate || order.createdDate || order.date),
    status,
    statusStep: mapStatusToStep(status),
    image: orderLines[0]?.image || DEFAULT_ORDER_IMAGE,
    title: orderLines[0]?.name || 'BNPL Order',
    specs:
      orderLines[0]?.description || `${items.length || 1} item${items.length === 1 ? '' : 's'}`,
    price: Number(order.totalAmount) || subtotal,
    delivery: buildDeliveryFromDetail(order.shippingDetail || {}, order.customer || {}),
    items: items.length ? items : order.items || [],
    summary: {
      subtotal,
      shipping: shippingFee,
      total: Number(order.totalAmount) || subtotal + shippingFee,
    },
    raw: order,
    rawCustomer: order.customer,
    rawOrderLines: order.orderLines,
    rawShippingDetail: order.shippingDetail,
    rawCreditData: order.creditData,
    rawUserConsents: order.userConsents,
    rawDocuments: order.documents,
  }
}

const normalizeMockOrderDetail = (order) => ({
  ...order,
  orderId: ensureDisplayOrderId(order.orderId),
  date: order.date || order.createdDate || '—',
  status: order.status || order.statusText || 'Pending',
  statusStep:
    typeof order.statusStep === 'number'
      ? order.statusStep
      : mapStatusToStep(order.status || order.statusText || 'Pending'),
  items: Array.isArray(order.items) ? order.items : [],
  summary:
    order.summary || {
      subtotal: order.amount || 0,
      shipping: 0,
      total: order.amount || 0,
    },
  image: order.image || DEFAULT_ORDER_IMAGE,
  rawReference: sanitizeOrderReference(order.orderId),
  rawCustomer: order.customer,
  rawOrderLines: order.orderLines,
  rawShippingDetail: order.shippingDetail,
  rawCreditData: order.creditData,
  rawUserConsents: order.userConsents,
  rawDocuments: order.documents,
})

const steps = [
  { id: 1, label: 'Processing' },
  { id: 2, label: 'On the way' },
  { id: 3, label: 'Delivered' },
]

function OrderStepper({ steps, currentStep, isRejected }) {

  return (
    <div className="w-full">
      {/* ---------- Desktop ---------- */}
      <div className="hidden md:block">
        <div className="flex items-center mb-3">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="relative shrink-0">
                {step.id < currentStep ? (
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                ) : step.id === currentStep ? (
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                  </div>
                )}
              </div>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={`h-[3px] flex-1 mx-2 ${
                    step.id < currentStep ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Labels */}
        <div className="flex items-center relative">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="shrink-0" style={{ width: '40px' }}>
                <p
                  className={`text-base font-medium leading-[1.4] whitespace-nowrap ${
                    step.id <= currentStep ? 'text-[#0D0B26]' : 'text-gray-400'
                  } ${
                    idx === 0
                      ? 'text-left'
                      : idx === steps.length - 1
                        ? 'text-right absolute -mt-2.5 right-0'
                        : 'text-center -translate-x-1/2'
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {idx < steps.length - 1 && <div className="flex-1" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ---------- Mobile ---------- */}
      <div className="block md:hidden">
        {/* Circles + Lines */}
        <div className="flex items-center mb-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              {/* Circle */}
              <div className="relative shrink-0">
                {step.id < currentStep ? (
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                ) : step.id === currentStep ? (
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                )}
              </div>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={`h-[2px] flex-1 ${
                    step.id < currentStep ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Labels */}
        <div className="flex items-start justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className="text-center flex-1 first:text-left last:text-right"
            >
              <p
                className={`text-[10px] font-medium leading-tight ${
                  step.id <= currentStep ? 'text-[#0D0B26]' : 'text-gray-400'
                }`}
                style={{
                  wordBreak: 'break-word',
                  maxWidth: '60px',
                  margin: '0 auto',
                }}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrderDetailsPage() {
  const { orderId } = useParams({ from: '/_protected/orders/$orderId' })
  const navigate = useNavigate()
  const { data, isPending, isError, refetch } = useGetOrderDetail(orderId)
  const fallbackOrder = useMemo(
    () =>
      recentOrders.find(
        (o) => sanitizeOrderReference(o.orderId) === sanitizeOrderReference(orderId),
      ),
    [orderId],
  )

  const order = useMemo(() => {
    if (Array.isArray(data?.data) && data.data.length) {
      return normalizeApiOrderDetail(data.data[0])
    }
    if (fallbackOrder) {
      return normalizeMockOrderDetail(fallbackOrder)
    }
    return null
  }, [data, fallbackOrder])

  const updateOrderMutation = useUpdateOrder()
  const createOrderMutation = useCreateOrder()

  if (isPending && !order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg text-gray-600">
          {isError
            ? 'We could not retrieve this order right now.'
            : 'Order not found.'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="gradient" onClick={() => navigate({ to: '/orders' })}>
            Back to orders
          </Button>
          {isError && (
            <Button variant="outline" onClick={() => refetch()}>
              Try again
            </Button>
          )}
        </div>
      </div>
    )
  }

  const currentStep = order.statusStep === -1 ? 0 : order.statusStep + 1
  const isRejected = order.statusStep === -1

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Order History', path: '/orders' },
    { label: `Order ${order.orderId}`, path: `#`, isCurrent: true },
  ]

  const canAcknowledge =
    order.statusStep >= 0 &&
    order.statusStep < steps.length &&
    Boolean(order.rawReference)

  const canReorder = Boolean(
    order.rawCustomer &&
      Array.isArray(order.rawOrderLines) &&
      order.rawOrderLines.length,
  )

  const handleMarkAsReceived = () => {
    if (!order.rawReference) return
    updateOrderMutation.mutate({
      orderId: order.rawReference,
      status: 'Fulfilled',
    })
  }

  const handleReorder = () => {
    if (!canReorder) return
    createOrderMutation.mutate({
      customer: order.rawCustomer,
      orderLines: order.rawOrderLines,
      shippingDetail: order.rawShippingDetail,
      creditData: order.rawCreditData || {},
      userConsents: order.rawUserConsents || [],
      documents: order.rawDocuments || [],
    })
  }
  return (
    <div className="min-h-screen">
      <BreadCrumbs items={breadcrumbItems} className="px-4 pt-6 md:pt-8" />
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* === Stepper === */}
        <div className="mb-8">
          <OrderStepper
            steps={steps}
            currentStep={currentStep}
            isRejected={isRejected}
          />
        </div>
        {/* === Order Summary Card === */}
        <Card className="shadow-none">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">Order {order.orderId}</CardTitle>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              {/* UPDATED BADGE – uses the helper */}
              <Badge
                className={`text-sm ${getStatusBadgeClasses(order.status)}`}
              >
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product */}
            <div className="flex gap-4">
              <img
                src={order.image}
                alt={order.title}
                className="w-16 h-16 rounded-lg object-contain bg-gray-100"
              />
              <div>
                <h4 className="font-medium">{order.title}</h4>
                <p className="text-sm text-gray-600">
                  {order.specs.split(' + ')[0]}
                </p>
                <p className="font-bold text-orange-600 mt-1">
                  KES {order.price.toLocaleString()}
                </p>
              </div>
            </div>
            <Separator />
            {/* Delivery Info */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                {order.delivery.type === 'door' ? (
                  <Truck className="w-5 h-5" />
                ) : (
                  <Store className="w-5 h-5" />
                )}
                Delivery Method
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-medium capitalize">
                  {order.delivery.type === 'door'
                    ? 'Door Delivery'
                    : 'Pickup Station'}
                </p>
                <p className="text-gray-600">
                  {order.delivery.recipient.firstName}{' '}
                  {order.delivery.recipient.lastName} •{' '}
                  {order.delivery.recipient.phone}
                </p>
                {order.delivery.type === 'door' ? (
                  <p className="text-gray-600 flex items-start gap-1">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    {order.delivery.address}
                  </p>
                ) : (
                  <p className="text-gray-600 flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    Pickup at:{' '}
                    <span className="font-medium">
                      {order.delivery.pickupStore || 'To be confirmed'}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <Separator />
            {/* === NEW: Items Table / Mobile Cards === */}
            <div className="mt-8">
              {/* Desktop Table */}

              <div className="hidden md:block">
                <Card className="shadow-none">
                  <CardHeader className="pb-2 pt-4 -mt-8">
                    {' '}
                    <CardTitle className="font-medium flex items-center gap-2 text-black text-md">
                      <ListCheck className="w-4 h-4" />
                      Items({order.items.length})
                    </CardTitle>
                    <Separator className="my-2" />{' '}
                  </CardHeader>
                  <CardContent className="-mt-8">
                    {' '}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-sans text-base font-normal leading-snug text-gray-600">
                            Name
                          </TableHead>
                          <TableHead className="text-center font-sans text-base font-normal leading-snug text-gray-600">
                            Qty
                          </TableHead>
                          <TableHead className="text-right font-sans text-base font-normal leading-snug text-gray-600">
                            Price
                          </TableHead>
                          <TableHead className="text-right font-sans text-base font-normal leading-snug text-gray-600">
                            Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((item, idx) => (
                          <TableRow
                            key={idx}
                            className={idx % 2 === 0 ? 'bg-brand-bg-2' : ''}
                          >
                            <TableCell className="font-sans text-md font-medium text-[#252525] capitalize py-2">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-center font-sans text-md font-medium text-[#252525] capitalize py-2">
                              {item.qty}
                            </TableCell>
                            <TableCell className="text-right font-sans text-md font-medium text-[#252525] capitalize py-2">
                              KES {comma(item.price.toFixed(2))}
                            </TableCell>
                            <TableCell className="text-right font-sans text-md font-medium text-[#252525] capitalize py-2">
                              KES {comma(item.total.toFixed(2))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Cards */}

              <div className="block md:hidden space-y-3">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <ListCheck className="w-5 h-5" />
                  Items ({order.items.length})
                </h4>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      data-odd={idx % 2 === 1}
                      className="
          rounded-lg bg-gray-50 p-3 
          data-[odd=true]:bg-brand-bg-2
          flex flex-col gap-1.5
        "
                    >
                      {/* Item Name – Bold & Prominent */}
                      <p className="font-medium text-sm text-[#252525] capitalize">
                        Item : {item.name}
                      </p>

                      {/* Qty + Unit Price – Compact Side-by-Side */}
                      <div className="flex justify-between text-xs text-black">
                        <span>Qty : {item.qty}</span>
                        <span className="mt-4">
                          Amount: KES{' '}
                          {item.price.toLocaleString('en-KE', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>

                      {/* Total – Right-Aligned, Slightly Larger & Bold */}
                      <div className="flex justify-end text-sm font-semibold text-[#252525]">
                        Total: KES{' '}
                        {item.total.toLocaleString('en-KE', {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Summary */}
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>KES {order.summary.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="">
                {order.summary.shipping === 0
                  ? 'Free'
                  : `KES ${order.summary.shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-gradient-to-b from-[#F8971D] to-[#EE3124]">
                KES {order.summary.total.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-3 pt-4 md:flex-row">
              <Button
                variant="gradient"
                disabled={!canAcknowledge || updateOrderMutation.isPending}
                onClick={handleMarkAsReceived}
                className="w-full rounded-3xl md:w-1/2"
              >
                {updateOrderMutation.isPending
                  ? 'Updating...'
                  : 'Mark as received'}
              </Button>

              <Button
                variant="outline"
                disabled={!canReorder || createOrderMutation.isPending}
                onClick={handleReorder}
                className="w-full rounded-3xl border-[#F8971D] text-[#F8971D] md:w-1/2"
              >
                {createOrderMutation.isPending ? 'Reordering...' : 'Reorder this order'}
              </Button>
            </div>
          </CardContent>
        </Card>

      
        <div className="mt-6">
          <div className="flex flex-col md:flex-row gap-3 justify-center items-stretch">
            {/* Back to Orders – Gradient */}
            <Button
              variant="gradient"
              size="sm"
              className="
        flex items-center justify-center gap-2 
        h-12 px-6 py-3 
        bg-gradient-to-b from-[#F8971D] to-[#EE3124] 
        rounded-full 
        text-white font-medium text-base 
        shadow-sm hover:opacity-90 transition-opacity 
        w-full md:w-auto md:flex-1 md:max-w-[200px]
      "
              onClick={() => navigate({ to: '/orders' })}
            >
              Back to Orders
            </Button>

            {/* Back to Home – Outline */}
            <Button
              variant="outline"
              size="sm"
              className="
        flex items-center justify-center gap-2 
        h-12 px-6 py-3 
        border border-[#F8971D] text-[#F8971D] 
        rounded-full 
        font-medium text-base 
        hover:bg-[#F8971D]/10 transition-colors 
        w-full md:w-auto md:flex-1 md:max-w-[200px]
      "
              onClick={() => navigate({ to: '/' })}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export const Route = createFileRoute('/_protected/orders/$orderId')({
  component: OrderDetailsPage,
})
