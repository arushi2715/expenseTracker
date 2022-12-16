const express = require("express");
const { default: mongoose } = require("mongoose");
const Category = require("../../../model/categoryModel");
const User = require("../../../model/userModel");

exports.addCategories = async (req, res) => {
  const { category } = req.body;

  if (!category)
    return res.status(400).json({
      status: false,
      message: "Please enter a category to proceed.",
    });

  const userId = req.userId;

  if (!mongoose.Types.ObjectId(userId))
    return res
      .status(400)
      .json({ status: false, message: "Please provide a valid object ID." });

  const newCategory = new Category({
    category: category,
    userId,
  });

  newCategory.save();

  return res.status(200).json({
    status: true,
    message: "You have created a new category",
    newCategory,
  });
};
