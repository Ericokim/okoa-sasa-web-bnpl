import { createFileRoute } from '@tanstack/react-router'

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-foreground">About Okoa Sasa</h1>

      <div className="space-y-6">
        <section className="rounded-lg border border-border p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Mission
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            Okoa Sasa is committed to making shopping accessible to everyone
            through flexible Buy Now, Pay Later solutions. We believe everyone
            deserves the freedom to shop without financial constraints.
          </p>
        </section>

        <section className="rounded-lg border border-border p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Why Choose Us
          </h2>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Instant approval with no hidden fees</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Flexible payment plans that work for your budget</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Wide selection of products from trusted sellers</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Secure and transparent transactions</span>
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-border p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Our Values
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            We are driven by transparency, trust, and customer satisfaction. Our
            goal is to empower consumers with financial flexibility while
            maintaining the highest standards of service and security.
          </p>
        </section>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/about')({
  component: AboutPage,
})
