"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleAddToCart = (item: (typeof wishlist)[0]) => {
    dispatch(addToCart(item));
    toast.success("Moved to cart");
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {wishlist.map((item) => (
            <li
              key={item.id}
              className="border rounded p-4 flex gap-4 items-center"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3 py-1 text-sm bg-black text-white rounded"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
