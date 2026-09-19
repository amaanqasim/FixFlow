const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // Check if email already exists
    const existingUser = await pool.query(
      'SELECT "userId" FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING "userId", name, email, role`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const result = await pool.query(
      `SELECT "userId", name, email, password, role
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
  {
    userId: user.userId,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
});
router.get("/staff", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT "userId", name, email
       FROM users
       WHERE role = 'STAFF'
       ORDER BY name ASC`
    );

    res.status(200).json({
      staff: result.rows
    });
  } catch (error) {
    console.error("Fetch staff error:", error.message);

    res.status(500).json({
      message: "Failed to fetch staff members"
    });
  }
});
module.exports = router;