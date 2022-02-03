import Campground from "../models/campground";
import Review from "../models/review";
import { cloudinary } from "../imageupload/cloudinary";

export const getCampground = async (req, res) => {
  const { campId } = req.params;
  try {
    const campground = await Campground.findById(campId)
      .populate("creator", "fullName")
      .populate("hasRated", "_id")
      .populate("reviews");
    if (!campground)
      return res.status(404).json({ message: "campground not found" });

    return res.status(200).json({ campground });
  } catch (error) {
    return console.log("error during get campground", error);
  }
};
export const createCampground = async (req, res) => {
  const { title, description, tags, location } = req.body;
  const creator = req.userId;
  const images = req.files.map((file) => {
    return { imageUrl: file.url, publicId: file.public_id };
  });
  try {
    const campground = new Campground({
      title,
      description,
      tags,
      creator,
      location,
      images,
    });
    const newCampground = await campground.save();
    return res.status(201).json({ data: newCampground });
  } catch (error) {
    return console.log("error during create campground", error);
  }
};
export const getCampgrounds = async (req, res) => {
  const { page } = req.body;
  const beginIndex = page * 12 - 12;
  try {
    const campgrounds = await Campground.find()
      .skip(beginIndex)
      .limit(12)
      .populate("creator", "fullName");

    return res.status(200).json({ data: campgrounds });
  } catch (error) {
    return console.log("error during getcampgrounds", error);
  }
};
export const updateCampground = async (req, res) => {
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
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log("error while updating campground", error);
  }
};
export const deleteCampground = async (req, res) => {
  const { campId } = req.params;
  try {
    const reviews = await Campground.findById(campId);
    reviews.forEach((review) => {
      await Review.deleteOne({ _id: review._id });
    });
    await Campground.deleteOne({ _id: campId });
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log("error while deletion", error);
  }
};
