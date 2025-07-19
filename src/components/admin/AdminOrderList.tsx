/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/admin/orders");
        setOrders(res.data.orders);
      } catch {
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status });
      toast.success("Order status updated");
      const res = await axios.get("/api/admin/orders");
      setOrders(res.data.orders);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              User Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Total Amount
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {order._id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {order.userEmail}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                ${order.totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
// Todo: Check order status changing working without error or not
