require("dotenv").config();
require("./config/cloudinary");

const express = require("express");
const issueRoutes = require("./routes/issueRoutes");

const app = express();

app.use(express.json());

app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "FixFlow Backend is running!"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`FixFlow server running on port ${PORT}`);
});