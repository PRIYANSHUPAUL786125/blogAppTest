const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./utils/connectDB");
connectDB();
const tokenVerification = require("./middleware/tokenVerify");
const cookieParser=require('cookie-parser');
const blogPostRouter=require('./routes/postRoutes');
app.use(express.json());
app.use(cookieParser()) 
const PORT = process.env.PORT || 3000;
app.use("/api", authRoutes);
app.use('/api',tokenVerification,blogPostRouter);
app.use((req,res,next)=>{
  return res.status(404).json({message:'sorry this route donot exist '})
})
app.listen(PORT, () => {
  console.log("listening to port " + PORT);
});
