const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());

// Increase request body size limit for uploaded images saved as base64
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Cadeau Case Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
