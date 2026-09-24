import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getMyOrder,
  cancelOrder
} from "../controllers/orderController.js";
import { createOrderValidator } from "../validators/orderValidator.js";
import { validate } from "../validators/validate.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createOrderValidator, validate, createOrder);
router.get("/my", getMyOrders);
router.get("/:id", getMyOrder);
router.patch("/:id/cancel", cancelOrder);

export default router;
