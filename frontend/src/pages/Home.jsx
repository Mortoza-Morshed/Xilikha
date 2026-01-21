import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts } from "../data/products";

const Home = ({ addToCart }) => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-primary-800/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Heritage Wellness
              <br />
              from the Heart of <span className="text-accent-400">Assam</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Discover the ancient power of Xilikha (Haritaki) - a traditional Assamese superfood
              bringing wellness to your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-lg transition-all text-lg w-full sm:w-auto min-w-[140px] shadow-lg hover:shadow-xl"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary-700 font-medium px-8 py-3.5 rounded-lg transition-all text-lg w-full sm:w-auto min-w-[140px]"
                >
                  Our Story
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Our <span className="text-gradient">Premium Collection</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked products that bring the authentic taste and wellness of Assam to your home
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                View All Products
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Why Choose Xilikha?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Pure & Natural",
                description:
                  "Sourced directly from the pristine forests of Assam with no artificial additives",
              },
              {
                icon: "🏔️",
                title: "Traditional Heritage",
                description:
                  "Prepared using time-honored Assamese methods passed down through generations",
              },
              {
                icon: "💚",
                title: "Wellness Benefits",
                description:
                  "Rich in antioxidants and traditional Ayurvedic properties for holistic health",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
