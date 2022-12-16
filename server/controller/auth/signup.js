require("dotenv").config();
const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ status: false, message: "These are the required fields." });

  if (!validator.isEmail(email)) {
    return res.status(400).send({
      status: false,
      message: "Please provide email in correct format",
    });
  }

  try {
    const userExists = await User.exists({ email: email });

    if (userExists) {
      return res.status(400).send({
        status: false,
        message: "User with this email already exists in the database.",
        data: userExists,
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      newUser.save();
      jwt.sign(
        { email: newUser.email },
        process.env.SECRET_KEY,
        (err, token) => {
          if (err) {
            return res
              .status(500)
              .send({ status: false, message: err.message });
          } else {
            return res.status(200).send({
              status: true,
              message: "User signed up successfully",
              data: newUser,
              token: token,
            });
          }
        }
      );
    } catch (err) {
      return res.status(400).json({ status: false, message: err.message });
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};
