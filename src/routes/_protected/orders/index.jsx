import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Clock,
  XCircle,
  AlertCircle,
  Trash2,
  Calendar,
  Package,
  DollarSign,
} from 'lucide-react'
import { TrashIcon } from '@/assets/icons'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'

export const recentOrders = [
  {
    id: '1',
    orderId: 'REQ-20458',
    title: 'iPhone 14',
    specs:
      'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
    price: 87696,
    status: 'In Progress',
    statusColor: 'blue',
    image: '/phone.png',
    date: '28/10/2025 14:30:00',
    invoice: 'S-INV+0942801',
    amount: 87696,
    dispatchTo: 'John Doe, Westlands, Nairobi, 00100',
    statusText: 'PROCESSING',
    items: [
      {
        name: 'iPhone 14 - Midnight',
        qty: 1,
        price: 87696,
        total: 87696,
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      street: 'Westlands Road',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 87696,
      shipping: 0,
      total: 87696,
    },
    statusStep: 0, // 0 = Processing, 1 = On the way, 2 = Delivered
  },

  {
    id: '2',
    orderId: 'REQ-20459',
    title: 'iPhone 14',
    specs:
      'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
    price: 87696,
    status: 'Rejected',
    statusColor: 'red',
    image: '/phone.png',
    date: '27/10/2025 09:15:00',
    invoice: 'S-INV+0942802',
    amount: 87696,
    dispatchTo: 'Jane Mwangi, Kilimani, Nairobi',
    statusText: 'REJECTED',
    items: [
      {
        name: 'iPhone 14 - Midnight',
        qty: 1,
        price: 87696,
        total: 87696,
      },
    ],
    shippingAddress: {
      name: 'Jane Mwangi',
      street: 'Argwings Kodhek Rd',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 87696,
      shipping: 0,
      total: 87696,
    },
    statusStep: -1, // Rejected → no progress
  },

  {
    id: '3',
    orderId: 'REQ-20460',
    title: 'iPhone 14',
    specs:
      'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
    price: 87696,
    status: 'Pending Request',
    statusColor: 'yellow',
    image: '/phone.png',
    date: '26/10/2025 11:45:00',
    invoice: 'S-INV+0942803',
    amount: 87696,
    dispatchTo: 'Peter Kimani, Lavington, Nairobi',
    statusText: 'PENDING',
    items: [
      {
        name: 'iPhone 14 - Midnight',
        qty: 1,
        price: 87696,
        total: 87696,
      },
    ],
    shippingAddress: {
      name: 'Peter Kimani',
      street: 'James Gichuru Rd',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 87696,
      shipping: 0,
      total: 87696,
    },
    statusStep: 0,
  },

  {
    id: '4',
    orderId: 'GSO32912984',
    title: "Mara Moja Tablets 20's",
    specs: "Mara Moja Tablets 20's",
    price: 4000,
    status: 'In Transit',
    statusColor: 'blue',
    image: '/tablet.png',
    date: '29/10/2025 00:00:00',
    invoice: 'S-INV+0942812',
    amount: 4000,
    dispatchTo: 'Festus Sila Kenna House (Hse No. 14) Kilifi Close',
    statusText: 'COMPLETE',
    items: [
      { name: "Mara Moja Tablets 20's", qty: 1, price: 185.0, total: 185.0 },
      {
        name: "Visionace Plus Caps & Tablets 56's",
        qty: 1,
        price: 2220.0,
        total: 2220.0,
      },
      {
        name: 'St Ives Soothing Chamomile Facial Cleanser 200ml',
        qty: 1,
        price: 1595.0,
        total: 1595.0,
      },
    ],
    shippingAddress: {
      name: 'Festus Sila',
      street: 'Kilifi Close, Hse No. 14',
      city: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    summary: {
      subtotal: 4000,
      shipping: 0,
      total: 4000,
    },
    statusStep: 1,
  },
]

function OrdersPage() {
  const navigate = useNavigate()

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
    { label: 'My Order History', path: `/orderHistory`, isCurrent: true },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="w-3 h-3" />
      case 'Rejected':
        return <XCircle className="w-3 h-3" />
      case 'Pending Request':
        return <AlertCircle className="w-3 h-3" />
      default:
        return null
    }
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
        return ''
    }
  }

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
    const map = {
      orange: 'from-orange-500 to-amber-500',
    }
    return map[color] || map.orange
  }

  const handleImageClick = (orderId) => {
    navigate({ to: `/orders/${orderId}` })
  }

  return (
    <div className="min-h-screen">
      <BreadCrumbs items={breadcrumbItems} className="px-0 pt-4 md:pt-8" />
      <main className="mx-auto px-4 sm:px-4 lg:px-4 py-4">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          My Order History
        </h1>
        <p className="text-gray-600 mb-8">Overview of all of your activities</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Recent Orders */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="font-medium text-2xl">
                  Recent Orders
                </CardTitle>
                <Separator className="my-4" />
              </CardHeader>

              <CardContent className="space-y-0">
                {recentOrders.map((order, idx) => {
                  const gradient = getGradient(order.statusColor)

                  return (
                    <div key={order.id}>
                      {/* Desktop & Tablet View */}
                      <div
                        className="hidden sm:flex gap-4 py-3 items-start cursor-pointer"
                        onClick={() => handleImageClick(order.orderId)}
                      >
                        <div className="flex-shrink-0 rounded-2xl bg-brand-bg-2 p-3 overflow-hidden">
                          <img
                            src={order.image}
                            alt={order.title}
                            className="h-14 w-14 object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-lg text-gray-900 truncate">
                              {order.title}
                            </h4>

                            <p className="text-base text-gray-600 leading-snug mt-1 whitespace-pre-line">
                              {order.specs.replace(
                                'Midnight +',
                                'Midnight +\n',
                              )}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${getStatusClasses(
                                order.statusColor,
                              )}`}
                            >
                              <span className="ml-1">{order.status}</span>
                            </Badge>

                            <p
                              className={`font-bold text-lg bg-linear-to-r ${gradient} bg-clip-text text-transparent whitespace-nowrap lg:mt-10`}
                            >
                              KES {order.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div
                        className="sm:hidden py-3 cursor-pointer"
                        onClick={() => handleImageClick(order.orderId)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 rounded-xl bg-brand-bg-2 p-2 overflow-hidden h-fit">
                            <img
                              src={order.image}
                              alt={order.title}
                              className="h-12 w-12 object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-medium text-base text-gray-900">
                                {order.title}
                              </h4>
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${getStatusClasses(
                                  order.statusColor,
                                )}`}
                              >
                                {order.status}
                              </Badge>
                            </div>

                            <p className="font-sans text-base font-normal leading-relaxed text-[#676D75] flex-none order-1 self-stretch flex-grow-0">
                              {order.specs}
                            </p>

                            <div className="flex justify-end">
                              <p
                                className={`font-bold text-sm bg-linear-to-r ${gradient} bg-clip-text text-transparent`}
                              >
                                KES {order.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {idx < recentOrders.length - 1 && (
                        <Separator className="my-3" />
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Cart & Loan Status */}
          <div className="space-y-6">
            {/* Your Cart */}
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="font-medium text-2xl">
                  Your Cart
                </CardTitle>
                <Separator className="my-4" />
              </CardHeader>

              <CardContent>
                <h2 className="mb-2 -mt-6 font-public-sans font-medium text-[18px] leading-[140%] capitalize text-black flex-none order-0 self-stretch grow-0">
                  Product
                </h2>

                <div className="flex flex-col gap-4 p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-brand-bg-2 p-4 shrink-0">
                      <img
                        src="/phone.png"
                        alt="iPhone 14"
                        className="w-16 h-16 rounded-lg object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-lg">iPhone 14</h4>
                      <p className="font-sans text-base font-normal leading-relaxed text-[#676D75] flex-none order-1 self-stretch flex-grow-0">
                        iPhone 14 - 6.1" - 6GB RAM-128 GB ROM-Midnight +
                        free(Cover + Screen Protector)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full text-lg flex items-center justify-center"
                      >
                        −
                      </Button>

                      <span className="w-10 text-center text-lg">1</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full text-lg flex items-center justify-center mb-0.5"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-red-600 hover:bg-red-50 mb-1"
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button
                  variant="gradient"
                  className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
             text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
                >
                  Proceed To Payment
                </Button>
              </CardContent>
            </Card>

            {/* Loan Application Status */}
            <Card className="shadow-none -mt-2">
              <CardHeader>
                <CardTitle className="text-2xl font-medium">
                  Loan Application Status
                </CardTitle>
                <Separator className="my-2" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-public-sans font-medium text-[18px] leading-[140%] capitalize text-black flex-none order-0 self-stretch grow-0">
                    Pending
                  </h2>

                  <span className="text-sm text-green-600">70%</span>
                </div>
                <p className="mx-auto font-public-sans font-medium text-[12px] leading-[140%] flex items-center text-[#676D75] flex-none order-0 grow-0 mb-1">
                  Your Progress
                </p>

                <Progress value={70} className="h-3 rounded-full" />
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             border border-[#F8971D] text-[#F8971D] rounded-3xl 
             font-medium text-base hover:bg-[#F8971D]/10 transition-all"
                  >
                    View Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order History - Desktop Table */}
        <Card className="shadow-none mt-10 hidden md:block">
          <CardHeader>
            <CardTitle className="font-medium text-2xl">
              Order History
            </CardTitle>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderHistory.map((order, idx) => (
                  <TableRow
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-brand-bg-2' : ''}
                  >
                    <TableCell className="text-[15px] text-[#252525] font-sans">
                      {order.orderId}
                    </TableCell>
                    <TableCell className="text-[15px] text-[#252525] font-sans">
                      {order.createdDate}
                    </TableCell>
                    <TableCell className="text-[15px] text-[#252525] font-sans">
                      {order.device}
                    </TableCell>
                    <TableCell className="text-[15px] text-[#252525] font-sans">
                      {order.loanAmount.toLocaleString()} KES
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={order.statusVariant}
                        className={getStatusBadgeClasses(order.status)}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-orange-600 text-[15px] font-medium underline underline-offset-2 hover:text-orange-700 hover:underline cursor-pointer"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order History - Mobile Cards */}
        <div className="md:hidden mt-10 space-y-4">
          <h2 className="font-medium text-2xl text-gray-900 mb-4">
            Order History
          </h2>
          {orderHistory.map((order, idx) => (
            <Card key={idx} className="shadow-none">
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
                    className={getStatusBadgeClasses(order.status)}
                  >
                    {order.status}
                  </Badge>
                </div>

                <Separator className="my-3" />

                <div className="space-y-2">
                  <div className="flex items-start">
                    <Package className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Device</p>
                      <p className="text-sm font-medium text-gray-900">
                        {order.device}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Loan Amount</p>
                      <p className="text-sm font-medium text-gray-900">
                        {order.loanAmount.toLocaleString()} KES
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="link"
                  size="sm"
                  className="text-orange-600 text-sm font-medium underline underline-offset-2 hover:text-orange-700 hover:underline cursor-pointer p-0 mt-3 h-auto"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
// In parent route (orders/index.jsx)
export const Route = createFileRoute('/_protected/orders/')({
  component: OrdersPage,
  loader: () => ({ recentOrders }),

})


