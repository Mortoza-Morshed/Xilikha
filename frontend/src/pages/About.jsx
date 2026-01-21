import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white section-padding py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto"
          >
            Bringing the ancient wellness of Assam to your doorstep
          </motion.p>
        </div>
      </section>

      {/* Story Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Rooted in Tradition, Crafted for Wellness
            </h2>
            <p className="text-gray-700 mb-4">
              Xilikha is more than just a product—it's a bridge between generations, connecting the
              ancient wisdom of Assamese heritage with modern wellness needs. Our journey began in
              the lush, verdant forests of Assam, where the Haritaki fruit (locally known as
              Xilikha) has been treasured for centuries.
            </p>
            <p className="text-gray-700 mb-4">
              Growing up in Assam, we witnessed our grandmothers using Xilikha in traditional
              remedies and everyday cooking. This powerful fruit, revered in Ayurveda as one of the
              three fruits in Triphala, holds a special place in Assamese culture and cuisine.
            </p>
            <p className="text-gray-700">
              Today, we're on a mission to share this incredible gift of nature with the world,
              preserving traditional preparation methods while making it accessible to modern
              consumers who value natural, authentic wellness products.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">🌱 Sustainability</h3>
                <p className="text-gray-700">
                  We work directly with local farmers and forest communities, ensuring sustainable
                  harvesting practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">✨ Authenticity</h3>
                <p className="text-gray-700">
                  Every product is prepared using traditional Assamese methods, with no artificial
                  additives.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">💚 Quality</h3>
                <p className="text-gray-700">
                  We hand-select only the finest Xilikha fruits, ensuring premium quality in every
                  package.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-2">🤝 Community</h3>
                <p className="text-gray-700">
                  By supporting local farmers, we help preserve Assamese cultural heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
