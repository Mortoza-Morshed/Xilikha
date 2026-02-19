import api from "./api.js";

/**
 * Get user's wishlist
 */
export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data.data;
};

/**
 * Add product to wishlist
 */
export const addToWishlist = async (productId) => {
  const response = await api.post(`/wishlist/${productId}`);
  return response.data.data;
};

/**
 * Remove product from wishlist
 */
export const removeFromWishlist = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data.data;
};

/**
 * Clear entire wishlist
 */
export const clearWishlist = async () => {
  const response = await api.delete("/wishlist");
  return response.data.data;
};
