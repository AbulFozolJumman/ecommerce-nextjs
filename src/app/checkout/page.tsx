/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slices/cartSlice";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");

  const handleCheckout = async () => {
    if (!session) {
      toast.error("You must be logged in to checkout");
      router.push("/auth/login");
      return;
    }

    if (session.user.role === "admin") {
      toast.error("Admin is not allowed to place orders");
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!address.trim()) {
      toast.error("Shipping address is required");
      return;
    }

    try {
      const orderData = {
        items: cart.items.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount: cart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        shippingAddress: address,
      };

      await axios.post("/api/orders", orderData);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      router.push("/orders");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Review Order</h1>

      {cart.items.map((item) => (
        <div key={item.id} className="mb-2 border p-2 rounded">
          <p>{item.title}</p>
          <p>
            ${item.price} × {item.quantity}
          </p>
        </div>
      ))}

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Shipping address"
        className="w-full border p-2 rounded mt-4 min-h-[100px]"
      />

      <p className="mt-4 font-bold">
        Total: $
        {cart.items
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </p>

      <button
        onClick={handleCheckout}
        className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Confirm Order
      </button>
    </div>
  );
}
