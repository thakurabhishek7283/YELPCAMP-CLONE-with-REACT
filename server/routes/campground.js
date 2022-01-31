import express from "express";
import {
  getCampground,
  createCampground,
  getCampgrounds,
  updateCampground,
  deleteCampground,
} from "../controllers/campground";
const router = express.Router();

router.get("/", getCampgrounds);
router.post("/new", auth, createCampground);
router.get("/:campId", getCampground);
router.patch("/:campId", auth, updateCampground);
router.delete("/:campId", auth, deleteCampground);
