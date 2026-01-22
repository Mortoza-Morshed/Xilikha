import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: 0,
    },
    weight: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["dried", "tea", "salted"],
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    benefits: [String],
    uses: [String],
    ingredients: [String],
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
