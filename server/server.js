require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userAuthRoute = require("./routes/user.js");
const reviewRoute = require("./routes/review.js");
const campgroundRoute = require("./routes/campground.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", userAuthRoute);
app.use("/campground/:campId/review/", reviewRoute);
app.use("/campground", campgroundRoute);

const db_url = process.env.DB_URL;
mongoose
  .connect(db_url)
  .then(() => {
    console.log("database connection established successfully");
  })
  .catch((error) => console.log("this is the error", error));

app.use("/user", userAuthRoute);

app.get("/", (req, res) => {
  res.send("this is homepage");
});
app.get("*", () => {
  res.send("PAGE NOT FOUND");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
