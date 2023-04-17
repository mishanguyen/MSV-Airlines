const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./dmbs')
const auth = require('./auth');
const flights = require('./flightSearch');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded( {extended: true}));
app.use(cors());
app.use(express.json());
app.use("/api/users/", auth);
app.use("/api/flights", flights);

//search flight base on origin and destination

app.listen(8000, () => {console.log("Server started on port 8000")})