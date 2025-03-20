const express = require("express");
const db = require("../db/connection.js");


const router = express.Router();
const verifyToken = require("../middleware/authentication.js");



// list all records for the day
router.get("/", async (req, res) => {
  try {
    const results = await req.db.all("SELECT * FROM appointments WHERE date(dateTime) = date('now')");
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
    res.status(500).send("error fetching appointments for the day");
  }
});

// get appointments by id

router.get("/:id",verifyToken, async (req, res) => {
  try {
     const appointmentId = req.params.id;
    const results = await req.db.all("SELECT * FROM appointments WHERE id = ?", appointmentId);
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
    res.status(500).send("error fetching appointments with id");
  }
});

// create a new appointment
router.post("/",verifyToken, async (req, res) => {
    try {
        const {createdById, assignedToId, dateTime, details} = req.body;
        const query = "INSERT INTO appointments (createdById, assignedToId, dateTime, details) VALUES (?, ?, ?, ?)";
        const values = [createdById, assignedToId, dateTime, details];

        const {lastID} = await req.db.run(query, values);
        res.status(201).send(`appointment created with id: ${lastID}`);
    } catch (e) {
        console.error("error creating appointment:", e);
        res.status(500).json({error: e.message});
    }
}
);

// update an appointment

router.put("/:id",verifyToken, async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const {createdById, assignedToId, dateTime, details} = req.body;
        const query = "UPDATE appointments SET createdById = ?, assignedToId = ?, dateTime = ?, details = ? WHERE id = ?";
        const values = [createdById, assignedToId, dateTime, details, appointmentId];


        const { lastID } = await req.db.run(query, values);
        res.status(200).send(`appointment updated with id: ${lastID}`);
    }
       
     catch (e) {
        console.error("error updating appointment:", e);
        res.status(500).json({error: e.message});
    }
});

// delete an appointment

router.delete("/:id",verifyToken, async (req, res) => {
    try{
        const appointmentId = req.params.id;
        const query = "DELETE FROM appointments WHERE id = ?";
        const values = [appointmentId];

        const { lastID } = await req.db.run(query, values);
        res.status(200).send(`appointment updated with id: ${lastID}`);
        }
    
    catch(e) {
        console.error("error deleting appointment:", e);
        res.status(500).json({error: e.message});
    }
});

module.exports = router;