import express from "express";
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../Controllers/examController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect,  createExam);

router.get("/", protect, getAllExams);

router.get("/:id", protect, getExamById);

router.put("/:id", protect,  updateExam);

router.delete("/:id", protect,  deleteExam);

export default router;