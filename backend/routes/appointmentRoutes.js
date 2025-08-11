const express = require("express");
const db = require("../db/connection.js");


const router = express.Router();
const verifyToken = require("../middleware/authentication.js");

//list all records
router.get("/", async (req, res) => {
  try {
    const results = await req.db.all("SELECT * FROM appointments");
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
    res.status(500).send("error fetching appointments for the day");
  }
});



// list all records for the day
router.get("/today", async (req, res) => {
  try {
    const results = await req.db.all("SELECT * FROM appointments WHERE date(dateTime) = date('now')");
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
    res.status(500).send("error fetching appointments for the day");
  }
});

// list available appointments
router.get("/appt", async (req, res) => {
  const { date,staffId } = req.query;

  try {
    const results = await req.db.all("SELECT * FROM appointments WHERE DATE(dateTime) = ? AND assignedToId = ?", [date,staffId]);

    const hours = [
      "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
    ];

    const timeSlots = results.map(slots => slots.dateTime.slice(11, 16));

    const availableSlots = hours.filter(time => !timeSlots.includes(time));



    res.status(200).send(availableSlots);
  } catch (e) {
    console.error(e);
    res.status(500).send("error fetching appointments for the day");
  }
});

// get appointments by user id

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const results = await req.db.all("SELECT * FROM appointments WHERE createdById = ?", userId);
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
    res.status(500).send("error fetching appointments with id");
  }
});

// create a new appointment
router.post("/", async (req, res) => {
  try {
    const { createdById, assignedToId, dateTime, details } = req.body;
    const query = "INSERT INTO appointments (createdById, assignedToId, dateTime, details) VALUES (?, ?, ?, ?)";
    const values = [createdById, assignedToId, dateTime, details];

    const { lastID } = await req.db.run(query, values);
    res.status(201).send(`appointment created with id: ${lastID}`);
  } catch (e) {
    console.error("error creating appointment:", e);
    res.status(500).json({ error: e.message });
  }
}
);


// update an appointment

router.put("/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { createdById, assignedToId, dateTime, details } = req.body;
    const query = "UPDATE appointments SET createdById = ?, assignedToId = ?, dateTime = ?, details = ? WHERE id = ?";
    const values = [createdById, assignedToId, dateTime, details, appointmentId];


    const { lastID } = await req.db.run(query, values);
    res.status(200).send(`appointment updated with id: ${lastID}`);
  }

  catch (e) {
    console.error("error updating appointment:", e);
    res.status(500).json({ error: e.message });
  }
});

// delete an appointment

router.delete("/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const query = "DELETE FROM appointments WHERE id = ?";
    const values = [appointmentId];

    const result = await req.db.run(query, values);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).send(`appointment deleted ${appointmentId}`);
  }

  catch (e) {
    console.error("error deleting appointment:", e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;