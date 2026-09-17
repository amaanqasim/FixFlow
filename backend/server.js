require("dotenv").config();
require("./config/cloudinary");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const rateLimit = require("express-rate-limit");
const issueRoutes = require("./routes/issueRoutes");

const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests. Please try again later."
  }
});
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use("/api", apiLimiter);

app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "FixFlow Backend is running!"
  });
});

const PORT = 5000;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`FixFlow server running on port ${PORT}`);
});