const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

// This array will act as your temporary user database
const users = [];
const JWT_SECRET = "your-super-secret-key-that-is-long-and-random";

// --- 1. User Registration (Signup) ---
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // --- Validation Block ---
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }
  // --- End Validation ---

  // Check if user already exists in the array
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User with this email already exists." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create and "save" the new user to the array
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  // Show the current user list in the terminal for debugging
  console.log("A new user signed up. Current user list:", users);

  res.status(201).json({ message: "User registered successfully!" });
});

// --- 2. User Login ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the array
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Generate a JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ message: "Login successful!", token });
});

module.exports = router;