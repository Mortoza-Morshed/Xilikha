import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getWishlist as getWishlistService,
  addToWishlist as addToWishlistService,
  removeFromWishlist as removeFromWishlistService,
  clearWishlist as clearWishlistService,
} from "../services/wishlistService";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("xilikha_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (err) {
      console.error("Error loading wishlist from localStorage:", err);
    }
  }, []);

  // Sync wishlist with backend when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      // Clear wishlist on logout
      setWishlist([]);
      localStorage.removeItem("xilikha_wishlist");
    }
  }, [isAuthenticated]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("xilikha_wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.error("Error saving wishlist to localStorage:", err);
    }
  }, [wishlist]);

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWishlistService();
      setWishlist(data.products || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError(err.response?.data?.message || "Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Add product to wishlist
  const addToWishlist = async (product) => {
    try {
      setError(null);
      // Optimistic update
      setWishlist((prev) => [...prev, product]);

      // Update backend
      await addToWishlistService(product._id || product.id);
    } catch (err) {
      // Revert on error
      setWishlist((prev) => prev.filter((p) => p._id !== product._id && p.id !== product.id));
      setError(err.response?.data?.message || "Failed to add to wishlist");
      throw err;
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      setError(null);
      // Optimistic update
      const previousWishlist = [...wishlist];
      setWishlist((prev) => prev.filter((p) => p._id !== productId && p.id !== productId));

      // Update backend
      await removeFromWishlistService(productId);
    } catch (err) {
      // Revert on error
      setWishlist(previousWishlist);
      setError(err.response?.data?.message || "Failed to remove from wishlist");
      throw err;
    }
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    try {
      setError(null);
      const previousWishlist = [...wishlist];
      setWishlist([]);

      await clearWishlistService();
    } catch (err) {
      setWishlist(previousWishlist);
      setError(err.response?.data?.message || "Failed to clear wishlist");
      throw err;
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((p) => p._id === productId || p.id === productId);
  };

  const value = {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
    refreshWishlist: fetchWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
