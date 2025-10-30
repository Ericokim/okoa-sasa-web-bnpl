import { createFileRoute } from '@tanstack/react-router'

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

function OrdersTableHistory() {
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

export const Route = createFileRoute('/_protected/order_table/')({
  component: OrdersTableHistory,
})
