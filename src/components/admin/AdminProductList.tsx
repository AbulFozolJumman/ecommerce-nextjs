"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products?all=true");
      setProducts(res.data.products || []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-gray-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/edit-product/${product._id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Edit
                </Link>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
