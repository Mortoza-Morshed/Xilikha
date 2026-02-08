import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle } from "lucide-react";
import api from "../../services/api";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data.data);
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      const { data } = await api.put(`/orders/${id}/status`, { orderStatus: newStatus });
      setOrder(data.data);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-red-600">{error || "Order not found"}</h2>
        <Link to="/admin/orders" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/admin/orders"
        className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Order #{order._id.slice(-6).toUpperCase()}
            </h1>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-mono">
              {order._id}
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Status Control */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Order Status:</label>
          <select
            value={order.orderStatus}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            disabled={updating}
            className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none font-medium ${
              updating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${
              order.orderStatus === "delivered"
                ? "bg-green-50 text-green-700 border-green-200"
                : order.orderStatus === "cancelled"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-white border-gray-300"
            }`}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Package size={20} className="text-primary-600" />
              <h2 className="font-bold text-gray-900">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item, index) => (
                <div key={index} className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={item.product?.image || "/assets/placeholder.png"}
                    alt={item.product?.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product?.name || "Product"}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                  <div className="font-bold text-gray-900">₹{item.quantity * item.price}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mt-2 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold border-b pb-2 border-gray-100">
              <MapPin size={18} />
              <h2>Customer Details</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider">Name</span>
                <span className="font-medium">{order.shippingAddress.name}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider">Email</span>
                <a
                  href={`mailto:${order.shippingAddress.email}`}
                  className="text-primary-600 hover:underline"
                >
                  {order.shippingAddress.email}
                </a>
              </div>
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider">Phone</span>
                <span className="font-medium">{order.shippingAddress.phone}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs uppercase tracking-wider">
                  Address
                </span>
                <p className="text-gray-700 mt-1">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold border-b pb-2 border-gray-100">
              <CreditCard size={18} />
              <h2>Payment Info</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium">
                  {order.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus || "PENDING"}
                </span>
              </div>
              {order.razorpayPaymentId && (
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <span className="block text-gray-500 text-xs">Transaction ID</span>
                  <span className="font-mono text-xs text-gray-600 break-all">
                    {order.razorpayPaymentId}
                  </span>
                </div>
              )}

              {/* Mark Paid Button (e.g. for manual COD confirmation in future) */}
              {order.paymentStatus === "PENDING" && order.paymentMethod === "COD" && (
                <button
                  disabled
                  title="Feature coming soon"
                  className="w-full mt-4 bg-gray-100 text-gray-400 py-2 rounded-lg text-xs font-medium cursor-not-allowed"
                >
                  Mark as Paid (Soon)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
