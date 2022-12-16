import { Alert, Snackbar } from "@mui/material";
import React from "react";

function Snack(props) {
  const { openSnack, handleCloseSnack,text } = props;
  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleCloseSnack}
        severity="success"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

export default Snack;
