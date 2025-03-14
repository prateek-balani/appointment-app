const express = require("express");
const db = require("../db/connection.js");


const router = express.Router();

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

router.get("/:id", async (req, res) => {
  try {
     const appointmentId = req.params.id;
    const results = await req.db.all("SELECT * FROM appointments WHERE id = ?", appointmentId);
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
    res.status(500).send("error fetching appointments with id");
  }
});

// update an appointment

router.put("/:id", async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const {createdById, assignedToId, dateTime, details} = req.body;
        const query = "UPDATE appointments SET createdById = ?, assignedToId = ?, dateTime = ?, details = ? WHERE id = ?";
        const values = [createdById, assignedToId, dateTime, details, appointmentId];


        db.run(query, values, function(e) {
        if (err) {
            console.error("error updating appointment:", e);
            res.status(400).json({error: e.message});
        } else {
            res.status(200).send("appointment updated");
        }
        });
    } catch (e) {
        console.error("error updating appointment:", e);
        res.status(500).json({error: e.message});
    }
});

// delete an appointment

router.delete("/:id", async (req, res) => {
    try{
        const appointmentId = req.params.id;
        const query = "DELETE FROM appointments WHERE id = ?";
        db.run(query, appointmentId, function(err) {
            if (err) {
                console.error("error deleting appointment:", err);
                res.status(400).json({error: err.message});
            } else {
                res.status(200).send("appointment deleted");
            }
        });
    }
    catch(e) {
        console.error("error deleting appointment:", e);
        res.status(500).json({error: e.message});
    }
});

module.exports = router;