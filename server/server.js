const express = require('express')
const flights = require('./FlightInfo');
const cors =  require('cors');
const auth = require('./auth')
const app = express();

app.use(cors());
app.use('/flights', flights);

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"]})
})
 
app.use('/', auth);

app.listen(5000, () => { console.log("Server started on port 5000")})