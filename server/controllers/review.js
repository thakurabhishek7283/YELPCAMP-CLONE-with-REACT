const { Review } = require("../models/review.js");
const { Campground } = require("../models/campground.js");

exports.createReview = async (req, res) => {
  const { campId } = req.params;
  const { title, description, rating } = req.body;
  const creatorName = req.userName;
  const creatorId = req.userId;
  try {
    const reviewdoc = new Review({
      title,
      rating,
      description,
      creatorName,
      creatorId,
      campId,
    });
    const review = await reviewdoc.save();
    const campground = await Campground.findById(campId);

    campground.reviews.push(review._id);
    await campground.save();
    return res.status(201).json({ message: "success" });
  } catch (error) {
    return console.log("error during createReview", error);
  }
};
exports.deleteReview = async (req, res) => {
  const { campId, reviewId } = req.params;
  try {
    const query = await Review.findByIdAndDelete(reviewId);

    const campground = await Campground.findById(campId);
    campground.reviews.pull(reviewId);
    const newcampground = await Campground.findByIdAndUpdate(
      { _id: campId },
      campground
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("error during deletion of review", error);
  }
};
exports.updateReview = async (req, res) => {
  const { campId, reviewId } = req.params;
  const { title, rating, description } = req.body;
  try {
    await Review.findByIdAndUpdate(
      reviewId,
      { $set: { rating, description, title } },
      { new: true }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return console.log("error during updation of review", error);
  }
};
