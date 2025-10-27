import { Link, createFileRoute } from '@tanstack/react-router'

function OrdersPage() {
  const orders = [
    {
      id: 'ORD-001',
      date: '2025-10-20',
      total: 3200,
      status: 'Delivered',
      items: 2,
    },
    {
      id: 'ORD-002',
      date: '2025-10-15',
      total: 5400,
      status: 'In Transit',
      items: 3,
    },
    {
      id: 'ORD-003',
      date: '2025-10-10',
      total: 2100,
      status: 'Processing',
      items: 1,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>
      <p className="text-muted-foreground">Track and manage your orders</p>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} to={`/orders/${order.id}`}>
            <div className="border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'Delivered'
                          ? 'bg-success/10 text-success'
                          : order.status === 'In Transit'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Placed on {order.date}
                  </p>
                  <p className="text-sm">{order.items} item(s)</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    KES {order.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    View Details →
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/orders/')({
  component: OrdersPage,
})
