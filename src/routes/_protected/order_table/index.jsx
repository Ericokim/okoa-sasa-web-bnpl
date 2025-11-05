import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Package, DollarSign } from 'lucide-react'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { recentOrders } from '@/routes/_protected/orders/index'

function OrdersTableHistory() {
  const navigate = useNavigate()
  const orderHistory = [
    {
      orderId: '#REQ-20458',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'Processing', // changed
      statusVariant: 'secondary',
    },
    {
      orderId: '#REQ-20459',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'On the way', // changed
      statusVariant: 'default',
    },
    {
      orderId: '#REQ-20460',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'Delivered', // changed
      statusVariant: 'success',
    },
    {
      orderId: '#REQ-20461',
      createdDate: 'Oct 12, 2025',
      name: 'Jane Mwangi',
      device: 'Samsung Galaxy A35',
      loanAmount: 38500,
      status: 'Rejected', // unchanged (kept for completeness)
      statusVariant: 'destructive',
    },
  ]

  /* ------------------------------------------------------------------ */
  /* Updated badge colour mapping – only the three allowed statuses   */
  /* ------------------------------------------------------------------ */
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'On the way':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Order History', path: '/orderHistory', isCurrent: true },
  ]

  const getGradient = () => 'from-orange-500 to-amber-500'

  const handleViewDetails = (orderId) => {
    navigate({ to: `/orders/${orderId.replace('#', '')}` })
  }

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

        {/* Order History - Responsive Layout */}
        <div className="-mt-2">
          {/* ================== DESKTOP – Compact + VERTICAL-ONLY Scroll ================== */}
          <div className="hidden md:block">
            <Card className="shadow-none overflow-hidden">
              <CardContent className="p-0">
                {/* ---- VERTICAL-ONLY SCROLL CONTAINER ---- */}
                <div className="overflow-y-auto overflow-x-hidden">
                  {orderHistory.map((order, idx) => {
                    const matched = recentOrders.find(
                      (ro) => ro.orderId === order.orderId.replace('#', ''),
                    ) || { image: '/phone.png', title: order.device }

                    return (
                      <div key={order.orderId}>
                        {/* ---- COMPACT ROW ---- */}
                        <div
                          className="relative flex px-5 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleViewDetails(order.orderId)}
                        >
                          {/* LEFT – Image + Info */}
                          <div className="flex gap-3 flex-1">
                            <div className="shrink-0 rounded-2xl bg-brand-bg-2 p-2.5 overflow-hidden">
                              <img
                                src={matched.image}
                                alt={order.device}
                                className="h-20 w-20 object-contain"
                              />
                            </div>

                            <div className="flex flex-col justify-center min-w-0">
                              <h4 className="font-medium text-base text-gray-900 truncate">
                                {order.device}
                              </h4>

                              <p className="text-xs text-gray-600 mt-0.5">
                                {order.orderId}
                                <span className="mx-1.5">•</span>
                                {order.createdDate}
                                {order.name && (
                                  <>
                                    <span className="mx-1.5">•</span>
                                    {order.name}
                                  </>
                                )}
                              </p>

                              <p className="font-bold text-base bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent whitespace-nowrap">
                                KES {order.loanAmount.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* RIGHT – Status + Button */}
                          <div className="ml-3 flex flex-col justify-between">
                            <Badge
                              variant="secondary"
                              className={`self-end text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadgeClasses(
                                order.status,
                              )}`}
                            >
                              {order.status}
                            </Badge>

                            {/* <Button
                              variant="gradient"
                              size="sm"
                              className="flex items-center justify-center gap-1.5 h-9 px-3.5 
                               bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                               text-white font-medium text-sm shadow-sm hover:opacity-90 transition-all"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewDetails(order.orderId)
                              }}
                            >
                              View Details
                            </Button> */}
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
                        </div>

                        {/* Separator */}
                        {idx < orderHistory.length - 1 && (
                          <Separator className="mx-5 my-0" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ================== MOBILE – Vertical Cards (Status + View Details aligned) ================== */}
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
                    {/* Header */}
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
                        className={`text-xs font-medium px-2 py-0.5 ${getStatusBadgeClasses(order.status)}`}
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <Separator className="my-3" />

                    {/* Device + Image */}
                    <div className="flex gap-3 mb-3">
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

                    {/* Loan Amount */}
                    <div className="flex items-start mb-3">
                      <DollarSign className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Loan Amount</p>
                        <p className="text-sm font-semibold text-gray-900">
                          KES {order.loanAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Status + View Details – Aligned on same line */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-500">
                        {' '}
                        <span className="text-gray-900"> </span>
                      </span>
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

export const Route = createFileRoute('/_protected/order_table/')({
  component: OrdersTableHistory,
})
