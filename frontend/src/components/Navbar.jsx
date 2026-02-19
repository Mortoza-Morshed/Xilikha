import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-4">
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
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              About
            </Link>
            <Link
              to="/how-to-use"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              How to Use
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              Contact
            </Link>

            {/* Wishlist Icon - Only show when logged in */}
            {user && (
              <Link to="/wishlist" className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary-600 cursor-pointer hover:text-primary-700 p-3 rounded-full transition-colors relative"
                >
                  <Heart className="h-6 w-6" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>
            )}

            {/* Cart Icon - Only show when logged in */}
            {user && (
              <Link to="/cart" className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 cursor-pointer hover:bg-primary-700 text-white p-3 rounded-full transition-colors relative"
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
            )}

            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
                  >
                    Register
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none relative"
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
            {/* Cart count badge on hamburger menu */}
            {cartCount > 0 && !isMenuOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </motion.span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-3"
          >
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
            >
              About
            </Link>
            <Link
              to="/how-to-use"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
            >
              How to Use
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
                >
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </>
            )}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
                >
                  My Orders
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left text-red-600 hover:text-red-700 font-medium py-2 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
