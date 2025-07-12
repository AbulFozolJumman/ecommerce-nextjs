// src/app/api/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/order.model";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "user" || !session.user.email) {
      return NextResponse.json({ message: "Access denied" }, { status: 401 });
    }

    const body = await req.json();
    const { items, totalAmount, shippingAddress } = body;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof totalAmount !== "number" ||
      typeof shippingAddress !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid order payload" },
        { status: 400 }
      );
    }

    await connectDB();

    const newOrder = await Order.create({
      userEmail: session.user.email,
      items,
      totalAmount,
      address: shippingAddress,
    });

    return NextResponse.json({
      message: "Order placed",
      orderId: newOrder._id,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Order creation failed:", err);
    return NextResponse.json(
      { message: "Failed to place order", error: err.message },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch orders for logged-in user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "user" || !session.user.email) {
      return NextResponse.json({ message: "Access denied" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({ userEmail: session.user.email }).sort({
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
