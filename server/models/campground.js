const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      imageUrl: {
        type: String,
      },
      publicId: { type: String },
    },
  ],
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  tags: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    required: true,
  },
  // lat: Number,
  // long: Number,
  reviews: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Review" }],
  hasRated: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

exports.Campground = mongoose.model("Campground", campgroundSchema);
