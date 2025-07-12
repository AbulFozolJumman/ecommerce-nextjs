"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";

type Order = {
  _id: string;
  items: {
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  createdAt: string;
};

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!session) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        setOrders(res.data.orders);
      } catch {
        toast.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, [session]);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded">
            <p className="text-sm text-gray-600">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item.title}</span>
                <span>
                  ${item.price.toFixed(2)} × {item.quantity}
                </span>
              </div>
            ))}
            <p className="font-semibold mt-2">
              Total: ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        ))
      )}
    </main>
  );
}
