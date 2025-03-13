import sqlite3 from "sqlite3";


const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database.");
});

// user table

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`);
});

// appointments table
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      createdById INTEGER NOT NULL,
      assignedToId INTEGER NOT NULL,
      dateTime DATETIME NOT NULL,
      details TEXT,
      FOREIGN KEY (createdById) REFERENCES users(id),
      FOREIGN KEY (assignedToId) REFERENCES users(id)
      
    )`);
});
module.exports = db;
