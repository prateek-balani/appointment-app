const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY

// Middleware to verify admin user based on JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) return res.status(401).json({ message: "Access denied, no token provided." });

  try {
    // Verify token with secret key
    const decoded = jwt.verify(token, secretKey);

    if (decoded.role !== "admin" ) {
      return res.status(403).json({ message: "error user login related" });
    }

    req.user = decoded; // Attach user info to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;