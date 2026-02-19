import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Wishlist = ({ addToCart }) => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);
      await removeFromWishlist(productId);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your wishlist</p>
          <Link to="/login" className="btn-primary cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-display font-bold mb-2">My Wishlist</h1>
            <p className="text-primary-100">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wishlist Content */}
      <section className="section-padding">
        <div className="container-custom">
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">Start adding products you love to your wishlist!</p>
              <Link to="/shop" className="btn-primary cursor-pointer">
                Browse Products
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product, index) => (
                <motion.div
                  key={product._id || product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product._id || product.id}`}>
                    <div className="relative h-64 overflow-hidden cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-6">
                    <p className="text-primary-600 text-sm font-medium mb-1">{product.subtitle}</p>
                    <Link to={`/product/${product._id || product.id}`}>
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold text-gray-900 mb-4">₹{product.price}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                          product.inStock
                            ? "bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemove(product._id || product.id)}
                        disabled={removingId === (product._id || product.id)}
                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
