import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/orderService";
import { createRazorpayOrder, verifyPayment } from "../services/paymentService";

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Assam",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Check for buy now item in sessionStorage
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const buyNowData = sessionStorage.getItem("buyNowItem");
    if (buyNowData) {
      const item = JSON.parse(buyNowData);
      setBuyNowItem(item);
      setCheckoutItems([item]);
    } else {
      setCheckoutItems(cart);
    }
  }, [cart]);

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const subtotal = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      // Transform checkout items to match backend schema
      const orderData = {
        items: checkoutItems.map((item) => ({
          product: item._id, // MongoDB ID
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        paymentMethod: paymentMethod, // Add payment method
      };

      if (paymentMethod === "COD") {
        // Handle Cash on Delivery
        await createOrder(orderData);
        setOrderPlaced(true);
        // Clear buy now item or cart
        if (buyNowItem) {
          sessionStorage.removeItem("buyNowItem");
        } else {
          clearCart();
        }
        navigate("/orders");
      } else {
        // Handle Razorpay Payment

        // 1. Create order in DB first (PENDING status)
        const newOrder = await createOrder({
          ...orderData,
          paymentStatus: "PENDING",
          paymentMethod: "RAZORPAY",
        });
        const dbOrderId = newOrder._id;

        // 2. Create Razorpay order (amount verified server-side from DB)
        const { orderId, amount, keyId } = await createRazorpayOrder(dbOrderId);

        // 3. Open Razorpay Modal
        const options = {
          key: keyId,
          amount: amount,
          currency: "INR",
          name: "Xilikha",
          description: "Wellness Products Order",
          image: "/assets/logo.png",
          order_id: orderId,
          handler: async function (response) {
            try {
              // 4. Verify Payment (backend)
              const verifyData = {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId: dbOrderId,
              };

              const result = await verifyPayment(verifyData);

              if (result.success) {
                setOrderPlaced(true);
                // Clear buy now item or cart
                if (buyNowItem) {
                  sessionStorage.removeItem("buyNowItem");
                } else {
                  clearCart();
                }
                navigate("/orders");
              }
            } catch (err) {
              console.error("Payment verification failed:", err);
              setError("Payment verification failed. Please contact support.");
              setIsProcessing(false);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#16a34a",
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Order process error:", err);

      // Handle unauthorized error (expired token)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      setError(err.response?.data?.message || err.message || "Failed to process order.");
      setIsProcessing(false);
    }
  };

  if (checkoutItems.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-primary text-white px-4 md:px-6 py-8">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold"
          >
            Checkout
          </motion.h1>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                  Shipping Information
                </h2>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Street address, apartment, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="Assam">Assam</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="781001"
                      />
                    </div>
                  </div>

                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> This is a demo checkout. In production, payment will be
                      processed securely via Razorpay.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full cursor-pointer ${
                      isProcessing ? "bg-gray-400" : "bg-primary-600 hover:bg-primary-700"
                    } text-white font-bold px-6 py-4 rounded-lg transition-colors text-lg`}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </motion.button>
                </form>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mt-6">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-primary-600 bg-primary-50 ring-1 ring-primary-600"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-3 font-medium text-gray-900">Cash on Delivery (COD)</span>
                  </label>

                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "RAZORPAY"
                        ? "border-primary-600 bg-primary-50 ring-1 ring-primary-600"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="RAZORPAY"
                      checked={paymentMethod === "RAZORPAY"}
                      onChange={() => setPaymentMethod("RAZORPAY")}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <div className="ml-3 flex items-center">
                      <span className="font-medium text-gray-900 mr-2">Pay Online</span>
                      <span className="text-xs text-gray-500">(UPI, Cards, Net Banking)</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-700">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
