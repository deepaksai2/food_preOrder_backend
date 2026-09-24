import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
];

export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
];
