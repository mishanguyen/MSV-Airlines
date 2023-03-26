const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./dmbs");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// get all flights
app.get("/flights", async (req, res) => {
  try {
    const allFlights = await pool.query("SELECT * FROM flights");
    res.json(allFlights.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a specific flight by ID
app.get("/flights/:flightId", async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await pool.query("SELECT * FROM flights WHERE flightid = $1", [flightId]);
    res.json(flight.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5300, () => {
  console.log("server has started on port 5300");
});

