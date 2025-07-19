import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminProductList from "@/components/admin/AdminProductList";
import AdminOrderList from "@/components/admin/AdminOrderList";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "admin") redirect("/");

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <AdminProductList />
        <div className="mt-4">
          <Link
            href="/admin/add-product"
            className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            ➕ Add New Product
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <AdminOrderList />
      </div>
    </main>
  );
}
