import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/order.model";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 401 });
    }

    const { id } = await context.params;
    const { status } = await request.json();

    await connectDB();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (err: unknown) {
    console.error("Order update failed:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json(
      { message: "Failed to update order", error: errorMessage },
      { status: 500 }
    );
  }
}
