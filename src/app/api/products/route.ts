import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
