const pool = require("../db");

const createIssue = async (req, res) => {
  try {
    const {
  title,
  description,
  category,
  priority,
  location,
  imageUrl,
  reportedBy
} = req.body;

    // Basic validation
    if (!title || !description || !category || !location || !reportedBy) {
      return res.status(400).json({
        message: "Title, description, category, and location are required."
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
  imageUrl || null,
  reportedBy
]
    );

    res.status(201).json({
      message: "Issue created successfully.",
      issue: result.rows[0]
    });

  } catch (error) {
    console.error("Create issue error:", error.message);

    res.status(500).json({
      message: "Failed to create issue."
    });
  }
};

module.exports = {
  createIssue
};