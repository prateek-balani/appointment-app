const sqlite3 = require("sqlite3")
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.sqlite");

const connectToDatabase = async () => {
  try {
    // Open the SQLite database (will create the file if it doesn't exist)
    const db = await open({
      filename: dbPath, // Path to your SQLite database file
      driver: sqlite3.Database,
    });

    console.log("Connected to SQLite database successfully at:", dbPath);
    return db;
  } catch (err) {
    console.error("Error connecting to SQLite database:", err);
    throw err;
  }
};

// Export the database connection
 
module.exports = connectToDatabase;