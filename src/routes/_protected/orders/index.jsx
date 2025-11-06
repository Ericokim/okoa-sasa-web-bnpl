import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Package, DollarSign } from 'lucide-react'
import { TrashIcon } from '@/assets/icons'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { Progress } from '@/components/ui/progress'

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

function OrdersPage() {
  const navigate = useNavigate()

  // Get all orders api call goes here

  // const {
  //   data: orderHistory,
  //   isLoading: isOrderHistoryLoading,
  //   error: orderHistoryError,
  // } = useProducts();

  // console.log(orderHistory)

  const orderHistory = [
    {
      orderId: '#REQ-20458',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'Pending',
      statusVariant: 'secondary',
    },
    {
      orderId: '#REQ-20459',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'Approved',
      statusVariant: 'default',
    },
    {
      orderId: '#REQ-20460',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'Fulfilled',
      statusVariant: 'success',
    },
    {
      orderId: '#REQ-20461',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'Declined',
      statusVariant: 'destructive',
    },
  ]

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Order History', path: `/orders`, isCurrent: true },
  ]

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Fulfilled':
        return 'bg-green-100 text-green-800'
      case 'Approved':
        return 'bg-blue-100 text-blue-800'
      case 'Declined':
        return 'bg-red-100 text-red-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return ''
    }
  }

  const getGradient = (color) => {
    const map = { orange: 'from-orange-500 to-amber-500' }
    return map[color] || map.orange
  }

  const handleViewDetails = (orderId) => {
    navigate({ to: `/orders/${orderId.replace('#', '')}` })
  }

  const getStatusClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700 border border-blue-200'
      case 'red':
        return 'bg-red-100 text-red-700 border border-red-200'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
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

        {/* Order History - Responsive Layout */}
        <div className="-mt-2">
          <div className="hidden md:block">
            <Card className="shadow-none overflow-hidden">
              <CardContent className="">
                {orderHistory.map((order, idx) => {
                  const matched = recentOrders.find(
                    (ro) => ro.orderId === order.orderId.replace('#', ''),
                  ) || { image: '/phone.png', title: order.device }

                  return (
                    <div key={order.orderId}>
                      <div
                        className="flex gap-4 py-1 px-6 items-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleViewDetails(order.orderId)}
                      >
                        {/* Image */}
                        <div className="shrink-0 rounded-2xl bg-brand-bg-2 p-3 overflow-hidden">
                          <img
                            src={matched.image}
                            alt={order.device}
                            className="h-22 w-22 object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-lg text-gray-900 truncate">
                            {order.device}.{' '}
                            <Badge
                              variant="secondary"
                              className={`self-end text-xs font-medium px-2 py-0.5 mx-2 rounded-full ${getStatusBadgeClasses(
                                order.status,
                              )}`}
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
                            handleViewDetails(order.orderId)
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
            {orderHistory.map((order) => {
              const matched = recentOrders.find(
                (ro) => ro.orderId === order.orderId.replace('#', ''),
              ) || { image: '/phone.png' }

              return (
                <Card
                  key={order.orderId}
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
                          src={matched.image}
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
                          handleViewDetails(order.orderId)
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
  loader: () => ({ recentOrders }),
})
