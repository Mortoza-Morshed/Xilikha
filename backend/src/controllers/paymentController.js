import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise (smallest currency unit)
      currency: "INR",
      receipt: orderId || `order_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    // Validate required fields
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
      return res.status(400).json({ message: "Missing payment verification data" });
    }

    // Generate signature for verification
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Verify signature
    const isAuthentic = expectedSignature === razorpaySignature;

    if (isAuthentic) {
      // Update order with payment details
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.paymentStatus = "PAID";
      order.razorpayOrderId = razorpayOrderId;
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = razorpaySignature;
      order.paidAt = new Date();

      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed - Invalid signature",
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// @desc    Handle payment failure
// @route   POST /api/payment/failure
// @access  Private
export const handlePaymentFailure = async (req, res) => {
  try {
    const { orderId, error } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "FAILED";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment failure recorded",
      order,
    });
  } catch (error) {
    console.error("Payment failure handling error:", error);
    res.status(500).json({
      message: "Failed to handle payment failure",
      error: error.message,
    });
  }
};
