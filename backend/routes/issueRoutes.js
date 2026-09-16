const express = require("express");

const router = express.Router();

const {
  createIssue,
  getMyIssues,
  getIssueById
} = require("../controllers/issueController");


// Create a new issue
router.post("/", createIssue);


// Get issues reported by a user
router.get("/my", getMyIssues);


// Get one issue by ID
router.get("/:id", getIssueById);


module.exports = router;