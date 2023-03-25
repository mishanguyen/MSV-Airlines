const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./pg");

app.use(cors());
app.use(express.json());

//create a customer (signup)
// app.post("/signup", async(req, res) =>{
//     try{
//         console.log(req.body);
//     }
//     catch (err){
//         console.log(err.message);

//     }
// })

//search for flight
app.post("/search", async(req, res, next) =>{
    try{
        const filters = req.query;
        const filteredUsers = data.filter(user => {
            let valid = true;
            for (key in filters){
                console.log(key, user[key], filters[key]);
                isValid = isValid && user[key] == filters[key]; 
            }
            return valid;
        });
        res.send(filteredUsers)
    }
    catch (err){
        console.log(err.message);

    }
})
app.get("", (req, res) =>{
    res.json({"users": ["user1", "user2", "user3"]})


})

app.listen(4000, () => {console.log("Server started on port 5000")})