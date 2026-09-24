import { body } from "express-validator";

export const createOrderValidator = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one order item is required"),
  body("items.*.menuItemId")
    .isMongoId()
    .withMessage("Each menuItemId must be a valid MongoDB ID"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than or equal to 1")
];

export const orderStatusValidator = [
  body("status")
    .isIn([
      "PLACED",
      "CONFIRMED",
      "PREPARING",
      "READY",
      "COMPLETED",
      "CANCELLED"
    ])
    .withMessage("Invalid order status")
];
