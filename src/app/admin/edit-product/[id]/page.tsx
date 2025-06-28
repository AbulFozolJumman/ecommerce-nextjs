import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/product.model";
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") redirect("/");

  await connectDB();
  const product = await Product.findById(params.id).lean();

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  const productData = {
    _id: product._id.toString(),
    title: product.title,
    description: product.description || "",
    price: product.price,
    image: product.image,
    stock: product.stock || 0,
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <EditProductForm product={productData} />
    </main>
  );
}
