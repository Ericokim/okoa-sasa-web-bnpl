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
const recentOrders = [
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
function OrderDetailPage() {
  const { orderId } = Route.useParams()
  const navigate = useNavigate()
  // const { recentOrders } = Route.useLoaderData()

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
        {/* STATUS CARD — CENTERED */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="font-medium text-2xl text-[#0D0B26]">
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
                          <Check
                            className="w- h-7 text-white"
                            strokeWidth={3}
                          />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                        )}
                      </div>
                      <p
                        className={`mt-3 text-sm font-medium ${step.active ? 'text-[#0D0B26]' : 'text-gray-400'}`}
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
                          <Check
                            className="w-5 h-5 text-white"
                            strokeWidth={3}
                          />
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
                <div className="grid grid-cols-3 text-center text-xs font-medium">
                  {steps.map((step, idx) => (
                    <p
                      key={idx}
                      className={
                        step.active ? 'text-[#0D0B26]' : 'text-gray-400'
                      }
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
            <CardTitle className="font-medium text-2xl text-[#0D0B26]">
              Order Details
            </CardTitle>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[15px] font-sans text-[#252525]">
              <div>
                <span className="text-gray-500">Date</span>
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <span className="text-gray-500">Invoice</span>
                <p className="font-medium">{order.invoice}</p>
              </div>
              <div>
                <span className="text-gray-500">Amount</span>
                <p className="font-medium">
                  {order.amount.toLocaleString()} KES
                </p>
              </div>
              <div>
                <span className="text-gray-500">Dispatch to</span>
                <p className="font-medium">{order.dispatchTo}</p>
              </div>
              <div>
                <span className="text-gray-500">Status</span>
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
            <CardTitle className="font-medium text-2xl text-[#0D0B26]">
              Items
            </CardTitle>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#252525] font-sans">
                    Name
                  </TableHead>
                  <TableHead className="text-center text-[#252525] font-sans">
                    Qty
                  </TableHead>
                  <TableHead className="text-right text-[#252525] font-sans">
                    Price
                  </TableHead>
                  <TableHead className="text-right text-[#252525] font-sans">
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
                    <TableCell className="text-[15px] text-[#252525] font-sans">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-center text-[15px] text-[#252525] font-sans">
                      {item.qty}
                    </TableCell>
                    <TableCell className="text-right text-[15px] text-[#252525] font-sans">
                      KES {item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-[15px] font-medium text-[#252525] font-sans">
                      KES {item.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ACTION BUTTONS — MATCH UPLOAD/DELETE STYLE */}
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/orders' })}
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-[46px] px-4 py-3 
                       border border-[#F8971D] text-[#F8971D] rounded-3xl 
                       font-medium text-base hover:bg-[#F8971D]/10 transition-all"
          >
            Back to Orders
          </Button>

          <Button
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-[46px] px-4 py-3 
                              bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                              text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
          >
            Re-Order
          </Button>

          <Button
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-[46px] px-4 py-3 
                              bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                              text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
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
