const { Review } = require("../models/review.js");
const { Campground } = require("../models/campground.js");

exports.createReview = async (req, res) => {
  const { campId } = req.params;
  console.log("this is req.params", req.params);
  console.log("this is user id", req.userId);
  console.log("this is req.body", req.body);
  const { title, description, rating } = req.body;
  const creator = req.userId;
  try {
    const reviewdoc = new Review({
      title,
      rating,
      description,
      creator,
      campId,
    });
    const review = await reviewdoc.save();
    const campground = await Campground.findById(campId);

    campground.reviews.push(review._id);
    await campground.save();
    return res.status(201).json(review);
  } catch (error) {
    return console.log("error during createReview", error);
  }
};
exports.deleteReview = async (req, res) => {
  const { campId, reviewId } = req.params;
  try {
    const query = await Review.findByIdAndDelete(reviewId);
    console.log("delete query", query);
    const campground = await Campground.findById(campId);
    const newreviews = campground.reviews.filter(
      (review) => review !== reviewId
    );
    campground.reviews = newreviews;
    const newcampground = await campground.save();
    console.log("campground after deleting review", newcampground);
  } catch (error) {
    console.log("error during deletion of review", error);
  }
};
exports.updateReview = async (req, res) => {
  const { campId, reviewId } = req.params;
  const { rating, description } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $set: { rating, description, title } },
      { new: true }
    );
    return res.status(200).json(updatedReview);
  } catch (error) {
    return console.log("error during updation of review", error);
  }
};
