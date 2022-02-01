import mongoose from "mongoose";

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
  images: {
    type: [String],
    required: true,
  },
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
  reviews: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Reviews" }],
  hasRated: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Campground = mongoose.model("Campground", campgroundSchema);

export default Campground;
