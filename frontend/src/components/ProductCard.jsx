import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product, addToCart, cart, updateQuantity }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const inWishlist = isInWishlist(product._id || product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      sessionStorage.setItem("redirectMessage", "Please login to add items to your wishlist");
      sessionStorage.setItem("redirectFrom", window.location.pathname);
      navigate("/login");
      return;
    }

    try {
      if (inWishlist) {
        await removeFromWishlist(product._id || product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  // Check if product is in cart
  const cartItem = cart?.find((item) => item.id === product.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(product.id, quantityInCart + 1);
    } else {
      addToCart(product);
    }
  };

  const handleDecrement = () => {
    if (quantityInCart > 0) {
      updateQuantity(product.id, quantityInCart - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.1 }}
      className="card group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden h-64">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              !product.inStock ? "opacity-40 grayscale" : ""
            }`}
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-800 font-bold text-lg bg-white/95 px-6 py-3 rounded-lg shadow-lg border-2 border-gray-300">
                Out of Stock
              </span>
            </div>
          )}
          {/* Wishlist Heart Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors z-10 cursor-pointer"
          >
            <Heart
              className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </motion.button>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <p className="text-sm text-primary-600 font-medium mb-1">{product.subtitle}</p>
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price and Action Buttons Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Price */}
          <div className="flex-shrink-0">
            <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
            <p className="text-sm text-gray-500">{product.weight}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Buy Now Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                if (!isAuthenticated) {
                  sessionStorage.setItem("redirectMessage", "Please login to purchase");
                  sessionStorage.setItem("redirectFrom", window.location.pathname);
                  navigate("/login");
                  return;
                }
                sessionStorage.setItem("buyNowItem", JSON.stringify({ ...product, quantity: 1 }));
                navigate("/checkout");
              }}
              disabled={!product.inStock}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                product.inStock
                  ? "bg-accent-500 hover:bg-accent-600 text-white cursor-pointer shadow-sm"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "Buy Now" : "Out of Stock"}
            </motion.button>

            {/* Add to Cart or Quantity Controls */}
            {quantityInCart > 0 ? (
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDecrement}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  −
                </motion.button>
                <span className="px-3 py-1.5 font-semibold text-gray-900 border-x border-gray-300 text-sm min-w-[2rem] text-center">
                  {quantityInCart}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleIncrement}
                  className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  +
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                  product.inStock
                    ? "bg-primary-600 hover:bg-primary-700 text-white cursor-pointer shadow-sm"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
