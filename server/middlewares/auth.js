const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const secret = process.env.SECRET_KEY;
const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = await jwt.verify(token, secret);

    const { email } = payload;
    const user = await User.findOne({ email: email });
    req.userId = user.id;
    req.userName = user.fullName;
    next();
  } catch (error) {
    return console.log("error during token verification", error);
  }
};

module.exports = auth;
