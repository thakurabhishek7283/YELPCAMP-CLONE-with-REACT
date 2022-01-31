import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

const User = mongoose.model("User", userSchema);

export default User;
