const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 1,
    max: 100,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 225,
    required: true,
  },
  creator: {
    type: String,
  },
  campId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Campground",
  },
});

exports.Review = mongoose.model("Review", reviewSchema);
