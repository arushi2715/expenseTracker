import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { BarChart } from "../components/BarChart";
import PieChart from "../components/PieChart";
import { Chart, registerables } from "chart.js";
import Snack from "../components/Snack";
import EditDialog from "../components/EditDialog";
import ExpenseTable from "../components/ExpenseTable";

function Dashboard(props) {
  const {
    categories,
    expenses,
    selectedCategory,
    handleChangeSelectedCategory,
    newexpense,
    handleExpenseChange,
    time,
    handleChangeTime,
    handleChangeExpenseName,
    expenseName,
    openDialog,
    selectedExpenseName,
    selectedExpenseAmount,
    handleCloseDialog,
    handleChangeSelectedExpenseName,
    handleChangeSelectedExpenseAmount,
    handleEditExpense,
    handleSaveEditedExpense,
    handleDeleteExpense,
    openSnack,
    activeStep,
    handleCloseSnack,
    handleBackStep,
    handleNextStep,
  } = props;

  Chart.register(...registerables);

  const [categoryInTable, setCategoryInTable] = useState([]);
  const [expenseInTable, setExpenseInTable] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    let catInTable = [];
    let expInTable = [];
    expenses.map((item) => {
      if (catInTable.includes(item.categoryId) === false) {
        catInTable.push(item.categoryId);
      }
    });

    catInTable.map((item) => {
      let x = [];
      let sum = 0;
      expenses.map((e) => {
        if (item === e.categoryId) {
          x.push(e);
          sum = sum + e.expense;
        }
      });
      let z;
      categories.map((c) => {
        if (c._id === item) z = c.category;
      });

      let y = {};
      y.catId = item;
      y.catName = z;
      y.expense = x;
      y.totalExpense = sum;
      expInTable.push(y);
    });
    setCategoryInTable(catInTable);
    setExpenseInTable(expInTable);

    // console.log("expInTable", expInTable);
    const temp1 = expInTable.map((item) => item.catName);
    setChartLabel(temp1);
    const temp2 = expInTable.map((item) => item.totalExpense);
    setChartValues(temp2);
  }, [categories, expenses]);

  const steps = [
    "Select a category",
    "Add expense details",
    "Select date and time",
  ];

  const snackProps = {
    openSnack,
    handleCloseSnack,
    text: "New Expense Added!",
  };

  const barChartProps = {
    chartLabel,
    chartValues,
  };

  const dialogProps = {
    openDialog,
    handleCloseDialog,
    selectedExpenseName,
    handleChangeSelectedExpenseName,
    selectedExpenseAmount,
    handleChangeSelectedExpenseAmount,
    handleEditExpense,
    handleSaveEditedExpense
  };
  const expenseTableProps = {
    handleEditExpense,
    handleDeleteExpense,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Snack {...snackProps} />
      <EditDialog {...dialogProps} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "2rem 2rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, margin: "2rem 1rem" }}>
          Add an expense in three simple steps!
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {activeStep === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "3rem 2rem 1rem 2rem",
            }}
          >
            <TextField
              id="select-cateogory"
              select
              label="Select a Category"
              value={selectedCategory}
              sx={{ width: "25rem", margin: "2rem 1rem" }}
              onChange={handleChangeSelectedCategory}
              helperText="Select a category to add expense"
            >
              {categories.map((item, index) => {
                return (
                  <MenuItem key={index} value={item._id}>
                    {item.category}
                  </MenuItem>
                );
              })}
            </TextField>
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "#153462" }}
              onClick={handleNextStep}
            >
              <Typography style={{ color: "white", fontWeight: "900" }}>
                Next
              </Typography>
            </Button>
          </div>
        )}
        {activeStep === 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "3rem 2rem 1rem 2rem",
            }}
          >
            <TextField
              id="expense_name"
              sx={{ width: "25rem", margin: "2rem 1rem" }}
              InputLabelProps={{ shrink: true }}
              label="Enter Expense Name"
              value={expenseName}
              onChange={handleChangeExpenseName}
              helperText="Enter your expense name"
            />

            <TextField
              id="expense"
              sx={{ width: "25rem", margin: "1rem 1rem" }}
              InputLabelProps={{ shrink: true }}
              type="number"
              label="Enter Expense Amount"
              value={newexpense}
              onChange={handleExpenseChange}
              helperText="Enter an expense amount in Rupees"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2rem 2rem 1rem 2rem",
              }}
            >
              <Button
                variant="outlined"
                size="large"
                style={{ border: "2px solid #153462", margin: "0 1rem" }}
                onClick={handleBackStep}
              >
                <Typography style={{ color: "#153462", fontWeight: "900" }}>
                  Previous
                </Typography>
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#153462" }}
                onClick={handleNextStep}
              >
                <Typography style={{ color: "white", fontWeight: "900" }}>
                  Next
                </Typography>
              </Button>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "3rem 2rem 1rem 2rem",
            }}
          >
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={time}
              onChange={handleChangeTime}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2rem 2rem 1rem 2rem",
              }}
            >
              <Button
                variant="outlined"
                size="large"
                style={{ border: "2px solid #153462", margin: "0 1rem" }}
                onClick={handleBackStep}
              >
                <Typography style={{ color: "#153462", fontWeight: "900" }}>
                  Previous
                </Typography>
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#153462" }}
                onClick={handleNextStep}
              >
                <Typography style={{ color: "white", fontWeight: "900" }}>
                  Next
                </Typography>
              </Button>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            margin: "1rem 2rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, margin: "0rem 1rem" }}
          >
            Expenses Analytics for different categories
          </Typography>

          {expenseInTable.length > 0 &&
            expenseInTable.map((e, index) => {
              // console.log("expenseinTable", e);
              return (
                <ExpenseTable e={e} index={index} {...expenseTableProps} />
              );
            })}
          <BarChart {...barChartProps} />
          <PieChart {...barChartProps} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default Dashboard;
