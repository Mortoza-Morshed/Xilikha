import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import About from "../pages/About";
import HowToUse from "../pages/HowToUse";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import OrderConfirmation from "../pages/OrderConfirmation";
import OrderHistory from "../pages/OrderHistory";
import OrderDetail from "../pages/OrderDetail";
import ProtectedRoute from "./ProtectedRoute";

const AppContent = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load cart from localStorage on initial mount
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("xilikha_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("xilikha_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Clear cart when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setCart([]);
      localStorage.removeItem("xilikha_cart");
    }
  }, [isAuthenticated]);

  const addToCart = (product, quantity = 1) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Store intended action in sessionStorage to show message on login page
      sessionStorage.setItem("redirectMessage", "Please login to add items to your cart");
      sessionStorage.setItem("redirectFrom", window.location.pathname);
      navigate("/login");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<Home addToCart={addToCart} cart={cart} updateQuantity={updateQuantity} />}
          />
          <Route
            path="/shop"
            element={<Shop addToCart={addToCart} cart={cart} updateQuantity={updateQuantity} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail addToCart={addToCart} cart={cart} updateQuantity={updateQuantity} />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} clearCart={clearCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-confirmation/:orderId"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppContent;
