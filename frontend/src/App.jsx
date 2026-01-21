import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import HowToUse from "./pages/HowToUse";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
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
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={cartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route
              path="/cart"
              element={
                <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
              }
            />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
