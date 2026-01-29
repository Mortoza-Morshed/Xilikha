import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getOrderById } from "../services/orderService";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
        setTimeout(() => navigate("/orders"), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusSteps = () => {
    const steps = [
      { key: "pending", label: "Order Placed", icon: "📝" },
      { key: "processing", label: "Processing", icon: "⚙️" },
      { key: "shipped", label: "Shipped", icon: "🚚" },
      { key: "delivered", label: "Delivered", icon: "✅" },
    ];

    const statusOrder = ["pending", "processing", "shipped", "delivered", "cancelled"];
    const currentIndex = statusOrder.indexOf(order?.orderStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex && order?.orderStatus !== "cancelled",
      active: index === currentIndex,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/orders" className="btn-primary inline-block">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-primary text-white px-4 md:px-6 py-12">
        <div className="container-custom">
          <Link to="/orders" className="text-white hover:underline mb-4 inline-block">
            ← Back to Orders
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            {order.items.length === 1
              ? order.items[0].product?.name || "Your Order"
              : order.items.length === 2
                ? `${order.items[0].product?.name || "Product"} & ${order.items[1].product?.name || "Product"}`
                : `${order.items[0].product?.name || "Product"} & ${order.items.length - 1} more`}
          </motion.h1>
        </div>
      </section>

      {/* Order Details */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                  Order Status
                </h2>
                <div className="relative">
                  <div className="flex justify-between">
                    {statusSteps.map((step, index) => (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl mb-2 ${
                            step.completed
                              ? "bg-primary-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <p
                          className={`text-xs sm:text-sm text-center px-1 ${
                            step.completed ? "text-gray-900 font-semibold" : "text-gray-500"
                          }`}
                        >
                          {step.label}
                        </p>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`absolute top-6 h-0.5 ${
                              step.completed ? "bg-primary-600" : "bg-gray-200"
                            }`}
                            style={{
                              left: `${(index + 0.5) * (100 / statusSteps.length)}%`,
                              width: `${100 / statusSteps.length}%`,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {order.orderStatus === "cancelled" && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-semibold">❌ This order has been cancelled</p>
                  </div>
                )}
              </motion.div>

              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 sm:py-4 border-b gap-3"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                        <img
                          src={item.product?.image || "/assets/placeholder.png"}
                          alt={item.product?.name || "Product"}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            ₹{item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  Shipping Address
                </h2>
                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.pincode}
                  </p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                  <p>Email: {order.shippingAddress.email}</p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Order Date</span>
                    <span className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Payment</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        order.paymentStatus,
                      )}`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link to="/shop" className="btn-outline w-full text-center block">
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetail;
