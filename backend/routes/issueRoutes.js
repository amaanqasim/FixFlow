const express = require("express");

const router = express.Router();

const {
  createIssue,
  getMyIssues
} = require("../controllers/issueController");


// Create a new issue
router.post("/", createIssue);


// Get issues reported by a user
router.get("/my", getMyIssues);


module.exports = router;