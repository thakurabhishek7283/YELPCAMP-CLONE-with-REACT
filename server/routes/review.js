const express = require("express");
const {
  createReview,
  deleteReview,
  updateReview,
} = require("../controllers/review.js");
const auth = require("../middlewares/auth.js");
const router = express.Router({ mergeParams: true });

router.post("/", auth, createReview);
router.delete("/:reviewId", auth, deleteReview);
router.patch("/:reviewId", auth, updateReview);

module.exports = router;
