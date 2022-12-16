import { styled } from "@mui/material/styles";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
function ExpenseTable(props) {
  //   console.log("expenseTableProps", props);
  const { e, index, handleEditExpense, handleDeleteExpense } = props;
  //   console.log("expenseTableProps",e)
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <TableContainer key={index} component={Paper} sx={{ margin: "2rem 2rem" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <caption>
          Expenses for Category ID: <b>{e.catId}</b>, Category Name:{" "}
          <b>{e.catName}</b>
        </caption>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Expense ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">
              Expense (in Rupees)
            </StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {e.expense.map((row) => {
            return (
              <StyledTableRow
                style={{
                  textDecoration: row.isDeleted ? "line-through" : "none",
                }}
                key={row._id}
              >
                <StyledTableCell component="th" scope="row">
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.expense}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    variant="outlined"
                    style={{
                      // border: "1px solid #153462",
                      margin: "0 1rem",
                      display: row.isDeleted ? "none" : "inherit",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditExpense(row._id, row.name, row.expense);
                    }}
                  >
                    <EditIcon sx={{ fontSize: "1.5rem", color: "#153462" }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      display: row.isDeleted ? "none" : "inherit",
                      margin: "0 1rem",
                    }}
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteExpense(row._id);
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: "1.5rem", color: "#EB455F" }} />
                  </IconButton>
                  <IconButton
                    variant="contained"
                    style={{
                      display: row.isDeleted ? "inherit" : "none",
                      margin: "0 1rem",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteExpense(row._id);
                    }}
                  >
                    <UndoIcon sx={{ fontSize: "1.5rem", color: "#153462" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseTable;
