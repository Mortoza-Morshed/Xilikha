import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { sendOrderConfirmation, sendAdminOrderAlert } from "../services/emailService.js";

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
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Verify amount from DB order — never trust frontend amount
    const dbOrder = await Order.findById(orderId);
    if (!dbOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (dbOrder.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const amount = dbOrder.total;

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: orderId,
      payment_capture: 1,
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
      message: "Failed to create payment order. Please try again.",
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
      order.orderStatus = "processing"; // Auto-update to processing
      order.razorpayOrderId = razorpayOrderId;
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = razorpaySignature;
      order.paidAt = new Date();

      // Decrement stock atomically using bulkWrite (prevents overselling race conditions)
      const bulkOps = order.items.map((item) => ({
        updateOne: {
          filter: { _id: item.product, stockQuantity: { $gte: item.quantity } },
          update: { $inc: { stockQuantity: -item.quantity } },
        },
      }));
      await Product.bulkWrite(bulkOps);
      // Mark any products that hit 0 as out of stock
      await Product.updateMany(
        { _id: { $in: order.items.map((i) => i.product) }, stockQuantity: { $lte: 0 } },
        { $set: { inStock: false, stockQuantity: 0 } },
      );

      await order.save();

      // Send email notifications for Razorpay orders
      const user = await User.findById(order.user);
      if (user) {
        // Populate order with product details for email
        const populatedOrder = await Order.findById(order._id).populate("items.product");

        // Send confirmation to customer (don't wait)
        sendOrderConfirmation(populatedOrder, user).catch((err) =>
          console.error("Email error:", err),
        );
        // Send alert to admin (don't wait)
        sendAdminOrderAlert(populatedOrder, user).catch((err) =>
          console.error("Email error:", err),
        );
      }

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
      message: "Payment verification failed. Please contact support.",
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
      message: "Failed to record payment failure.",
    });
  }
};
