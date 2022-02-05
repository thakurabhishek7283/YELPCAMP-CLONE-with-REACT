const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Campgrounds",
    allowed_formats: ["jpeg", "png"],
    use_filename: true,
    public_id: (req, file) => {
      return `${Date.now()}-${path.extname(file.originalname)}`;
    },
  },
});
module.exports = { storage: storage, cloudinary: cloudinary };
