import express from "express";
import {
  submitContact,
  getAllMessages,
  updateMessageStatus,
} from "../controllers/contactController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, admin, getAllMessages);
router.put("/:id/status", protect, admin, updateMessageStatus);

export default router;
