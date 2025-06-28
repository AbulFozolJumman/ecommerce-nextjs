"use client";

// Test the Search then move to next

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const fetchProducts = async () => {
    const params = new URLSearchParams({
      search,
      min: min || "0",
      max: max || "10000",
      page: page.toString(),
      limit: limit.toString(),
    });

    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data.products);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, min, max, page]);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((p) => <ProductCard key={p._id} product={p} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {page} of {Math.ceil(total / limit) || 1}
        </span>
        <button
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
