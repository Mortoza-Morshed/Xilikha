import { motion } from "framer-motion";

const HowToUse = () => {
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
            How to Use Xilikha
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto"
          >
            Discover traditional and modern ways to incorporate Xilikha into your wellness routine
          </motion.p>
        </div>
      </section>

      {/* Usage Guide */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4 text-center">🍲</div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 text-center">
                Traditional Cooking
              </h3>
              <p className="text-gray-700 text-center">
                Soak 2-3 pieces overnight. Use in khar, tenga, or traditional curries for authentic
                sour flavor.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4 text-center">💧</div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 text-center">
                Digestive Tonic
              </h3>
              <p className="text-gray-700 text-center">
                Boil 1-2 pieces in water for 10 minutes. Strain and drink for digestive wellness.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4 text-center">🍵</div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 text-center">
                Wellness Tea
              </h3>
              <p className="text-gray-700 text-center">
                Steep 1 teaspoon in hot water for 5-7 minutes. Enjoy morning or after meals.
              </p>
            </div>
          </div>

          {/* Storage Tips */}
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 text-center">
              Storage & Safety Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <span className="text-2xl mr-3">📦</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Proper Storage</h3>
                  <p className="text-gray-700">
                    Store in a cool, dry place away from direct sunlight.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🔒</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Seal After Use</h3>
                  <p className="text-gray-700">Always reseal the package tightly after opening.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">⏰</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Best Before</h3>
                  <p className="text-gray-700">
                    Consume within 6 months of opening for best quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Consultation</h3>
                  <p className="text-gray-700">
                    Consult an Ayurvedic practitioner for medicinal use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToUse;
