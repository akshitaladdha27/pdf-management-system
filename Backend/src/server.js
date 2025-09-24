const express = require("express");
const cors = require("cors");
const authRoutes = require("./api/authRoutes");
const reportRoutes = require("./api/reportRoutes");

const app = express();
const PORT = 8000;


// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});