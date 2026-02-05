import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createRazorpayOrder,
  verifyPayment,
  handlePaymentFailure,
} from "../controllers/paymentController.js";

const router = express.Router();

// @route   POST /api/payment/create-order
// @desc    Create Razorpay order
// @access  Private
router.post("/create-order", protect, createRazorpayOrder);

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment
// @access  Private
router.post("/verify", protect, verifyPayment);

// @route   POST /api/payment/failure
// @desc    Handle payment failure
// @access  Private
router.post("/failure", protect, handlePaymentFailure);

export default router;
