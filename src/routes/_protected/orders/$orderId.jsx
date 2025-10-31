import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Check, Package, Truck, MapPin } from 'lucide-react'
import { BreadCrumbs } from '@/components/shared/BreadCrumbs'
import { recentOrders } from './index'


function OrderDetailPage() {
  const { orderId } = Route.useParams()
  const navigate = useNavigate()

  if (!recentOrders) return <div className="p-8 text-center">Loading...</div>
  const order = recentOrders.find((o) => o.orderId === orderId)
  if (!order) return <div className="p-8 text-center">Order not found</div>

  const steps = [
    { label: 'Processing', active: order.statusStep >= 0 },
    { label: 'On the way', active: order.statusStep >= 1 },
    { label: 'Delivered', active: order.statusStep >= 2 },
  ]

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Orders', path: '/orders' },
    { label: `Order ${order.orderId}`, path: '', isCurrent: true },
  ]

  return (
    <div className="min-h-screen bg-white">
      <BreadCrumbs items={breadcrumbItems} className="my-8" />

      <div className="mx-auto px-4 py-8 space-y-10">
        {/* STATUS CARD */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="font-sans text-2xl font-medium leading-9 text-black">
              Status
            </CardTitle>
            <Separator className="my-4" />
          </CardHeader>

          <CardContent className="flex justify-center">
            <div className="w-full max-w-4xl">
              {/* Desktop: Horizontal Stepper */}
              <div className="hidden md:flex justify-center items-center gap-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center flex-1 relative">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                          step.active
                            ? 'bg-orange-500 border-orange-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {step.active ? (
                          <Check className="w-5 h-5 text-white" strokeWidth={3} />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                        )}
                      </div>
                      <p
                        className={`mt-3 font-sans text-base font-normal leading-snug ${
                          step.active ? 'text-[#252525]' : 'text-[#A0A4AC]'
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>

                    {idx < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-1 ${step.active ? 'bg-orange-500' : 'bg-gray-300'}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: Vertical Stepper */}
              <div className="md:hidden space-y-4">
                <div className="flex items-center">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center flex-1">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                          step.active
                            ? 'bg-orange-500 border-orange-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {step.active ? (
                          <Check className="w-5 h-5 text-white" strokeWidth={3} />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        )}
                      </div>
                      {idx < steps.length - 1 && (
                        <div
                          className={`flex-1 h-[2px] mx-1 ${step.active ? 'bg-orange-500' : 'bg-gray-300'}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 text-center">
                  {steps.map((step, idx) => (
                    <p
                      key={idx}
                      className={`font-sans text-base font-normal leading-snug ${
                        step.active ? 'text-[#252525]' : 'text-[#A0A4AC]'
                      }`}
                    >
                      {step.label}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DETAILS CARD */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="font-sans text-2xl font-medium leading-9 text-black">
              Order Details
            </CardTitle>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                  Date
                </span>
                <p className="font-sans font-medium text-lg text-[#252525] capitalize">
                  {order.date}
                </p>
              </div>
              <div>
                <span className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                  Invoice
                </span>
                <p className="font-sans font-medium text-lg text-[#252525] capitalize">
                  {order.invoice}
                </p>
              </div>
              <div>
                <span className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                  Amount
                </span>
                <p className="font-sans font-medium text-lg text-[#252525] capitalize">
                  {order.amount.toLocaleString()} KES
                </p>
              </div>
              <div>
                <span className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                  Dispatch to
                </span>
                <p className="font-sans font-medium text-lg text-[#252525] capitalize">
                  {order.dispatchTo}
                </p>
              </div>
              <div>
                <span className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                  Status
                </span>
                <Badge className="bg-green-100 text-green-800 text-sm font-medium mt-1">
                  {order.statusText}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ITEMS TABLE CARD */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="font-sans text-2xl font-medium leading-9 text-black">
              Items
            </CardTitle>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                    Name
                  </TableHead>
                  <TableHead className="text-center font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                    Qty
                  </TableHead>
                  <TableHead className="text-right font-sans text-base font-normal leading-snug text-[#A0A4AC]">
                    Price
                  </TableHead>
                  <TableHead className="text-right font-sans text-base font-normal leading-snug text-[#A0A4AC]">
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
                    <TableCell className="font-sans text-lg font-medium text-[#252525] capitalize">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-center font-sans text-lg font-medium text-[#252525] capitalize">
                      {item.qty}
                    </TableCell>
                    <TableCell className="text-right font-sans text-lg font-medium text-[#252525] capitalize">
                      KES {item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-sans text-lg font-medium text-[#252525] capitalize">
                      KES {item.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/orders' })}
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-[46px] px-4 py-3 
                       border border-[#F8971D] text-[#F8971D] rounded-3xl 
                       font-sans font-medium text-base hover:bg-[#F8971D]/10 transition-all"
          >
            Back to Orders
          </Button>

          <Button
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-[46px] px-4 py-3 
                              bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                              text-white font-sans font-medium text-base shadow-sm hover:opacity-90 transition-all"
          >
            Re-Order
          </Button>

          <Button
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-[46px] px-4 py-3 
                              bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                              text-white font-sans font-medium text-base shadow-sm hover:opacity-90 transition-all"
          >
            <MapPin className="h-5 w-5" />
            Track Order
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/orders/$orderId')({
  component: OrderDetailPage,
})