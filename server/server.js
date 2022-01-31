import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import userAuthRoute from "./routes/user";
import reviewRoute from "./routes/review";
import campgroundRoute from "./routes/campground";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

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
