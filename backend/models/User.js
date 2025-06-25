const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username is required"],
    minlength: [3, "username should have atleast 3 characters"],
    maxlength: [20, "username must have maximum of 20 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password should be of minimum 6 characters"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
