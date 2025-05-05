"use client"
import { NavbarComp } from "@/components/navbar";
import useSWR from "swr";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function HomePage() {
  const { data: products, isLoading, error } = useSWR<Product[]>('https://fakestoreapi.com/products');

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Failed to load products.</div>;

  return (
    <>
      <NavbarComp />
      <main className="p-8 product-list">
        <h1 className="mb-8 text-3xl font-bold">All Products</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product.id}
              className="p-5 transition-shadow duration-200 border rounded-lg shadow-sm border-green-200/40 bg-green-950/40 hover:shadow-md"
            >
              <img
                src={product.image}
                alt={product.title}
                className="object-center w-full h-48 mb-4 rounded-lg"
              />
              <h2 className="mb-2 text-lg font-semibold text-center">{product.title}</h2>
              <p className="font-bold text-center text-green-200/80">${product.price}</p>
              <p className="mt-2 text-sm text-green-200/60">
                {product.description.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
