import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getProductById } from "../services/productService";

const ProductDetail = ({ addToCart, cart, updateQuantity }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Sync quantity with cart when product or cart changes
  useEffect(() => {
    if (product && cart) {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(1);
      }
    }
  }, [product, cart]);

  const handleAddToCart = () => {
    const cartItem = cart?.find((item) => item.id === product.id);
    if (cartItem) {
      // If already in cart, update quantity
      updateQuantity(product.id, quantity);
    } else {
      // If not in cart, add with quantity
      addToCart(product, quantity);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {error ? `Error: ${error}` : "Product Not Found"}
          </h2>
          <Link to="/shop" className="btn-primary cursor-pointer">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="container-custom px-4 md:px-6 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-primary-600 transition-colors font-medium cursor-pointer"
            >
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              to="/shop"
              className="text-gray-500 hover:text-primary-600 transition-colors font-medium cursor-pointer"
            >
              Shop
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-primary-600 font-medium mb-2">{product.subtitle}</p>
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-gray-900 mb-2">₹{product.price}</p>
              <p className="text-gray-600 mb-6">{product.weight}</p>

              <p className="text-gray-700 text-lg mb-8">{product.description}</p>

              {/* Benefits */}
              {product.benefits && (
                <div className="mb-8">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    Health Benefits
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-primary-600 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => {
                      const newQuantity = Math.max(1, quantity - 1);
                      setQuantity(newQuantity);
                      const cartItem = cart?.find((item) => item.id === product.id);
                      if (cartItem) {
                        updateQuantity(product.id, newQuantity);
                      }
                    }}
                    disabled={!product.inStock}
                    className={`px-4 py-2 transition-colors ${
                      product.inStock
                        ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    -
                  </button>
                  <span
                    className={`px-6 py-2 font-semibold ${
                      product.inStock ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      const newQuantity = quantity + 1;
                      setQuantity(newQuantity);
                      const cartItem = cart?.find((item) => item.id === product.id);
                      if (cartItem) {
                        updateQuantity(product.id, newQuantity);
                      }
                    }}
                    disabled={!product.inStock}
                    className={`px-4 py-2 transition-colors ${
                      product.inStock
                        ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 ${
                    product.inStock
                      ? "btn-primary cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-lg"
                  }`}
                >
                  {addedToCart
                    ? "✓ Added to Cart!"
                    : product.inStock
                      ? "Add to Cart"
                      : "Out of Stock"}
                </motion.button>
                <Link to="/shop" className="flex-1">
                  <button className="w-full btn-outline cursor-pointer">Continue Shopping</button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
