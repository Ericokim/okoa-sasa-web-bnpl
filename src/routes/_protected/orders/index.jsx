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
    },
    {
      id: '2',
      title: 'iPhone 14',
      specs:
        'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
      price: 87696,
      status: 'Rejected',
      statusColor: 'red',
    },
    {
      id: '3',
      title: 'iPhone 14',
      specs:
        'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
      price: 87696,
      status: 'Pending Request',
      statusColor: 'yellow',
    },
    {
      id: '4',
      title: 'iPhone 14',
      specs:
        'iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free Cover + Screen Protector',
      price: 87696,
      status: 'Pending Request',
      statusColor: 'yellow',
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

  return (
    <div className="min-h-screen">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Order History
        </h1>
        <p className="text-gray-600 mb-8">Overview of all of your activities</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Recent Orders */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Recent Orders
                </CardTitle>
                <Separator className="my-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:border-orange-300 transition-colors"
                  >
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {order.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {order.specs}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">
                        KES {order.price.toLocaleString()}
                      </p>
                      <Badge
                        variant="outline"
                        className={`mt-1 text-xs font-medium ${getStatusClasses(order.statusColor)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                    </div>
                  </div>
                  
                ))}
              </CardContent>


            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
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
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {order.orderId}
                        </TableCell>
                        <TableCell>{order.createdDate}</TableCell>
                        <TableCell>{order.device}</TableCell>
                        <TableCell className="font-medium">
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
                            className="text-orange-600"
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
          </div>

          {/* Right Column: Order History, Cart, Loan Status */}
          <div className="space-y-6">
            {/* Your Cart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Your Cart
                </CardTitle>
                <Separator className="my-4" />
              </CardHeader>

              <CardContent>
                <p className="text-sm font-medium mb-2 -mt-6">Product</p>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />

                  <div className="flex-1">
                    <h4 className="font-medium">iPhone 14</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      iPhone 14 - 6.1" - 6GB RAM - 128 GB ROM - Midnight + free
                      Cover
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      −
                    </Button>
                    <span className="w-8 text-center font-medium">1</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />

                <Button
                  variant="gradient"
                  className=" w-full rounded-3xl px-2 md:px-4 py-2 h-auto text-base font-medium"
                >
                  Proceed To Payment
                </Button>
              </CardContent>
            </Card>

            {/* Loan Application Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Loan Application Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-sm text-gray-600">70% Complete</span>
                </div>
                <Progress value={70} className="h-3 rounded-full" />
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-brand-primary-start text-brand-primary-start rounded-3xl px-4 py-2 bg-gradient-to-b from-transparent to-transparent hover:from-brand-primary-start/10 hover:to-brand-primary-end/10"
                  >
                    View Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_protected/orders/')({
  component: OrdersPage,
})
