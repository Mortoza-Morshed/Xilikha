import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Sample products from your frontend
const products = [
  {
    id: "dried-xilikha-100g",
    name: "Pure Dried Xilikha",
    subtitle: "Traditional Haritaki",
    price: 150,
    weight: "100g",
    category: "dried",
    image: "/assets/dried-xilikha.png",
    description:
      "Premium quality dried Xilikha (Haritaki) sourced directly from the lush forests of Assam. Naturally sun-dried to preserve its authentic flavor and medicinal properties.",
    benefits: [
      "Rich in antioxidants and vitamin C",
      "Supports digestive health",
      "Traditional Ayurvedic superfood",
      "No artificial preservatives",
      "Sustainably sourced from Assam",
    ],
    uses: [
      "Traditional Assamese dishes (khar, tenga)",
      "Ayurvedic preparations",
      "Herbal remedies",
      "Digestive tonic",
    ],
    inStock: true,
    featured: true,
    stockQuantity: 50,
  },
  {
    id: "xilikha-tea-blend-50g",
    name: "Xilikha Wellness Tea",
    subtitle: "Herbal Tea Blend",
    price: 250,
    weight: "50g",
    category: "tea",
    image: "/assets/tea-blend.png",
    description:
      "A unique wellness tea blend featuring premium Xilikha combined with traditional Assamese herbs. Perfect for daily wellness routine.",
    benefits: [
      "Boosts immunity",
      "Aids digestion",
      "Rich in antioxidants",
      "Calming and soothing",
      "100% natural ingredients",
    ],
    uses: ["Morning wellness drink", "After meals", "Evening relaxation"],
    ingredients: ["Xilikha", "Assam tea leaves", "Ginger", "Tulsi"],
    inStock: true,
    featured: true,
    stockQuantity: 30,
  },
  {
    id: "salted-xilikha-200g",
    name: "Salted Xilikha",
    subtitle: "Traditional Pickle",
    price: 180,
    weight: "200g",
    category: "salted",
    image: "/assets/salted-xilikha.png",
    description:
      "Traditional Assamese salted Xilikha preparation. A tangy and flavorful condiment that adds authentic taste to your meals.",
    benefits: [
      "Traditional Assamese recipe",
      "Long shelf life",
      "No artificial colors",
      "Handmade with care",
      "Unique flavor enhancer",
    ],
    uses: ["Side dish with rice", "Flavor enhancer in curries", "Traditional accompaniment"],
    inStock: true,
    featured: true,
    stockQuantity: 40,
  },
];

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log("🗑️  Cleared existing products");

    // Insert new products
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
