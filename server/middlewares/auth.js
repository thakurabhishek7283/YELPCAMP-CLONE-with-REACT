import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;
const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const payload = await jwt.verify(token, secret);
    const { email } = payload;
    const user = User.findOne({ email });
    req.userId = user._id;
  } catch (error) {
    return console.log("error during token verification", error);
  }
};
