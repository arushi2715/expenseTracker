import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";

function LogIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  console.log("hyee");

  function handleChange(event) {
    const { value, name } = event.target;
    setUser((previousUser) => {
      if (name === "email") {
        // console.log("hyee");
        return {
          email: value,
          password: previousUser.password,
        };
      } else if (name === "password") {
        return {
          email: previousUser.email,
          password: value,
        };
      }
    });
  }

  async function logIn(e) {
    e.preventDefault();
    const { email, password } = user;
    const result = await fetch(
      "https://resonate-assign.vercel.app/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await result.json();

    console.log(data);

    if (data.status === false) {
      window.alert(data.message);
      setUser({ email: "", password: "" });
    } else {
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/settings");
        window.alert(data.message);
        window.location.reload();
      } else {
        window.alert("There was some error, Please try again later.");
      }
    }
  }
  return (
    <div>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter email here"
            variant="outlined"
            sx={{ margin: "0.5rem" }}
            required
            value={user.email}
            name="email"
            onChange={handleChange}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ margin: "0.5rem" }}
            required
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button variant="outlined" sx={{ margin: "1rem" }} onClick={logIn}>
            Log In
          </Button>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Don't have an account? <br />
            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
              {" "}
              Sign Up
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
}

export default LogIn;
