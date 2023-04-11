const express = require("express");
const flights = express.Router();
const cors = require("cors");
const pool = require("./dmbs");

//middleware
flights.use(cors());
flights.use(express.json()); //req.body

async function searchFlights(origin, destination) {
  try {
    const fetch = require('node-fetch');
    const response = await fetch(`http://localhost:5000/flights?origin=${origin}&destination=${destination}`);
    const flights = await response.json();
    console.log('flights:', flights);
    return flights;
  } catch (error) {
    console.log('Error searching for flights:', error);
    return [];
  }
}

//ROUTES//

// get all flights
flights.get("/", async (req, res) => {
  try {
    const allFlights = await pool.query("SELECT * FROM flights");
    res.json(allFlights.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a specific flight by ID
flights.get("/:flightId", async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await pool.query("SELECT * FROM flights WHERE flightid = $1", [flightId]);
    res.json(flight.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

flights.get('/', async (req, res) => {
  const { origin, destination } = req.query;

  try {
    const flights = await searchFlights(origin, destination);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for flights' });
  }
});

module.exports = flights;
