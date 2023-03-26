// const { Client } = require('pg');

// const client = new Client ({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "huong1606",
//     //password: "2003",
//     database: "postgres"
// })

// client.connect();

// module.exports = client;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123',
  port: 5432,
});

module.exports = pool;
