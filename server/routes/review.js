import express from "express";
import {
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/review";
const router = express.Router();

router.post("/", auth, createReview);
router.delete("/:reviewId", auth, deleteReview);
router.patch("/:reviewId", auth, updateReview);
