import api from "./api";

// Create Razorpay order (amount is verified server-side from the DB order)
export const createRazorpayOrder = async (orderId) => {
  const response = await api.post("/payment/create-order", { orderId });
  return response.data;
};

// Verify payment
export const verifyPayment = async (data) => {
  const response = await api.post("/payment/verify", data);
  return response.data;
};

// Handle payment failure
export const handlePaymentFailure = async (data) => {
  const response = await api.post("/payment/failure", data);
  return response.data;
};
