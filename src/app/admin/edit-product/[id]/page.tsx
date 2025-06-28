import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/product.model";
import EditProductForm from "@/components/admin/EditProductForm";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditProductPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") redirect("/");

  await connectDB();
  const foundProduct = await Product.findById(params.id).lean();

  if (!foundProduct) {
    return <div className="p-6">Product not found</div>;
  }

  const productData = {
    _id: foundProduct._id.toString(),
    title: foundProduct.title,
    description: foundProduct.description || "",
    price: foundProduct.price,
    image: foundProduct.image,
    stock: foundProduct.stock || 0,
    category: foundProduct.category || "",
    createdAt: foundProduct.createdAt?.toString() || "",
    updatedAt: foundProduct.updatedAt?.toString() || "",
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <EditProductForm product={productData} />
    </main>
  );
}
