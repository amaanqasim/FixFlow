const express = require("express");

const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/authMiddleware");

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

// All issue routes require login
router.use(authenticateToken);

// Create a new issue
router.post("/", upload.single("image"), createIssue);

// Get all issues for admin
router.get("/", getAllIssues);

// Get analytics
router.get("/analytics", getAnalytics);

// Get issues reported by logged-in user
router.get("/my", getMyIssues);

// Get issues assigned to logged-in staff
router.get("/assigned", getMyAssignedIssues);

// Update issue status
router.put("/:id/status", updateIssueStatus);

// Assign issue to staff
router.put("/:id/assign", assignIssue);

// Get issue history
router.get("/:id/history", getIssueHistory);

// Generate issue QR code
router.get("/:id/qr", generateIssueQRCode);

// Get issue by ID
router.get("/:id", getIssueById);

module.exports = router;