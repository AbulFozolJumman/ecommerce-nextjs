"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { addToWishlist } from "@/redux/slices/wishlistSlice";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const user = session?.user;
  const isAdmin = user?.role === "admin";

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You must login to add to cart");
      return;
    }

    if (isAdmin) {
      toast.error("Admins cannot add items to cart");
      return;
    }

    dispatch(
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    toast.success("Added to cart");
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("You must login to add to wishlist");
      return;
    }

    if (isAdmin) {
      toast.error("Admins cannot add items to wishlist");
      return;
    }

    dispatch(
      addToWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    toast.success("Added to wishlist");
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative h-52 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-700 mt-1">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="mt-2 w-full border border-black text-black py-2 rounded hover:bg-gray-100 transition"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
