import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
