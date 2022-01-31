import jwt from "jsonwebtoken";
import md5 from "md5";
import User from "../models/user";

const secret = process.env.SECRET_KEY;

export const signin = async (req, res) => {
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
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = md5(password);
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const newuser = await user.save();
    if (newuser) {
      const token = jwt.sign(newuser, secret, { expiresIn: "1h" });
      return res.json({
        token,
      });
    }
  } catch (error) {
    console.log("error occured during signup", error);
  }
};
