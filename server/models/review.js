const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  message: {
    type: String,
    minLength: 5,
    maxLength: 225,
    required: true,
  },
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  campground: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Campground",
  },
});

exports.Review = mongoose.model("Review", reviewSchema);
