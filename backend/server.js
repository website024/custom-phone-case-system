const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

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
