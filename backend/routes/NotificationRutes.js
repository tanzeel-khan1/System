import express from "express";
import {
  createNotification,
  getNotifications,
  deleteNotification
} from "../Controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNotification);
router.get("/", protect, getNotifications);
router.delete("/:id", protect, deleteNotification);

export default router;