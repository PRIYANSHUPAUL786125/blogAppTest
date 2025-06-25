const jwt = require("jsonwebtoken");
const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "unauthorized user need signup or login" });
  }
  const secretKey = process.env.SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};
module.exports = verifyAuth;
