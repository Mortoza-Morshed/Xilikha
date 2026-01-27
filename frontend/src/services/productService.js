import api from "./api";

// Get all products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data.data;
};

// Get featured products
export const getFeaturedProducts = async () => {
  const response = await api.get("/products/featured");
  return response.data.data;
};

// Get single product
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data;
};
