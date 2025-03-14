const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const secret_key = process.env.SECRET_KEY;



// list all records
router.get("/", async (req, res) => {
  try {
    const results = await req.db.all("SELECT * FROM user");
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

// register a new user

router.post("/register", async (req, res) => {
  console.log("Register route hit...");  // 1
  try {
    console.log("req.body =", req.body);  // 2

    const { fname, lname, email, pass, role } = req.body;
    console.log(`fname=${fname}, lname=${lname}, pass=${pass}, role=${role}`); // 3

    // 4
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(pass, 10);
    console.log("Password hashed:", hashedPassword); 

    // 5
    console.log("Inserting user...");
    const query = "INSERT INTO user (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)";
    const values = [fname, lname, email, hashedPassword, role];

    const { lastID } = await req.db.run(query, values);
    console.log("User inserted with ID:", lastID);
    return res.status(201).json({
      id: lastID,
      fname,
      lname,
      email,
      message: "User created successfully"
    });
  } catch (e) {
    console.error("Error registering user:", e);
    return res.status(500).json({ error: e.message });
  }
});

// login a user

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await req.db.get("SELECT * FROM user WHERE email = ?", [email]);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const pmatch = await bcrypt.compare(password, user.password);
        if (pmatch) {
            const token = jwt.sign(
              { id: user.id, role: user.role },
              secret_key,
              { expiresIn: '1h' }
            );
            return res.json({ token });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Error logging in user:", err);
        return res.status(401).json({ error: err.message });
    }
});

module.exports = router;
