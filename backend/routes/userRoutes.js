const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/connection.js");
const bcrypt = require("bcrypt");


const router = express.Router();
const secret_key = process.env.SECRET_KEY;

// register a new user

router.post("/register", async (req, res) => {
    try {
        const {fname,lname,email,pass, role} = req.body;
        const hashedPassword = await bcrypt.hash(pass, 10); 

        const query = "INSERT INTO user (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)";
        const values = [fname, lname, email, hashedPassword, role];
        db.run(query, values, function(err) {
            if (err) {
                console.error("Error inserting user:", err);
                res.status(400).json({error: err.message});
            } else {
                res.status(201).send("User created successfully");
                res.json({ id: this.lastID, fname, lname, email });
            }
        });
    }
    catch(e){
        console.error("Error registering user:", e);
        res.status(500).json({error: e.message});

    }
});

// login a user

router.post("/login", async (req, res) => {
    const {email, pass} = req.body;

    db.get("SELECT * FROM user WHERE email = ?", [email], async (err, user) => {
        if(err || !user) {
            console.error("Error logging in user:", err);
            res.status(401).json({error: err.message});
        }

        const pmatch = await bcrypt.compare(pass, user.password);
        if(pmatch) {
            const token = jwt.sign({id: user.id}, secret_key, {expiresIn: '1h'});
            res.json({token: token});
        } else {
            res.status(401).json({error: "Invalid credentials"});
        }
    });
});

module.exports = router;
