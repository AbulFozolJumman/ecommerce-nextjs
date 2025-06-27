"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-gray-600">
          Your cart is empty.{" "}
          <Link href="/products" className="underline text-blue-600">
            Shop now
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="rounded object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p>
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <p className="text-lg font-semibold">Subtotal:</p>
            <p className="text-xl font-bold">${total.toFixed(2)}</p>
          </div>

          <div className="text-right">
            <Link href="/checkout">
              <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
