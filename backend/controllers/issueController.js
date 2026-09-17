const pool = require("../db");
const cloudinary = require("../config/cloudinary");
const generateQRCode = require("../utils/qrGenerator");
const analyzeIssue = require("../services/aiService");
// =========================================
// ADD ISSUE HISTORY
// =========================================

const addIssueHistory = async (
  issueId,
  action,
  changedBy,
  oldValue,
  newValue
) => {
  await pool.query(
    `INSERT INTO "issueHistory"
     ("issueId", action, "changedBy", "oldValue", "newValue", "createdAt")
     VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)`,
    [issueId, action, changedBy, oldValue, newValue]
  );
};


// =========================================
// CREATE ISSUE
// =========================================

const createIssue = async (req, res) => {
  try {
    const {
  title,
  description,
  category,
  priority,
  location,
  reportedBy
} = req.body;

let uploadedImageUrl = null;

if (req.file) {
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "fixflow/issues"
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(req.file.buffer);
  });

  uploadedImageUrl = uploadResult.secure_url;
}

    // Basic validation
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !reportedBy
    ) {
      return res.status(400).json({
        message: "Title, description, category, location, and reportedBy are required."
      });
    }

    const result = await pool.query(
      `INSERT INTO issues
        ("title", "description", "category", "priority", "status", "location", "imageUrl", "reportedBy")
       VALUES ($1, $2, $3, $4, 'OPEN', $5, $6, $7)
       RETURNING *`,
      [
        title,
        description,
        category,
        priority || "MEDIUM",
        location,
        uploadedImageUrl,
        reportedBy
      ]
    );

    const issue = result.rows[0];
    // AI analysis
const aiAnalysis = await analyzeIssue(description);

    // Record issue creation in history
    await addIssueHistory(
      issue.issueId,
      "ISSUE_CREATED",
      reportedBy,
      null,
      "OPEN"
    );

    res.status(201).json({
  message: "Issue created successfully.",
  issue,
  aiAnalysis
});

  } catch (error) {
    console.error("Create issue error:", error.message);

    res.status(500).json({
      message: "Failed to create issue."
    });
  }
};

// =========================================
// GET MY ISSUES
// =========================================

