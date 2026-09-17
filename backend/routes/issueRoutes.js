const express = require("express");

const router = express.Router();

const {
  createIssue,
  getMyIssues,
  getIssueById,
  updateIssueStatus,
  assignIssue,
  getAllIssues
} = require("../controllers/issueController");

// Create a new issue
router.post("/", createIssue);
// Get all issues for admin
router.get("/", getAllIssues);

// Get issues reported by a user
router.get("/my", getMyIssues);
router.put("/:id/status", updateIssueStatus);
router.put("/:id/assign", assignIssue);

// Get one issue by ID
router.get("/:id", getIssueById);


module.exports = router;