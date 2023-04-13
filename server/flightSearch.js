const express = require('express');
const flights = express.Router();
const pool = require('./dmbs');

flights.get('/flights', async(req, res) =>{
    const {origin, destination} = req.query;
    const query = "SELECT * FROM flights WHERE LOWER(origin) = LOWER($1) AND LOWER(destination) = LOWER($2)";
    pool.query(query, [origin, destination], (err, data) =>{
        if (err){
            return (res.json(err));
        }
        else{
            return (res.json(data));
        }
    })
})

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

module.exports = flights;