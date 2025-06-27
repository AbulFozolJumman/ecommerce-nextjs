import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddProductForm from "@/components/admin/AddProductForm";
// import dynamic from "next/dynamic";

// Import client-side form dynamically
// const AddProductForm = dynamic(
//   () => import("@/components/admin/AddProductForm"),
//   { ssr: false }
// );

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "admin") redirect("/");

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <AddProductForm />
    </main>
  );
}
