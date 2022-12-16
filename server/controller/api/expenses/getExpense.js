const express = require("express");
const Expense = require("../../../model/expenseModel");

exports.getExpense = async (req, res) => {
  //   console.log(req.userId);
  const expense = await Expense.find({ userId: req.userId }).populate(
    "categoryId",
    "_id"
  );

  expense.map((e) => {
    // console.log(e);
    e.categoryId = e.categoryId._id;
    // console.log(e.categoryId);
  });

  console.log(expense);

  if (!expense)
    return res
      .status(400)
      .json({ status: false, message: "No expense exists for this category." });

  return res
    .status(200)
    .json({ status: true, message: "These are your expenses.", expense });
};
