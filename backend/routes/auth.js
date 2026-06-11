const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql } = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql.query`
      INSERT INTO Users (FullName, Email, PasswordHash)
      VALUES (${fullName}, ${email}, ${hashedPassword})
    `;

    res.status(201).json({ message: "Register successful" });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await sql.query`
      SELECT * FROM Users WHERE Email = ${email}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.UserID, email: user.Email },
      "cadeau_secret_key",
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.UserID,
        fullName: user.FullName,
        email: user.Email,
        role: user.Role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.get("/test", (req, res) => {
  res.json({
    message: "Auth API working",
  });
});

module.exports = router;
