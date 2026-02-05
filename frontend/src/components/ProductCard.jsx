import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, addToCart, cart, updateQuantity }) => {
  const handleAddToCart = () => {
    addToCart(product);
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

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
            <p className="text-sm text-gray-500">{product.weight}</p>
          </div>

          {/* Show quantity controls if item is in cart, otherwise show Add to Cart button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center border border-gray-300 rounded-lg">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDecrement}
                className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                −
              </motion.button>
              <span className="px-4 py-2 font-semibold text-gray-900 border-x border-gray-300">
                {quantityInCart}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleIncrement}
                className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                +
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`${
                product.inStock
                  ? "bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } px-4 py-2 rounded-lg font-medium transition-colors shadow-md`}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
