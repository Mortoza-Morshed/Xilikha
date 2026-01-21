import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/assets/logo.png" alt="Xilikha Logo" className="h-16 w-16 -my-2" />
            <div>
              <h1 className="text-2xl font-display font-bold text-primary-700">Xilikha</h1>
              <p className="text-xs text-gray-600">Heritage Wellness from Assam</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/how-to-use"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              How to Use
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Contact
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-colors relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-3"
          >
            <Link to="/" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              About
            </Link>
            <Link
              to="/how-to-use"
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              How to Use
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              Cart ({cartCount})
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
