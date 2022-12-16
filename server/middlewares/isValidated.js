require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isValidated = async (req, res, next) => {
  jwt.verify(
    req.headers.token,
    process.env.SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        return res.status(500).json({ status: false, message: err.message });
      }
      console.log(decoded.email);
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        console.log(user, decoded.email);
        res.status(500).json({ message: "no user" });
      } else {
        (req.userId = user._id),
          (req.email = user.email),
          (req.budget = user.budget);
      }
      next();
    }
  );
};
