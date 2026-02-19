import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All wishlist routes require authentication
router.use(protect);

// @route   GET /api/wishlist
// @desc    Get user's wishlist
router.get("/", getWishlist);

// @route   POST /api/wishlist/:productId
// @desc    Add product to wishlist
router.post("/:productId", addToWishlist);

// @route   DELETE /api/wishlist/:productId
// @desc    Remove product from wishlist
router.delete("/:productId", removeFromWishlist);

// @route   DELETE /api/wishlist
// @desc    Clear entire wishlist
router.delete("/", clearWishlist);

export default router;
