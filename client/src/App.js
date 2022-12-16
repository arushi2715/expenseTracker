import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Routes, Route, Navigate } from "react-router-dom";
import userData from "./utils/users_data.json";

// const link = "https://resonate-assign-ap54.vercel.app/";

function App() {
  const [newbudget, setnewBudget] = useState(0);
  const [newcategory, setnewCategory] = useState("");
  const [newexpense, setnewExpense] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  // const [users, setUsers] = useState(userData);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [time, setTime] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpenseName, setSelectedExpensename] = useState("");
  const [selectedExpenseAmount, setSelectedExpenseAmount] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);

  async function handleSaveNewExpense() {
    //API call
    // e.preventDefault();
    const name = expenseName;
    const expense = newexpense;
    // console.log(selectedCategory);

    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/api/addExpense",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: expenseName,
          expense: expense,
          categoryId: selectedCategory,
        }),
      }
    );
    const data = await result.json();
    // console.log(data);

    if (data.status === false) window.alert(data.message);
    else {
      window.alert(data.message);
      setExpenseName(name);
      setnewExpense(newexpense);
      getExpenses();
    }
  }

  async function getExpenses() {
    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/api/getExpense",
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const data = await result.json();
    // console.log("getExpense", data.expense);
    if (data.status === false) window.alert(data.message);
    else setExpenses(data.expense);
  }

  const handleNextStep = () => {
    let temp = activeStep + 1;
    if (temp == 3) {
      handleSaveNewExpense();
      setOpenSnack(true);
      setActiveStep(0);
    } else {
      setActiveStep(temp);
    }
  };

  const handleBackStep = () => {
    let temp = activeStep - 1;
    setActiveStep(temp);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  async function getCategories() {
    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/api/getCategories",
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const data = await result.json();
    if (data.status === false) window.alert(data.message);
    else setCategories(data.category);
  }

  const handleBudgetChange = (event) => {
    // console.log(event.target)
    if (event.target.value.length > 0 && event.target.value >= 0)
      setnewBudget(event.target.value);
  };

  const handleCategoryChange = (e) => {
    setnewCategory(e.target.value);
  };

  async function handleAddCategory(event) {
    //API call
    event.preventDefault();
    const category = newcategory;
    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/api/addCategories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ category }),
      }
    );
    const data = await result.json();
    if (data.status === false) window.alert(data.message);
    else {
      window.alert(data.message);
      getCategories();
      setnewCategory("");
    }
  }

  async function handleSaveBudget(event) {
    //savebudget API call
    event.preventDefault();
    const budget = newbudget;
    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/api/addBudget",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ budget }),
      }
    );
    const data = await result.json();
    if (data.status === false) window.alert(data.message);
    else {
      window.alert(data.message);
      setnewBudget(budget);
    }
  }

  async function handleChangeSelectedCategory(event) {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  }

  const handleExpenseChange = (event) => {
    if (event.target.value.length > 0 && event.target.value >= 0)
      setnewExpense(event.target.value);
  };

  const handleChangeTime = (value) => {
    console.log(value);
    setTime(value);
  };

  const handleChangeExpenseName = (event) => {
    if (event.target.value.length > 0) setExpenseName(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeSelectedExpenseName = (event) => {
    if (event.target.value.length > 0)
      setSelectedExpensename(event.target.value);
  };

  const handleChangeSelectedExpenseAmount = (event) => {
    if (event.target.value.length > 0 && event.target.value >= 0)
      setSelectedExpenseAmount(event.target.value);
  };

  const handleEditExpense = (id, name, amount) => {
    setOpenDialog(true);
    // console.log(id, "hyee");
    setSelectedExpensename(name);
    setSelectedExpenseId(id);
    setSelectedExpenseAmount(amount);
    console.log(id, name, amount);
  };
  async function handleSaveEditedExpense() {
    console.log(selectedExpenseId);
    const name = selectedExpenseName;
    const expense = selectedExpenseAmount;
    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/api/editExpense/" +
        selectedExpenseId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, expense }),
      }
    );

    const data = await result.json();
    console.log(data);
    if (data.status == false) {
      window.alert(data.message);
    } else {
      window.alert(data.message);
      getExpenses();
    }
    setOpenDialog(false);
  }
async function handleDeleteExpense(id) {
    //API call
    console.log("hyee");
    setSelectedExpenseId(id);
    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/api/deleteExpense/" + id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    );

    const data = await result.json();
    if (data.status == false) {
      window.alert(data.message);
    } else {
      window.alert(data.message);
      getExpenses();
    }
  }

  const settingsProps = {
    newbudget,
    newcategory,
    handleBudgetChange,
    handleCategoryChange,
    categories,
    getCategories,
    handleAddCategory,
    handleSaveBudget,
  };
  const dashboardProps = {
    categories,
    selectedCategory,
    newexpense,
    expenses,
    time,
    expenseName,
    openDialog,
    selectedExpenseName,
    selectedExpenseAmount,
    selectedExpenseId,
    handleOpenDialog,
    handleCloseDialog,
    handleChangeSelectedExpenseName,
    handleChangeSelectedExpenseAmount,
    handleEditExpense,
    handleSaveEditedExpense,
    handleDeleteExpense,
    handleSaveNewExpense,
    handleChangeExpenseName,
    handleChangeTime,
    handleExpenseChange,
    handleChangeSelectedCategory,
    handleSaveEditedExpense,
    activeStep,
    openSnack,
    handleNextStep,
    handleBackStep,
    handleCloseSnack,
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCategories();
      getExpenses();
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={ localStorage.getItem("token")===null?<SignUp />:<Dashboard {...dashboardProps} /> } />
        <Route path="/login" element={<LogIn />} />
        <Route path="/settings" element={ localStorage.getItem("token")===null?<LogIn /> : <Settings {...settingsProps} />} />
        <Route path="/dashboard" element={localStorage.getItem("token")===null?<LogIn /> : <Dashboard {...dashboardProps} />} />
      </Routes>
    </div>
  );
}

export default App;
