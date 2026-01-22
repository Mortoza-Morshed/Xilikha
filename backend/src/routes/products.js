import express from "express";
import {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProductById);

// Admin routes (will add auth middleware later)
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
