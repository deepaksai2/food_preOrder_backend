import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";

export const getMenu = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.available !== undefined) {
      if (!["true", "false"].includes(req.query.available)) {
        return res.status(400).json({
          success: false,
          message: "available must be true or false"
        });
      }
      filter.isAvailable = req.query.available === "true";
    }

    const menu = await MenuItem.find(filter).sort({ category: 1, name: 1 });

    res.json({
      success: true,
      message: "Menu retrieved successfully",
      data: menu
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuItem = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID"
      });
    }

    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    res.json({
      success: true,
      message: "Menu item retrieved successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { name, category, price, isAvailable = true } = req.body;

    const item = await MenuItem.create({
      name,
      category,
      price,
      isAvailable
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID"
      });
    }

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    res.json({
      success: true,
      message: "Menu item updated successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenuStatus = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID"
      });
    }

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { isAvailable: req.body.isAvailable },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    res.json({
      success: true,
      message: `Menu item ${item.isAvailable ? "activated" : "deactivated"} successfully`,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID"
      });
    }

    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
