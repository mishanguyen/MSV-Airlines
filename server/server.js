const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("express");
const auth = require('./auth');
const flights = require('./flightSearch');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use("/api/users", auth);
app.use("/", flights);

//search flight base on origin and destination

app.listen(5000, () => {console.log("Server started on port 5000")})
