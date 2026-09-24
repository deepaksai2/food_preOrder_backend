import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item"
      }
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "COMPLETED",
        "CANCELLED"
      ],
      default: "PLACED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
