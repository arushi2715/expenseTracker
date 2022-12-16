import { Button, TextField, Typography } from "@mui/material";
import React from "react";

function Settings(settingsProps) {
  const {
    newbudget,
    newcategory,
    getCategories,
    handleBudgetChange,
    handleCategoryChange,
    categories,
    handleAddCategory,
    handleSaveBudget,
  } = settingsProps;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2rem 0rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, margin: "0rem 1rem" }}>
          Enter/Edit your Budget
        </Typography>
        <TextField
          id="budget"
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Enter budget"
          value={newbudget}
          onChange={handleBudgetChange}
        />
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#153462",
            margin: "0 1rem",
          }}
          onClick={handleSaveBudget}
        >
          <Typography style={{ color: "white", fontWeight: "900" }}>
            Save
          </Typography>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, margin: "0rem 1rem" }}>
          Create new categories
        </Typography>
        <TextField
          id="category"
          InputLabelProps={{ shrink: true }}
          label="Enter Category"
          value={newcategory}
          sx={{ width: "20rem" }}
          onChange={handleCategoryChange}
        />
        <Button
          variant="outlined"
          size="large"
          style={{ border: "2px solid #153462", margin: "0 1rem" }}
          onClick={handleAddCategory}
        >
          <Typography style={{ color: "#153462", fontWeight: "900" }}>
            Add category
          </Typography>
        </Button>
      </div>
      <Typography
        sx={{ fontWeight: 600, margin: "4rem 0rem 1rem 0rem" }}
        variant="h5"
      >
        Your Categories:
      </Typography>
      {categories.map((item, index) => {
        return (
          <Typography id={index} variant="h6">
            {item.category}
          </Typography>
        );
      })}
    </div>
  );
}

export default Settings;
