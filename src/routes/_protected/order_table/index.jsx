import { recentOrders } from '@/routes/_protected/orders/index'
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
import { Separator } from '@/components/ui/separator'
import {
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  Package,
  DollarSign,
} from 'lucide-react'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'

function OrdersTableHistory() {
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

  return (
    <div className="min-h-screen">
      <BreadCrumbs items={breadcrumbItems} className="px-0 pt-4 md:pt-8" />
      <main className="mx-auto px-4 sm:px-4 lg:px-4 py-4">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          My Order History
        </h1>
        <p className="text-gray-600 mb-8">Overview of all of your activities</p>

        {/* Desktop Table View - Hidden on mobile */}

        {/* Order History - Responsive Layout */}
        <div className="mt-10">
          <h2 className="font-medium text-2xl text-gray-900 mb-6">
            Order History
          </h2>

          {/* ==== DESKTOP / TABLET – Horizontal cards (like Recent Orders) ==== */}
          <div className="hidden md:block space-y-0">
            <Card className="shadow-none overflow-hidden">
              <CardContent className="p-0">
                {orderHistory.map((order, idx) => {
                  const gradient = getGradient('orange')
                  const matched = recentOrders.find(
                    (ro) => ro.orderId === order.orderId.replace('#', ''),
                  ) || {
                    image: '/phone.png',
                    title: order.device,
                    specs: '',
                    price: order.loanAmount,
                  }

                  return (
                    <div key={order.orderId}>
                      <div
                        className="flex gap-4 py-4 px-6 items-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleViewDetails(order.orderId)}
                      >
                        {/* Image */}
                        <div className="flex-shrink-0 rounded-2xl bg-brand-bg-2 p-3 overflow-hidden">
                          <img
                            src={matched.image}
                            alt={order.device}
                            className="h-14 w-14 object-contain"
                          />
                        </div>

                        {/* Order info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-lg text-gray-900 truncate">
                            {order.device}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {order.orderId} • {order.createdDate}
                            {order.name && ` • ${order.name}`}
                          </p>
                          <p
                            className={`font-bold text-md bg-linear-to-r ${gradient} bg-clip-text text-transparent whitespace-nowrap`}
                          >
                            KES {order.loanAmount.toLocaleString()}
                          </p>
                        </div>

                        {/* View Details button */}

                        <Button
                          variant="gradient"
                          size="sm"
                          className="rounded-3xl px-2 md:px-3 py-1 h-auto text-base font-medium"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails(order.orderId)
                          }}
                        >
                          View Details
                        </Button>
                      </div>

                      {/* Separator – stays inside the card */}
                      {idx < orderHistory.length - 1 && (
                        <Separator className="mx-6" />
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* ==== MOBILE – Vertical cards (unchanged style) ==== */}
          <div className="md:hidden space-y-4">
            {orderHistory.map((order) => {
              const matched = recentOrders.find(
                (ro) => ro.orderId === order.orderId.replace('#', ''),
              ) || { image: '/phone.png' }

              return (
                <Card
                  key={order.orderId}
                  className="shadow-none cursor-pointer"
                  onClick={() => handleViewDetails(order.orderId)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-xl bg-brand-bg-2 p-2">
                        <img
                          src={matched.image}
                          alt={order.device}
                          className="h-12 w-12 object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-lg text-gray-900">
                          {order.orderId}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {order.createdDate}
                          {order.name && ` • ${order.name}`}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {order.device}
                        </p>
                        <p className="font-bold text-sm text-orange-600 mt-1">
                          KES {order.loanAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="link"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(order.orderId)
                      }}
                      className="mt-3 text-orange-600 font-medium underline underline-offset-2 hover:text-orange-700 p-0 h-auto"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mobile Card View - Visible only on small screens */}
        <div className="md:hidden space-y-4 mt-6">
          <h2 className="font-medium text-xl text-gray-900 mb-4">
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

export const Route = createFileRoute('/_protected/order_table/')({
  component: OrdersTableHistory,
})
