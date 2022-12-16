import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Navigate } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [isSignedIn, setSignedIn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      console.log("auth");
      setSignedIn(true);
    }
  }, [isSignedIn]);

  async function userLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("budget");
    setSignedIn(false);
    navigate("/login");
    window.location.reload();
  }

  const handleSettingsClick = () => {
    navigate("/settings");
  };
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  if (isSignedIn) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            background: "#EEEEEE",
            boxShadow: "0px 0px white",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Toolbar>
            <Link to="/">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                z
              >
                <AccountBalanceIcon
                  fontSize="large"
                  style={{ color: "#153462" }}
                />
              </IconButton>
            </Link>

            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "600",
                color: "#153462",
                marginTop: "0.7rem",
              }}
            >
              Expenses
            </Typography>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                size="large"
                style={{ border: "2px solid #153462" }}
                onClick={handleSettingsClick}
              >
                <Typography style={{ color: "#153462", fontWeight: "900" }}>
                  Settings
                </Typography>
              </Button>

              <Button
                variant="outlined"
                size="large"
                style={{ border: "2px solid #153462", margin: "0 1rem" }}
                onClick={handleDashboardClick}
              >
                <Typography style={{ color: "#153462", fontWeight: "900" }}>
                  Dashboard
                </Typography>
              </Button>
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "#153462" }}
                  onClick={() => userLogOut()}
                >
                  <Typography style={{ color: "white", fontWeight: "900" }}>
                    Log Out
                  </Typography>
                </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            background: "#EEEEEE",
            boxShadow: "0px 0px white",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Toolbar>
            <Link to="/">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                z
              >
                <AccountBalanceIcon
                  fontSize="large"
                  style={{ color: "#153462" }}
                />
              </IconButton>
            </Link>

            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "600",
                color: "#153462",
                marginTop: "0.7rem",
              }}
            >
              Expenses
            </Typography>
            <Link to="/login">
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#153462" }}
              >
                <Typography style={{ color: "white", fontWeight: "900" }}>
                  Log In
                </Typography>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
