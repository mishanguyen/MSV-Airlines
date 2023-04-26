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

flights.post('/confirmbooking', async (req,res) => {
    const jsonData = JSON.parse(JSON.stringify(req.body))
    try{
        console.log(jsonData)
        const departureData = jsonData.departureData
        const query = "INSERT INTO ticket (price, purchaser, flightid, origin, destination, departuretime, arrivaltime) VALUES ($1, $2, $3, $4, $5, $6, $7) returning bookingid"
        const departureFlight = await pool.query(query, [departureData.price, departureData.custid, departureData.flightid, 
            departureData.origin, departureData.destination, departureData.departuretime, departureData.arrivaltime])
        console.log("flight:", departureFlight.rows[0].bookingid)
        if (jsonData.returnData){
            const returnData = jsonData.returnData
            const returnFlight = await pool.query(query, [returnData.price, returnData.custid, returnData.flightid,
            returnData.origin, returnData.destination, returnData.departuretime, returnData.arrivaltime])
            console.log("return:", returnFlight.rows[0].bookingid)
        }
        res.json(departureFlight.rows[0].bookingid)
    }
    catch (err){
        res.json(err)
        console.log(err)
    }
})

flights.post('/bookedflights', async (req, res) => {
    try{
        const {purchaser} = req.body
        const query = "SELECT * FROM ticket WHERE purchaser = $1"
        const tickets = await pool.query(query, [purchaser])
        // console.log(tickets.rows)
        res.send(tickets.rows)
    }
    catch (err){
        console.log(err)
    }
})

flights.post('/deleteflights', async (req, res) => {
    try {
        const {purchaser, tickets} = req.body
        const ids = tickets.map(ticket => parseInt(ticket))
        const query = "DELETE FROM ticket WHERE purchaser = $1 AND bookingid = ANY($2::int[])"
        const values = [purchaser, ids]
        const results = await pool.query(query, values)
        console.log(`Deleted ${results.rowCount} flights for User: ${purchaser}`)
        res.json(results.rowCount)
    }
    catch (err){
        console.log(err)
        res.json(err)
    }
})

flights.post('/updateflight', async (req, res) => {
    try {
        const jsonData = JSON.parse(JSON.stringify(req.body))
        const query = "UPDATE ticket SET flightid = $1, departuretime = $2, arrivaltime = $3, price= $4 WHERE purchaser = $5 AND bookingID = $6"
        console.log(jsonData)
        console.log(jsonData.departureData.flightid)
        const values = [jsonData.departureData.flightid, jsonData.departureData.departuretime, jsonData.departureData.arrivaltime, jsonData.departureData.price, jsonData.departureData.custid, jsonData.bookingID]
        console.log(values)
        const results = await pool.query(query, values)
        console.log(results)
        res.json(results.rowCount)
    } catch (err){
        console.log(err)
        res.json(err)
    }
})
module.exports = flights;