const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const {
  createIssue,
  getMyIssues,
  getIssueById,
  updateIssueStatus,
  assignIssue,
  getAllIssues,
  getIssueHistory,
  getMyAssignedIssues,
  getAnalytics,
generateIssueQRCode
} = require("../controllers/issueController");

// Create a new issue
router.post("/", upload.single("image"), createIssue);
// Get all issues for admin
router.get("/", getAllIssues);
router.get("/analytics", getAnalytics);

// Get issues reported by a user
router.get("/my", getMyIssues);
router.get("/assigned", getMyAssignedIssues);
router.put("/:id/status", updateIssueStatus);
router.put("/:id/assign", assignIssue);
router.get("/:id/history", getIssueHistory);
router.get("/:id/qr", generateIssueQRCode);
router.get("/:id", getIssueById);


module.exports = router;