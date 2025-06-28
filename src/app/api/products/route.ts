import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/product.model";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const min = parseFloat(searchParams.get("min") || "0");
    const max = parseFloat(searchParams.get("max") || "10000");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    const query = {
      title: { $regex: search, $options: "i" },
      price: { $gte: min, $lte: max },
    };

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return NextResponse.json({ products, total });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, price, image, stock, description } = body;

    if (!title || !price || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      image,
      stock,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
