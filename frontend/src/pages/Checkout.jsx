import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Assam",
    pincode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
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

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl mb-6"
          >
            ✅
          </motion.div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <p className="text-sm text-gray-500">Redirecting to homepage...</p>
        </motion.div>
      </div>
    );
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
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Shipping Information
                </h2>

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
                    className={`w-full ${
                      isProcessing ? "bg-gray-400" : "bg-primary-600 hover:bg-primary-700"
                    } text-white font-bold px-6 py-4 rounded-lg transition-colors text-lg`}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
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
