const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "2003",
    database: "Airline"
})

module.exports(pool);

// client.query("SELECT * FROM customer", (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     }
//     else{
//         console.log(err.message);
//     }
//     client.end;

// })