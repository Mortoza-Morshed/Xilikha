import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/my-orders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/status").put(protect, admin, updateOrderStatus);
router.route("/:id/cancel").put(protect, cancelOrder);

export default router;
