import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    price: {
      type: Number,
      required: true,
      min: 0.01
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
