const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = express.Router();
const secret_key = process.env.SECRET_KEY;
const verifyToken = require("../middleware/authentication.js");



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

// list all staff
router.get("/staff", async (req, res) => {
  const role = 'staff';
  try {
    const result = await req.db.all("SELECT * FROM user WHERE role = ?", [role]);
    res.status(200).send(result);


  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error fetching staff");
  }
})

// list info based on user id
// list all staff
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await req.db.all("SELECT * FROM user WHERE id = ?", [userId]);
    res.status(200).send(result);


  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error fetching staff");
  }
})

// register a new user

router.post("/register", async (req, res) => {
  console.log("Register route hit...");
  try {
    console.log("req.body =", req.body);

    const { fname, lname, email, pass, role } = req.body;
    console.log(`fname=${fname}, lname=${lname}, pass=${pass}, role=${role}`);


    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(pass, 10);
    console.log("Password hashed:", hashedPassword);


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
        { expiresIn: '1h' } // expires in 1 hr
      );
      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        tokenType: "Bearer"
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(401).json({ error: err.message });
  }
});

// updating a role for a user
router.put("/role/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    const query = "UPDATE user SET role = ? WHERE id = ?";
    const values = [role, userId];
    console.log("role",role);
    console.log("userid",userId)

    await req.db.run(query, values);
    res.status(200).send("User role updated");
  } catch (e) {
    console.error("Error updating user role:", e);
    res.status(500).json({ error: e.message });
  }
}
);

//route to edit info
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userInfo = await req.db.get("SELECT * FROM user WHERE id = ?", [userId]);
    if (!userInfo) {
      return res.status(404).send("User not found");
    }

    const updatedInfo = {
      firstName: !req.body.firstName || req.body.firstName.trim() === "" ? userInfo.firstName : req.body.firstName.trim(),
      lastName: !req.body.lastName || req.body.lastName.trim() === "" ? userInfo.lastName : req.body.lastName.trim(),
      email: !req.body.email || req.body.email.trim() === "" ? userInfo.email : req.body.email.trim(),
    }
    const { firstName, lastName, email } = req.body;
    const query = "UPDATE user SET firstName = ?, lastName = ?, email = ? WHERE id = ?";
    const values = [updatedInfo.firstName, updatedInfo.lastName, updatedInfo.email, userId];

    await req.db.run(query, values);
    res.status(200).send("User role updated");
  } catch (e) {
    console.error("Error updating user role:", e);
    res.status(500).json({ error: e.message });
  }
}
);

module.exports = router;
