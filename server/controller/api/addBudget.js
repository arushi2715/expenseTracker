const express = require("express");
const validator = require("validator");
const User = require("../../model/userModel");

exports.addBudget = async (req, res) => {
  const { budget } = req.body;

  const user = await User.findOne({ email: req.email });

  console.log(user);

  if (user.budget !== undefined)
    return res
      .status(400)
      .json({ status: false, message: "You have already defined a budget!" });

  if (!budget) {
    return res
      .status(400)
      .json({ status: false, message: "Please enter a budget." });
  }

  user.budget = budget;

  await user.save();

  return res
    .status(200)
    .json({ status: true, message: "Budget successfully added", user });
};
