const express = require("express");
const Category = require("../../../model/categoryModel");
const Expense = require("../../../model/expenseModel");
const User = require("../../../model/userModel");

exports.addExpense = async (req, res) => {
  if (req.budget === undefined)
    return res
      .status(400)
      .json({ status: false, message: "Please add a budget to proceed." });

  const categories = await Category.find({ userId: req.userId });

  //   console.log(categories);

  if (categories.length === 0)
    return res.status(400).json({
      status: false,
      message:
        "No category exists for this user. Please add a category to proceed.",
    });

  const expense = new Expense({
    name: req.body.name,
    expense: req.body.expense,
    userId: req.userId,
    categoryId: req.body.categoryId,
  });

  await expense.save();

  return res
    .status(200)
    .json({ status: true, message: "Hey! New expense added.", expense });
};
