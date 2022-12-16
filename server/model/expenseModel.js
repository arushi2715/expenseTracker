const mongoose = require("mongoose");
const User = require("./userModel");
const Category = require("../model/categoryModel");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: Category,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
