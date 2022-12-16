const express = require("express");
const { default: mongoose } = require("mongoose");
const Expense = require("../../../model/expenseModel");

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  if (!mongoose.Types.ObjectId(expenseId))
    return res
      .status(400)
      .json({ status: false, message: "Please enter a valid object id" });

  const expenseExists = await Expense.findById({ _id: expenseId });

  if (!expenseExists)
    return res
      .status(400)
      .json({ status: false, message: "No expense with this id exists." });

  if (expenseExists.isDeleted === false) {
    expenseExists.isDeleted = true;
    expenseExists.save();
    return res.status(200).json({
      status: true,
      message: "An expense has been deleted",
      deletedExpense: expenseExists,
    });
  } else {
    expenseExists.isDeleted = false;
    expenseExists.save();
    return res.status(200).json({
      status: true,
      message: "Delete action have been reverted.",
      deletedExpense: expenseExists,
    });
  }
};
