import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function EditDialog(props) {
  const {
    openDialog,
    handleCloseDialog,
    selectedExpenseName,
    handleChangeSelectedExpenseName,
    selectedExpenseAmount,
    handleChangeSelectedExpenseAmount,
    handleEditExpense,
    handleSaveEditedExpense
  } = props;
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Edit Expense Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="expense_name"
          label="Expense Name"
          variant="standard"
          sx={{ margin: "1rem 1rem" }}
          helperText="Enter new expense name"
          value={selectedExpenseName}
          onChange={handleChangeSelectedExpenseName}
        />
        <TextField
          id="expense_amount"
          InputLabelProps={{ shrink: true }}
          type="number"
          sx={{ margin: "1rem 1rem" }}
          label="Enter new amount in Rupees"
          value={selectedExpenseAmount}
          onChange={handleChangeSelectedExpenseAmount}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#153462", margin: "1rem 1rem" }}
          onClick={handleSaveEditedExpense}
        >
          <Typography style={{ color: "white", fontWeight: "900" }}>
            Save
          </Typography>
        </Button>
        <Button
          variant="outlined"
          size="large"
          style={{ border: "2px solid #153462", margin: "1rem 1rem" }}
          onClick={handleCloseDialog}
        >
          <Typography style={{ color: "#153462", fontWeight: "900" }}>
            Cancel
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
