import Campground from "../models/campground";

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
    return file.url;
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
    await campground.save();
    return res
      .status(201)
      .json({ campground, message: "created successfully" });
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

    return res.status(200).json({ campgrounds });
  } catch (error) {
    return console.log("error during getcampgrounds", error);
  }
};
// export const updateCampground = async (req, res) => {
//     const { title, description, tags, location } = req.body;
//     const images = req.files.map((file) => {
//         return file.url;
//       });

// };
// export const deleteCampground = () => {};
