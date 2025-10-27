import { Link, createFileRoute } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Smartphone,
  CreditCard,
  CheckCircle,
  Truck,
  ArrowRight,
} from 'lucide-react'

function IndexPage() {
  const { isAuthenticated } = useStateContext()

  const features = [
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: 'Browse and choose your device',
      step: 1,
    },
    {
      icon: <CreditCard className="h-12 w-12" />,
      title: 'Fill in your details and employer info',
      step: 2,
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: 'We review your loan request',
      step: 3,
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: 'Once approved, your device is delivered',
      step: 4,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Featured Products Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-black mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-brand-gray">
              Browse our latest smartphone collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-brand-stroke">
                <CardContent className="p-6">
                  <div className="bg-brand-bg-2 rounded-xl h-48 mb-4 flex items-center justify-center">
                    <span className="text-brand-mid-gray">Product Image</span>
                  </div>
                  <h3 className="font-semibold text-brand-black mb-2">
                    iPhone 14 - 128GB
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-brand-black">
                      KES 87,696
                    </span>
                    <span className="text-sm text-brand-mid-gray line-through">
                      KES 97,696
                    </span>
                  </div>
                  <p className="text-sm text-brand-secondary mt-2">
                    Or pay KES 21,924/month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="gradient" size="lg">
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers using Okoa Sasa
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link to="/signup">
              Start Shopping Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
