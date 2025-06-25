const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./utils/connectDB");
connectDB();
const tokenVerification = require("./middleware/tokenVerify");
app.use(express.json());
app.use(tokenVerification);
const PORT = process.env.PORT || 3000;
app.use("/api", authRoutes);
app.listen(PORT, () => {
  console.log("listening to port " + PORT);
});
