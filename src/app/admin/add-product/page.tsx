"use client";

import AddProductForm from "@/components/admin/AddProductForm";
// import dynamic from "next/dynamic";

// const AddProductForm = dynamic(
//   () => import("@/components/admin/AddProductForm"),
//   { ssr: false }
// );

export default function AddProductPage() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
