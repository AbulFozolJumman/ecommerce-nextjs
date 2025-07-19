import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/order.model";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({}).sort({
      createdAt: -1,
    });

    return NextResponse.json({ orders });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Fetching orders failed:", err);
    return NextResponse.json(
      { message: "Failed to fetch orders", error: err.message },
      { status: 500 }
    );
  }
}
