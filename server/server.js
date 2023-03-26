// const express = require('express')
// const FlightSearch = require('./FlightSearch');

// const app = express()

// app.get("/api", (req, res) => {
//     res.json({ "users": ["userOne", "userTwo", "userThree"]})
// })

// app.listen(5200, () => { console.log("Server started on port 5200")})

const express = require('express')
const FlightSearch = require('./FlightSearch');

const app = express();

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"]})
})

app.get('/flights', async (req, res) => {
    const { origin, destination } = req.query;
  
    try {
      const flights = await FlightSearch.searchFlights(origin, destination);
      res.json(flights);
    } catch (error) {
      res.status(500).json({ message: 'Error searching for flights' });
    }
});

app.listen(5200, () => { console.log("Server started on port 5200")})
