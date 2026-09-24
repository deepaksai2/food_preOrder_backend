import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getMenu,
  getMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", authenticate, getMenu);
router.get("/:id", authenticate, getMenuItem);

export default router;
