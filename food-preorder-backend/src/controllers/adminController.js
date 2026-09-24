import mongoose from "mongoose";
import Order from "../models/Order.js";

const allowedTransitions = {
  PLACED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING"],
  PREPARING: ["READY"],
  READY: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: []
};

export const getAllOrders = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.status) {
      const allowedStatuses = [
        "PLACED",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "COMPLETED",
        "CANCELLED"
      ];

      if (!allowedStatuses.includes(req.query.status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status filter"
        });
      }

      filter.status = req.query.status;
    }

    const orders = await Order.find(filter)
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "All orders retrieved successfully",
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderByIdAdmin = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    const order = await Order.findById(req.params.id)
      .populate("userId", "name email role");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      message: "Order retrieved successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const newStatus = req.body.status;
    const currentStatus = order.status;

    if (newStatus === currentStatus) {
      return res.status(400).json({
        success: false,
        message: "Order already has this status"
      });
    }

    if (
      !allowedTransitions[currentStatus] ||
      !allowedTransitions[currentStatus].includes(newStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition: ${currentStatus} → ${newStatus}`
      });
    }

    order.status = newStatus;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};
