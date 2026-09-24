import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createMenuItem,
  updateMenuItem,
  updateMenuStatus,
  deleteMenuItem
} from "../controllers/menuController.js";
import {
  getAllOrders,
  getOrderByIdAdmin,
  updateOrderStatus
} from "../controllers/adminController.js";
import {
  createMenuValidator,
  updateMenuValidator,
  statusValidator
} from "../validators/menuValidator.js";
import { orderStatusValidator } from "../validators/orderValidator.js";
import { validate } from "../validators/validate.js";

const router = express.Router();

router.use(authenticate, authorize("ADMIN"));

router.post("/menu", createMenuValidator, validate, createMenuItem);
router.put("/menu/:id", updateMenuValidator, validate, updateMenuItem);
router.patch(
  "/menu/:id/status",
  statusValidator,
  validate,
  updateMenuStatus
);
router.delete("/menu/:id", deleteMenuItem);

router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderByIdAdmin);
router.patch(
  "/orders/:id/status",
  orderStatusValidator,
  validate,
  updateOrderStatus
);

export default router;
