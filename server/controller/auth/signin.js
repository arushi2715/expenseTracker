require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");

exports.signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "These fields are required." });
  }

  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res
      .status(400)
      .json({ status: false, message: "No user with this email exists." });
  } else {
    const token = jwt.sign(
      { email: userExists.email, password: userExists.password },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      status: true,
      token: token,
      message: "User logged in",
      data: userExists,
    });
  }
};
