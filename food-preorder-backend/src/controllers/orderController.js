import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const requestedItems = req.body.items;

    const ids = requestedItems.map((item) => item.menuItemId);
    const uniqueIds = new Set(ids);

    if (uniqueIds.size !== ids.length) {
      return res.status(400).json({
        success: false,
        message: "Duplicate menu items are not allowed in one order"
      });
    }

    const menuItems = await MenuItem.find({
      _id: { $in: ids }
    });

    if (menuItems.length !== ids.length) {
      return res.status(400).json({
        success: false,
        message: "One or more menu items do not exist"
      });
    }

    const menuMap = new Map(
      menuItems.map((item) => [item._id.toString(), item])
    );

    const orderItems = [];
    let total = 0;

    for (const requestedItem of requestedItems) {
      const menuItem = menuMap.get(requestedItem.menuItemId);

      if (!menuItem.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `${menuItem.name} is currently unavailable`
        });
      }

      const subtotal = Number(
        (menuItem.price * requestedItem.quantity).toFixed(2)
      );

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: requestedItem.quantity,
        subtotal
      });

      total += subtotal;
    }

    total = Number(total.toFixed(2));

    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      total,
      status: "PLACED"
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Order history retrieved successfully",
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrder = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

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

export const cancelOrder = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (order.status !== "PLACED") {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled when status is ${order.status}`
      });
    }

    order.status = "CANCELLED";
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};
