import { Link, createFileRoute } from '@tanstack/react-router'
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
import { Clock, XCircle, AlertCircle, Trash2 } from 'lucide-react'
import { TrashIcon } from '@/assets/icons'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'

function OrdersPage() {
  const recentOrders = [
    {
      id: '1',
      title: 'iPhone 14',
      specs:
        'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
      price: 87696,
      status: 'In Progress',
      statusColor: 'blue',
      image: '/phone.png',
    },
    {
      id: '2',
      title: 'iPhone 14',
      specs:
        'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
      price: 87696,
      status: 'Rejected',
      statusColor: 'red',
      image: '/phone.png',
    },
    {
      id: '3',
      title: 'iPhone 14',
      specs:
        'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
      price: 87696,
      status: 'Pending Request',
      statusColor: 'yellow',
      image: '/phone.png',
    },
    {
      id: '4',
      title: 'iPhone 14',
      specs:
        'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
      price: 87696,
      status: 'Pending Request',
      statusColor: 'yellow',
      image: '/phone.png',
    },
  ]

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

  const getGradient = (color) => {
    const map = {
      orange: 'from-orange-500 to-amber-500',
    }
    return map[color] || map.orange
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
                      {/* ---------- ROW ---------- */}
                      <div className="flex gap-4 py-3 items-start">
                        {/* Product image – fixed size */}
                        <div className="flex-shrink-0 rounded-2xl bg-brand-bg-2 p-3 overflow-hidden">
                          <img
                            src={order.image}
                            alt={order.title}
                            className="h-14 w-14 object-contain"
                          />
                        </div>

                        {/* Text + status/price – responsive wrapper */}
                        <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                          {/* Title + specs */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-lg text-gray-900 truncate">
                              {order.title}
                            </h4>

                            <div className="mt-1 space-y-0.5">
                              <p className="text-base text-gray-600 leading-snug">
                                {order.specsLine1 ||
                                  'iPhone 14 - 6.1" - 6GB RAM - 128GB ROM - Midnight freeCover +'}
                              </p>
                              <p className="text-base text-gray-600 leading-snug">
                                {order.specsLine2 ||
                                  ' Screen Protector'}
                              </p>
                            </div>
                          </div>

                          {/* Status badge + price – stacked on mobile, side-by-side on lg+ */}
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

                      {/* Separator (skip on last item) */}
                      {idx < recentOrders.length - 1 && (
                        <Separator className="my-3" />
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order History, Cart, Loan Status */}
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
                <h2 class=" mb-2 -mt-6 font-public-sans font-medium text-[18px] leading-[140%] capitalize text-black flex-none order-0 self-stretch grow-0">
                  Product
                </h2>

                <div className="flex flex-col gap-4 p-4 border rounded-lg">
                  {/* Top Row: Image + Title + Specs */}
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-brand-bg-2 p-4 shrink-0">
                      <img
                        src="/phone.png"
                        alt="iPhone 14"
                        className="w-16 h-16 rounded-lg object-contain"
                      />
                    </div>

                    {/* Title + Specs */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-lg">iPhone 14</h4>
                      <p class="font-sans text-base font-normal leading-relaxed text-[#676D75] flex-none order-1 self-stretch flex-grow-0">
                        iPhone 14 - 6.1” - 6GB RAM-128 GB ROM-Midnight +
                        free(Cover + Screen Protector)
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Controls (Plus, Minus, Trash) */}
                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}

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

                    {/* Delete Button */}
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
                  <h2 class="font-public-sans font-medium text-[18px] leading-[140%] capitalize text-black flex-none order-0 self-stretch grow-0">
                    Pending
                  </h2>

                  <span className="text-sm text-green-600">70%</span>
                </div>
                <p class="mx-auto  font-public-sans font-medium text-[12px] leading-[140%] flex items-center text-[#676D75] flex-none order-0 grow-0 mb-1">
                  Your Progress
                </p>

                <Progress value={70} className="h-3 rounded-full" />
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
             border border-[#F8971D] text-[#F8971D] rounded-[24px] 
             font-medium text-base hover:bg-[#F8971D]/10 transition-all"
                  >
                    View Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order History */}

        <Card className="shadow-none mt-10">
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
                    className={idx % 2 === 0 ? 'bg-brand-bg-2' : ''} // Even rows get gray bg
                  >
                    <TableCell className=" text-[15px] text-[#252525] font-sans">
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
                        variant={
                          order.status === 'Fulfilled'
                            ? 'default'
                            : order.statusVariant
                        }
                        className={
                          order.status === 'Fulfilled'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Approved'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'Declined'
                                ? 'bg-red-100 text-red-800'
                                : order.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : ''
                        }
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
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_protected/orders/')({
  component: OrdersPage,
})
