export const products = [
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
    inStock: false,
    featured: true,
  },
  {
    id: "xilikha-tea-blend",
    name: "Xilikha Wellness Tea",
    subtitle: "Herbal Tea Blend",
    price: 250,
    weight: "50g (20 cups)",
    category: "tea",
    image: "/assets/tea-blend.png",
    description:
      "A carefully crafted blend of premium Xilikha with aromatic herbs. This wellness tea combines the ancient wisdom of Ayurveda with the rich heritage of Assamese tea culture.",
    benefits: [
      "Promotes digestive wellness",
      "Natural detoxification",
      "Boosts immunity",
      "Calming and soothing",
      "Caffeine-free herbal blend",
    ],
    ingredients: [
      "Dried Xilikha (Haritaki)",
      "Tulsi (Holy Basil)",
      "Ginger",
      "Lemongrass",
      "Cardamom",
    ],
    uses: [
      "Morning wellness ritual",
      "After-meal digestive aid",
      "Evening relaxation",
      "Daily detox tea",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "salted-xilikha",
    name: "Salted Xilikha",
    subtitle: "Traditional Assamese Delicacy",
    price: 180,
    weight: "100g",
    category: "salted",
    image: "/assets/salted-xilikha.png",
    description:
      "A traditional Assamese preparation of Xilikha preserved with natural salt. This tangy, savory delicacy is a nostalgic taste of home for every Assamese heart.",
    benefits: [
      "Traditional preservation method",
      "Long shelf life",
      "Authentic Assamese flavor",
      "Natural ingredients only",
      "Handcrafted with care",
    ],
    uses: [
      "Traditional Assamese meals",
      "Digestive aid after meals",
      "Pickle substitute",
      "Unique flavor enhancer",
    ],
    inStock: true,
    featured: true,
  },
];

export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};
