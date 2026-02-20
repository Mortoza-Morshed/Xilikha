import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, getMe, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Rate limit: 10 attempts per 15 minutes for login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again in 15 minutes.",
  },
});

// Public routes (rate limited)
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

// Protected routes
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

export default router;
