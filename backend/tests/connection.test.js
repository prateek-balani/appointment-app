

const connectToDatabase = require("../db/connection.js");

describe("Connecting to SQLite db", () => {
    let db;
    beforeAll(async() => {
        db = await connectToDatabase();
    }
        )

    afterAll(async () => {
        await db.close();
    });
  test("should connect to the database and check if tables exist", async () => {
    
    // Query SQLite to get all table names
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
        const tableNames = tables.map((t) => t.name);
        expect(tableNames).toContain("user");
        expect(tableNames).toContain("appointments");
    });
  });
