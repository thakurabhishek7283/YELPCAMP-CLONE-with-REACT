const express = require("express");
const { storage } = require("../imageupload/cloudinary.js");
const multer = require("multer");
const {
  getCampground,
  createCampground,
  getCampgrounds,
  updateCampground,
  deleteCampground,
} = require("../controllers/campground.js");
const auth = require("../middlewares/auth");

const upload = multer({ storage });

const router = express.Router();

router.get("/", getCampgrounds);
router.post("/new", auth, upload.array("images", 10), createCampground);
router.get("/:campId", getCampground);
router.patch("/:campId", auth, upload.array("images", 10), updateCampground);
router.delete("/:campId", auth, deleteCampground);

module.exports = router;
