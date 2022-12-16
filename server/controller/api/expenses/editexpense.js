const express = require("express");
const { default: mongoose } = require("mongoose");
const Expense = require("../../../model/expenseModel");

exports.editExpense = async (req, res) => {
  const expenseId = req.params.id;
  if (!mongoose.Types.ObjectId(expenseId))
    return res
      .status(400)
      .json({ status: false, message: "Please enter a valid expense id." });

  const expenseExists = await Expense.findById({ _id: expenseId });
  if (!expenseExists)
    return res
      .status(400)
      .json({ status: false, message: "No expense with this id exists." });

  expenseExists.name = req.body.name;
  expenseExists.expense = req.body.expense;

  await expenseExists.save();

  return res.status(200).json({
    status: true,
    message: "You have edited the expense",
    updatedExpense: expenseExists,
  });
};
