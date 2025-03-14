const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectToDatabase = require("./db/connection.js");
const userRoutes = require("./routes/userRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");

dotenv.config(); // load env

const app = express();
const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend to make requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies (for forms)
app.use(express.urlencoded({ extended: true }));

// running the server
const initializeServer = async () => {
  try {
    // ensure tables are created 
    console.log("Checking database connection...");
    const db = await connectToDatabase(); // Simple query to verify the database is working
    console.log("Database connection verified!");

    // Middleware to inject the database into requests
    app.use((req, res, next) => {
      req.db = db; // Attach the database connection to requests
      next();
    });

    // Routes
    app.use("/users", userRoutes); // User routes
    app.use("/appointments", appointmentRoutes); // Appointment routes



    // start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize the server:", error);
  }
};


initializeServer();