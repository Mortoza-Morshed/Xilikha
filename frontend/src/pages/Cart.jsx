import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-4">
            🛒
          </motion.div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/shop">
            <button className="btn-primary">Start Shopping</button>
          </Link>
        </div>
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
            Shopping Cart
          </motion.h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-xl font-display font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">{item.subtitle}</p>
                    <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 transition-colors mb-4"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-primary-600">
                      Add ₹{500 - subtotal} more for free shipping!
                    </p>
                  )}
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary mb-4"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <Link to="/shop">
                  <button className="w-full btn-outline">Continue Shopping</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
