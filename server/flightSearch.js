const express = require('express');
const flights = express.Router();
const pool = require('./dmbs');
// CREATE TABLE Airports (Code CHAR(3) PRIMARY KEY, Name VARCHAR(100));
// ALTER TABLE flights ADD COLUMN price VARCHAR(10);
// ALTER TABLE flights ADD COLUMN duration TIME(4);
// ALTER TABLE flights DROP CONSTRAINT flights_pkey;
// ALTER TABLE flights ADD CONSTRAINT flights_pkey PRIMARY KEY (flightID, departureTime, arrivalTime);
// Then add airports by uncommenting this:
// ---------------------------------------
// const axios = require("axios");

// insert all destinations into the airports table from ryanair api
// const options = {
//     method: 'GET',
//     url: 'https://ryanair.p.rapidapi.com/airports',
//     headers: {
//       'X-RapidAPI-Key': '219accc20bmshc6b364d4a30a483p17b8f9jsnd30ff7279175',
//       'X-RapidAPI-Host': 'ryanair.p.rapidapi.com'
//     }
//   };

//   axios.request(options).then(async (response) => {
//       response.data.forEach(code => {
//         const newAirport = pool.query(
//             "INSERT INTO Airports (code, name) VALUES ($1, $2)",
//             [code['code'], code['name']]
//         );
//       });
//   }).catch(function (error) {
//       console.error(error);
//   });
//---------------------------------------
// Then run this command:
// DELETE FROM airports where code not in ('STN', 'LGW', 'DUB', 'AGP', 'AMS', 'BCN', 'ARN', 'LIS', 'WMI', 'BER', 'BGY', 'BRU', 'BUD', 'BVA', 'CPH', 'HHN', 'LUX', 'SOF', 'STN', 'VIE', 'MAD', 'BTS', 'FCO');

// Then uncomment this to load flights (you're gonna have to wait a few minutes)
// -----------------------------------------------------------------------------
// function delay(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }

// async function getAirports() {
//     const query = 'SELECT code FROM airports ORDER BY code;';
//     const result = await pool.query(query);
//     return result.rows.map(row => row.code);
// }

// async function getFlights(origin, destination, startDate, endDate) {
//     const options = {
//         method: 'GET',
//         url: 'https://ryanair.p.rapidapi.com/flights',
//         params: {
//             origin_code: origin,
//             destination_code: destination,
//             origin_departure_date: startDate,
//             destination_departure_date: endDate,
//         },
//         headers: {
//             'X-RapidAPI-Key': '219accc20bmshc6b364d4a30a483p17b8f9jsnd30ff7279175',
//             'X-RapidAPI-Host': 'ryanair.p.rapidapi.com',
//         },
//     };
//     return axios.request(options).then((response) => {
//         const allFlights = [];

//         if (response.data.origin_to_destination_trip && response.data.origin_to_destination_trip.length > 0) {
//             allFlights.push(...response.data.origin_to_destination_trip.flat());
//         }
          
//         if (response.data.destination_to_origin_trip && response.data.destination_to_origin_trip.length > 0) {
//             allFlights.push(...response.data.destination_to_origin_trip.flat());
//         }
//         return allFlights;

//     }).catch(function (error) {
//         console.error(error);
//     });
// }

// async function storeFlights(flights) {
//     const query = 'INSERT INTO flights (flightID, origin, destination, departureTime, arrivalTime, price, duration) VALUES ($1, $2, $3, $4, $5, $6, $7);';
//     const values = flights.map(flight => [flight.flight_number, flight.origin_code, flight.destination_code, flight.departure_datetime_utc, flight.arrival_datetime_utc, flight.regular_fare, flight.duration_hours]);
//     console.log(values);
//     for (let i = 0; i < values.length; i++) {
//         await pool.query(query, values[i]);
//         console.log(`${values[i][0]}: ${values[i][1]} - ${values[i][2]}`);
//     }
// }
 
// async function main() {
//     const airports = await getAirports();
//     const startDate = new Date('2023-04-29');
//     const endDate = new Date('2023-04-29');

//     for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
//         for (let i = 1; i < airports.length; i++) {
//             for (let j = i + 1; j < airports.length; j++) {
//                 const origin = airports[i];
//                 const destination = airports[j];
//                 const flights = await getFlights(origin, destination, day.toISOString().substring(0, 10), day.toISOString().substring(0, 10));
//                 await delay(1100);
//                 if (flights) {
//                     await storeFlights(flights);
//                 } else {
//                     console.log('no flights');
//                 }
//             }
//         } 
//     }
// }

// main().catch(console.error);
// -------------------------------------------------------

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