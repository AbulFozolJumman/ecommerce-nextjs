/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditProductForm from "@/components/admin/EditProductForm";
import axios from "axios";

async function getProduct(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await axios.get(`${baseUrl}/api/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch product data.");
  }
}

export default async function EditProductPage(context: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") redirect("/");

  const { id } = await context.params;
  const product = await getProduct(id);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <EditProductForm product={product} />
    </main>
  );
}
