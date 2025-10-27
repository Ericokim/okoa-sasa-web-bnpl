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
      {/* Hero Section */}
      <section className="bg-brand-primary-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Okoa Sasa</h1>
          <p className="text-xl mb-8 opacity-90">
            Buy Now, Pay Later - Shop with flexible payment options
          </p>

          <div className="flex justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-primary-start hover:bg-white/90 px-8 py-4 text-lg"
            >
              <Link to={isAuthenticated ? '/products' : '/login'}>
                {isAuthenticated ? 'Browse Products' : 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {!isAuthenticated && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-brand-bg-2">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-black mb-4">
              How It Works
            </h2>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto">
              Simple steps to get your device with Okoa Sasa financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-brand-primary-gradient rounded-full w-20 h-20 flex items-center justify-center text-white mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-primary-gradient text-white border-none w-8 h-8 rounded-full flex items-center justify-center">
                    {feature.step}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-brand-black mb-3">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Connection Lines */}
          <div className="hidden lg:block relative -mt-32 mb-16">
            <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-brand-stroke"></div>
            <div className="absolute top-1/2 left-[37.5%] right-[37.5%] h-0.5 bg-brand-stroke"></div>
            <div className="absolute top-1/2 left-[62.5%] right-[12.5%] h-0.5 bg-brand-stroke"></div>
          </div>
        </div>
      </section>

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
