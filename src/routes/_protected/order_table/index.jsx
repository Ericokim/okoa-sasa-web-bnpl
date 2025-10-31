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
import { Clock, XCircle, AlertCircle, Calendar, Package, DollarSign } from 'lucide-react'
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

  return (
    <div className="min-h-screen">
      <BreadCrumbs items={breadcrumbItems} className="px-0 pt-4 md:pt-8" />
      <main className="mx-auto px-4 sm:px-4 lg:px-4 py-4">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          My Order History
        </h1>
        <p className="text-gray-600 mb-8">Overview of all of your activities</p>

        {/* Desktop Table View - Hidden on mobile */}
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

        {/* Mobile Card View - Visible only on small screens */}
        <div className="md:hidden space-y-4 mt-6">
          <h2 className="font-medium text-xl text-gray-900 mb-4">Order History</h2>
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




