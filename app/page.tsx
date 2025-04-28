interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="product-list p-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-green-200/40 bg-green-950/40 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 mb-4 rounded-lg  object-center"
            />
            <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
            <p className="text-green-200/80 font-bold text-center">${product.price}</p>
            <p className="text-sm text-green-200/60 mt-2">
              {product.description.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
