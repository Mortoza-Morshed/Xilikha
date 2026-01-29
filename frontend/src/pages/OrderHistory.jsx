import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyOrders } from "../services/orderService";
import api from "../services/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    setCancelling(true);
    try {
      await api.put(`/orders/${orderToCancel}/cancel`);
      // Update local state
      setOrders(
        orders.map((order) =>
          order._id === orderToCancel ? { ...order, orderStatus: "cancelled" } : order,
        ),
      );
      setShowCancelModal(false);
      setOrderToCancel(null);
    } catch (err) {
      console.error("Error cancelling order:", err);
      setError("Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-primary text-white px-4 md:px-6 py-12">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            My Orders
          </motion.h1>
        </div>
      </section>

      {/* Orders List */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <div className="text-6xl mb-6">📦</div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link to="/shop" className="btn-primary inline-block">
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
                >
                  {/* Compact Order Row */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Product Images */}
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.product?.image || "/assets/placeholder.png"}
                          alt={item.product?.name}
                          className="w-12 h-12 rounded-lg border-2 border-white object-cover"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate text-sm sm:text-base">
                        {order.items.length === 1
                          ? order.items[0].product?.name || "Order"
                          : order.items.length === 2
                            ? `${order.items[0].product?.name || "Product"} & ${order.items[1].product?.name || "Product"}`
                            : `${order.items[0].product?.name || "Product"} & ${order.items.length - 1} more`}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" • "}
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* Status & Price */}
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                      <p className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
                        ₹{order.total}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/orders/${order._id}`}
                        className="px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
                      >
                        View
                      </Link>
                      {order.orderStatus === "pending" && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="cursor-pointer px-3 sm:px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Order?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={confirmCancelOrder}
                disabled={cancelling}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
