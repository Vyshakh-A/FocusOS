import express from "express";
import { protect } from "../middleware/authMiddleware.js"
import { saveReflection, getReflectionHistory } from "../controllers/reflectionController.js";
import { get } from "mongoose";

const router = express.Router();

router.put("/today", protect, saveReflection)
router.put("/history", protect, getReflectionHistory);

export default router;