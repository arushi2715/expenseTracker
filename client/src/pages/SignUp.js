import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  // console.log("hyee");

  function handleChange(event) {
    const { value, name } = event.target;
    setUser((previousUser) => {
      if (name === "username") {
        // console.log("hyee");
        return {
          username: value,
          email: previousUser.email,
          password: previousUser.password,
        };
      } else if (name === "email") {
        // console.log("hyee");
        return {
          username: previousUser.username,
          email: value,
          password: previousUser.password,
        };
      } else if (name === "password") {
        return {
          username: previousUser.username,
          email: previousUser.email,
          password: value,
        };
      }
    });
  }

  // console.log("hyee");

  async function signUp(e) {
    e.preventDefault();
    const { username, email, password } = user;
    const result = await fetch(
      "https://expense-tracker-mu-virid.vercel.app/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      }
    );

    const data = await result.json();

    console.log(data);

    if (data.status === false) {
      window.alert(data.message);
      setUser({ username: "", email: "", password: "" });
    } else {
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/settings");
        window.alert(data.message);
        // window.location.reload();
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
            label="Enter name here"
            variant="outlined"
            sx={{ margin: "0.5rem" }}
            required
            value={user.username}
            name="username"
            onChange={handleChange}
          />
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
          <Button variant="outlined" sx={{ margin: "1rem" }} onClick={signUp}>
            Sign Up
          </Button>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Already have an account? <br />
            <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
              {" "}
              Log In
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
}

export default SignUp;
