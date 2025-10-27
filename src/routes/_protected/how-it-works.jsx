import { createFileRoute } from '@tanstack/react-router'

function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-foreground">How It Works</h1>

      <div className="space-y-6">
        <section className="rounded-lg border border-border p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Step 1: Browse & Shop
          </h2>
          <p className="text-foreground/80">
            Browse our wide selection of products and add your favorites to your
            cart. Shop with confidence knowing you can pay later.
          </p>
        </section>

        <section className="rounded-lg border border-border p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Step 2: Choose Your Payment Plan
          </h2>
          <p className="text-foreground/80">
            At checkout, select your preferred payment plan. Split your purchase
            into manageable installments that work for your budget.
          </p>
        </section>

        <section className="rounded-lg border border-border p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Step 3: Get Your Products
          </h2>
          <p className="text-foreground/80">
            Receive your products immediately while you pay over time. No hidden
            fees, no surprises - just flexible payments that work for you.
          </p>
        </section>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/how-it-works')({
  component: HowItWorksPage,
})
