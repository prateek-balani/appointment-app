import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config(); // load env

const app = express();
const PORT = process.env.PORT || 5000;

// running the server
const initializeServer = async () => {
  try {
    // ensure tables are created 
    console.log("Checking database connection...");
    await db.get("SELECT 1"); // Simple query to verify the database is working
    console.log("Database connection verified!");


    // start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize the server:", error);
  }
};

