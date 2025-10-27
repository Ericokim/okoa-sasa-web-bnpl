import { createFileRoute } from '@tanstack/react-router';

function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Living</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>
      <p className="text-muted-foreground">
        Browse our collection and buy now, pay later with flexible installment options
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            <div className="h-48 bg-muted rounded-lg"></div>
            <h3 className="font-semibold">Product {i}</h3>
            <p className="text-sm text-muted-foreground">KES {i * 1000}</p>
            <p className="text-xs text-primary">Or pay KES {(i * 1000) / 4}/mo</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_protected/products/')({
  component: ProductsPage,
});
