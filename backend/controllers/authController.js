const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPass,
    });
    const secretKey = process.env.SECRET;
    const payLoad = {
      _id: newUser._id,
      name: newUser.name,
    };
    const token = jwt.sign(payLoad, secretKey, { expiresIn: "7d" });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "the data of user is sucessfully stored",
      userName: newUser.name,
      email: newUser.email,
      id: newUser._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "the userdata cant be stored", error });
    console.log("error:" + error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesnot exists" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "wrong password entered by user" });
    }
    const secretKey = process.env.SECRET;
    const payLoad = {
      _id: existingUser._id,
      name: existingUser.name,
    };
    const token = jwt.sign(payLoad, secretKey, { expiresIn: "7d" });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      token,
      userName: existingUser.name,
      email: existingUser.email,
      id: existingUser._id,
      message: "the user is successfully autthenticated",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "the userdata is not authenticated", error });
    console.log(error);
  }
};
module.exports = { signUp, login };
