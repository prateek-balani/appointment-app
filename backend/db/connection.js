const sqlite3 = require("sqlite3")
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.sqlite");

const connectToDatabase = async () => {
    try {
        // Open the SQLite database (creates file if it doesn't exist)
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        //drop tables if they exits 
        await db.exec("DROP TABLE IF EXISTS user");
        await db.exec("DROP TABLE IF EXISTS appointments");

        // user table
        await db.exec(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'applicant' CHECK(role IN ('applicant', 'staff', 'admin'))
      );
    `);

        // appointment table 
        await db.exec(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        createdById INTEGER NOT NULL,
        assignedToId INTEGER NOT NULL,
        dateTime DATETIME NOT NULL,
        details TEXT,
        FOREIGN KEY (createdById) REFERENCES user(id),
        FOREIGN KEY (assignedToId) REFERENCES user(id)
      );
    `);

        // Insert sample data into the user table
        await db.run(
            `INSERT INTO user (firstName, lastName,email,password,role) VALUES (?, ?, ?, ?, ?)`,
            ["John", "Doe", "john@doe.com", "password", "staff"]
        );
        await db.run(
            `INSERT INTO user (firstName, lastName,email,password,role) VALUES (?, ?, ?, ?, ?)`,
            ["Jane", "Doe", "jane@doe.com", "password", "applicant"]
        );

        // Insert sample data into the appointments table
        await db.run(
            `INSERT INTO appointments (createdById, assignedToId, dateTime, details) VALUES (?, ?, ?, ?)`,
            [2, 1, "2025-03-14 10:00:00", "Meeting with John Doe"]
        );

        console.log("Connected to SQLite database successfully at:", dbPath);
        return db;
    } catch (err) {
        console.error("Error connecting to SQLite database:", err);
        throw err;
    }
};

module.exports = connectToDatabase;