const getMyIssues = async (req, res) => {
  try {
    const { reportedBy } = req.query;

    if (!reportedBy) {
      return res.status(400).json({
        message: "reportedBy is required."
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM issues
       WHERE "reportedBy" = $1
       ORDER BY "createdAt" DESC`,
      [reportedBy]
    );

    res.status(200).json({
      message: "Issues fetched successfully.",
      issues: result.rows
    });

  } catch (error) {
    console.error("Get my issues error:", error.message);

    res.status(500).json({
      message: "Failed to fetch issues."
    });
  }
};


// =========================================
// GET ISSUE BY ID
// =========================================

const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM issues
       WHERE "issueId" = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Issue not found."
      });
    }

    res.status(200).json({
      message: "Issue fetched successfully.",
      issue: result.rows[0]
    });

  } catch (error) {
    console.error("Get issue by ID error:", error.message);

    res.status(500).json({
      message: "Failed to fetch issue."
    });
  }
};


// UPDATE ISSUE STATUS
// =========================================

const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolutionNote } = req.body;

    const validStatuses = [
      "OPEN",
      "ASSIGNED",
      "IN_PROGRESS",
      "RESOLVED",
      "CLOSED"
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status."
      });
    }

    // Get current issue information
    const currentIssue = await pool.query(
      `SELECT "status", "resolutionNote", "resolvedAt", "closedAt"
       FROM issues
       WHERE "issueId" = $1`,
      [id]
    );

    if (currentIssue.rows.length === 0) {
      return res.status(404).json({
        message: "Issue not found."
      });
    }

    const oldStatus = currentIssue.rows[0].status;
    const oldResolutionNote = currentIssue.rows[0].resolutionNote;

    // Resolution note is required when resolving
    if (status === "RESOLVED" && !resolutionNote) {
      return res.status(400).json({
        message: "Resolution note is required when resolving an issue."
      });
    }

    const result = await pool.query(
  `UPDATE issues
   SET "status" = $1,
       "resolutionNote" = CASE
         WHEN $2 = 'RESOLVED' THEN $3
         ELSE "resolutionNote"
       END,
       "updatedAt" = CURRENT_TIMESTAMP,
       "resolvedAt" = CASE
         WHEN $4 = 'RESOLVED' THEN CURRENT_TIMESTAMP
         ELSE "resolvedAt"
       END,
       "closedAt" = CASE
         WHEN $5 = 'CLOSED' THEN CURRENT_TIMESTAMP
         ELSE "closedAt"
       END
   WHERE "issueId" = $6
   RETURNING *`,
  [
    status,
    status,
    resolutionNote || oldResolutionNote,
    status,
    status,
    id
  ]
);
    // Record status change in history
    await addIssueHistory(
      id,
      "STATUS_CHANGED",
      req.user ? req.user.userId : 1,
      oldStatus,
      status
    );

    // Record resolution note in history
    if (status === "RESOLVED" && resolutionNote) {
      await addIssueHistory(
        id,
        "RESOLUTION_NOTE_ADDED",
        req.user ? req.user.userId : 1,
        null,
        resolutionNote
      );
    }

    res.status(200).json({
      message: "Issue status updated successfully.",
      issue: result.rows[0]
    });

  } catch (error) {
    console.error("Update issue status error:", error.message);

    res.status(500).json({
      message: "Failed to update issue status."
    });
  }
};


// =========================================
// ASSIGN ISSUE TO STAFF
// =========================================

const assignIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({
        message: "Staff ID is required."
      });
    }

    // Check whether the selected user is actually STAFF
    const staffResult = await pool.query(
      `SELECT "userId", name, email, role
       FROM users
       WHERE "userId" = $1
       AND role = 'STAFF'`,
      [staffId]
    );

    if (staffResult.rows.length === 0) {
      return res.status(404).json({
        message: "Staff member not found."
      });
    }

    // Get current issue information
    const currentIssue = await pool.query(
      `SELECT "status", "assignedTo"
       FROM issues
       WHERE "issueId" = $1`,
      [id]
    );

    if (currentIssue.rows.length === 0) {
      return res.status(404).json({
        message: "Issue not found."
      });
    }

    const oldStatus = currentIssue.rows[0].status;

    // Assign the issue
    const result = await pool.query(
      `UPDATE issues
       SET "assignedTo" = $1,
           "status" = 'ASSIGNED',
           "updatedAt" = CURRENT_TIMESTAMP
       WHERE "issueId" = $2
       RETURNING *`,
      [staffId, id]
    );

    // Record assignment in history
    await addIssueHistory(
      id,
      "ISSUE_ASSIGNED",
      req.user ? req.user.userId : 1,
      oldStatus,
      "ASSIGNED"
    );

    res.status(200).json({
      message: "Issue assigned successfully.",
      issue: result.rows[0]
    });

  } catch (error) {
    console.error("Assign issue error:", error.message);

    res.status(500).json({
      message: "Failed to assign issue."
    });
  }
};

// =========================================
// GET MY ASSIGNED ISSUES
// =========================================

const getMyAssignedIssues = async (req, res) => {
  try {
    const { staffId } = req.query;

    if (!staffId) {
      return res.status(400).json({
        message: "staffId is required."
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM issues
       WHERE "assignedTo" = $1
       ORDER BY "createdAt" DESC`,
      [staffId]
    );

    res.status(200).json({
      message: "Assigned issues fetched successfully.",
      issues: result.rows
    });

  } catch (error) {
    console.error("Get assigned issues error:", error.message);

    res.status(500).json({
      message: "Failed to fetch assigned issues."
    });
  }
};
// =========================================
// GET ALL ISSUES
// =========================================

const getAllIssues = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM issues
       ORDER BY "createdAt" DESC`
    );

    res.status(200).json({
      issues: result.rows
    });

  } catch (error) {
    console.error("Get all issues error:", error.message);

    res.status(500).json({
      message: "Failed to fetch issues."
    });
  }
};


// =========================================
// EXPORT CONTROLLERS
// =========================================
const getIssueHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM "issueHistory"
       WHERE "issueId" = $1
       ORDER BY "createdAt" ASC`,
      [id]
    );

    res.status(200).json({
      history: result.rows
    });

  } catch (error) {
    console.error("Get issue history error:", error.message);

    res.status(500).json({
      message: "Failed to fetch issue history."
    });
  }
};
// =========================================
// ADMIN ANALYTICS
// =========================================

const getAnalytics = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS "totalIssues",
        COUNT(*) FILTER (WHERE "status" = 'OPEN') AS "openIssues",
        COUNT(*) FILTER (WHERE "status" = 'ASSIGNED') AS "assignedIssues",
        COUNT(*) FILTER (WHERE "status" = 'IN_PROGRESS') AS "inProgressIssues",
        COUNT(*) FILTER (WHERE "status" = 'RESOLVED') AS "resolvedIssues",
        COUNT(*) FILTER (WHERE "status" = 'CLOSED') AS "closedIssues",
        COUNT(*) FILTER (WHERE "priority" IN ('HIGH', 'CRITICAL')) AS "highPriorityIssues"
      FROM issues
    `);

    res.status(200).json({
      analytics: result.rows[0]
    });

  } catch (error) {
    console.error("Get analytics error:", error.message);

    res.status(500).json({
      message: "Failed to fetch analytics."
    });
  }
};
// GENERATE QR CODE FOR ISSUE LOCATION
const generateIssueQRCode = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT "issueId", location
       FROM issues
       WHERE "issueId" = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Issue not found."
      });
    }

    const issue = result.rows[0];

    const qrData = JSON.stringify({
      issueId: issue.issueId,
      location: issue.location
    });

    const qrCode = await generateQRCode(qrData);

    res.status(200).json({
      issueId: issue.issueId,
      location: issue.location,
      qrCode
    });

  } catch (error) {
    console.error("Generate QR code error:", error.message);

    res.status(500).json({
      message: "Failed to generate QR code."
    });
  }
};
module.exports = {
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
};