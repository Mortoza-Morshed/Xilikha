import api from "./api";

// Create order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data.data;
};

// Get user's orders
export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data.data;
};

// Get single order
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data.data;
};
