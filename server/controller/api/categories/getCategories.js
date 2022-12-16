const express = require("express");
const { default: mongoose } = require("mongoose");
const Category = require("../../../model/categoryModel");
const User = require("../../../model/userModel");

exports.getCategories = async (req, res) => {
  const category = await Category.find({ userId: req.userId }).populate(
    "userId",
    "_id email"
  );

  if (!category)
    return res.status(400).json({
      status: false,
      message: "No categories exists for this user.",
    });

  return res.status(200).json({
    status: true,
    message: "These are your categories.",
    category,
  });
};
