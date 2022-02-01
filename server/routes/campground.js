import express from "express";
import storage from "./imageupload/cloudinary";
import multer from "multer";
import {
  getCampground,
  createCampground,
  getCampgrounds,
  updateCampground,
  deleteCampground,
} from "../controllers/campground";

const upload = multer({ storage });

const router = express.Router();

router.get("/", getCampgrounds);
router.post("/new", auth, upload.array("images", 10), createCampground);
router.get("/:campId", getCampground);
router.patch("/:campId", auth, upload.array("images", 10), updateCampground);
router.delete("/:campId", auth, deleteCampground);
