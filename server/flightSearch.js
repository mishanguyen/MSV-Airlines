const express = require('express');
const flights = express.Router();
const pool = require('./dmbs');

flights.get('/flights', async (req, res) => {
    try {
        const { origin, destination, departureDate, returnDate } = req.query;
    
        let query = "SELECT * FROM flights WHERE (origin = $1 AND destination = $2";
        const params = [origin, destination];
  
        if (departureDate) {
            query += " AND CAST(departureTime AS DATE) = $3)";
            params.push(departureDate);
        }

        if (returnDate) {
            query += " OR (origin = $2 AND destination = $1 AND CAST(departureTime AS DATE) = $4)";
            params.push(returnDate);
        }
  
        const data = await pool.query(query, params);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
  


//view all the available flights
flights.get('/allflights', async(req, res) =>{
    const query = "SELECT * FROM flights";
    pool.query(query, (err ,results) => {
        if(!err){
            const jsonData = JSON.parse(results);
            for (let i = 0; i < jsonData.length(); i++){
                console.log(jsonData[i].origin);
            }
            return (res.json(results))
        }
        else{
            return (res.json(err));
        }
    })
})

flights.get('/origins', async (req, res) => {
    const query = "SELECT DISTINCT code, name FROM airports ORDER BY name";
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        } else {
            const origins = results.rows;
            return res.json(origins);
        } 
    });
});

flights.get('/destinations', async (req, res) => {
    const query = "SELECT DISTINCT code, name FROM airports ORDER BY name";
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        } else {
            const destinations = results.rows;
            return res.json(destinations);
        }
    });
});

module.exports = flights;