const express = require("express");
require("dotenv").config();
const pool = require("./db");
pool.query("SELECT NOW()")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Database connection failed:", err.message));
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "FixFlow Backend is running!"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`FixFlow server running on port ${PORT}`);
});