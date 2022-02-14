const { Review } = require("../models/review.js");
const { Campground } = require("../models/campground.js");
const { cloudinary } = require("../imageupload/cloudinary");
const mbxClient = require("@mapbox/mapbox-sdk/services/geocoding");

const mapboxToken = process.env.MAPBOX_TOKEN;

const geocoder = mbxClient({ accessToken: mapboxToken });

exports.getCampground = async (req, res) => {
  const { campId } = req.params;
  try {
    const campground = await Campground.findById(campId)
      .populate("creator", "fullName")
      .populate("hasRated", "_id")
      .populate("reviews");

    if (!campground)
      return res.status(404).json({ message: "campground not found" });

    return res.status(200).json(campground);
  } catch (error) {
    return console.log("error during get campground", error);
  }
};
exports.createCampground = async (req, res) => {
  const { title, description, tags, location } = req.body;
  const creator = req.userId;
  const images = req.files.map((file) => {
    return { imageUrl: file.path, publicId: file.filename };
  });
  try {
    const geoData = await geocoder
      .forwardGeocode({
        query: location,
        limit: 1,
      })
      .send();
    const geometry = geoData.body.features[0].geometry;
    const campground = new Campground({
      title,
      description,
      tags,
      creator,
      location: geometry,
    });
    campground.images.push(...images);
    const data = await campground.save();
    return res.status(201).json(data);
  } catch (error) {
    return console.log("error during create campground", error);
  }
};
exports.getCampgrounds = async (req, res) => {
  const { page } = req.query;

  const beginIndex = Number(page) * 12 - 12;
  try {
    const campgrounds = await Campground.find()
      .skip(beginIndex)
      .limit(12)
      .populate("creator", "fullName");

    return res.status(200).json(campgrounds);
  } catch (error) {
    return console.log("error during getcampgrounds", error);
  }
};
exports.updateCampground = async (req, res) => {
  const { title, description, tags, location, deleteArray } = req.body;
  const { campId } = req.params;
  const images = req.files.map((file) => {
    return { imageUrl: file.url, publicId: file.public_id };
  });
  try {
    const doc = await Campground.findByIdAndUpdate(
      campId,
      { title, description, tags, location },
      { new: true }
    );
    await doc.images.push(...images);
    const data = await doc.save();
    cloudinary.v2.api.delete_resources(deleteArray);
    if (deleteArray) {
      await doc.updateOne({
        $pull: { images: { publicId: { $in: deleteArray } } },
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log("error while updating campground", error);
  }
};
exports.deleteCampground = async (req, res) => {
  const { campId } = req.params;
  try {
    const campground = await Campground.findById(campId);
    const reviews = [...campground.reviews];
    const images = [...campground.images];

    // cloudinary.v2.api.delete_resources([...images.publicId]);
    images.forEach((element) => {
      cloudinary.uploader.destroy(element.publicId);
    });
    reviews.forEach(async (review) => {
      await Review.deleteOne({ _id: review._id });
    });

    await Campground.deleteOne({ _id: campId });
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log("error while deletion", error);
  }
};
