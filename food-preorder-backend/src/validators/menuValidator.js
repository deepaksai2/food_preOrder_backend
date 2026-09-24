import { body } from "express-validator";

export const createMenuValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("category")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Category must be between 2 and 50 characters"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be boolean")
];

export const updateMenuValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("category")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Category must be between 2 and 50 characters"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be boolean")
];

export const statusValidator = [
  body("isAvailable")
    .isBoolean()
    .withMessage("isAvailable must be boolean")
];
