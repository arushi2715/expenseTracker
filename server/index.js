require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const auth = require("./routes/auth");
const api = require("./routes/api");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Its working!");
});

app.use("/auth", auth);
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
