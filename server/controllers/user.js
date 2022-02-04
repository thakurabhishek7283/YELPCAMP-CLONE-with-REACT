const jwt = require("jsonwebtoken");
const md5 = require("md5");
const { User } = require("../models/user.js");

const secret = process.env.SECRET_KEY;

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = md5(password);
  try {
    const olduser = await User.findOne({ email });
    if (!olduser)
      return res.status(404).json({ message: "user doesn't exist" });

    if (olduser.password === passwordHash) {
      const token = jwt.sign({ email, password }, secret, { expiresIn: "1h" });
      return res.status(200).json({ token });
    }
  } catch (error) {
    console.log("error occur during signin", error);
  }
};
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = md5(password);
  try {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    });
    const newuser = await user.save();
    if (newuser) {
      const token = jwt.sign(newuser.toJSON(), secret, { expiresIn: "1h" });
      return res.json({
        token,
      });
    }
  } catch (error) {
    console.log("error occured during signup", error);
  }
};
