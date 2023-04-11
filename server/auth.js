const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./dmbs');

const saltRounds = 10;
const jwtSecret = 'secret-key';

// auth.post("/signup", async (req, res) => {
//   const { name, email, password, userType } = req.body;
//   try {
//     // Check if user already exists
//     const existingUser = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );

//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ message: "Email already taken" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Insert new user into login table
//     const newUser = await pool.query(
//       "INSERT INTO users (name, email, password, type) VALUES ($1, $2, $3, $4) RETURNING id",
//       [name, email, hashedPassword, userType]
//     );


//     // Determine user type and insert into appropriate table
//     const userId = newUser.rows[0].id;

//     if (userType === "customer") {
//       const newCustomer = await pool.query(
//         "INSERT INTO customers (custid, email) VALUES ($1, $2)",
//         [userId, email]
//       );
//     } else if (userType === "employee") {
//       const newEmployee = await pool.query(
//         "INSERT INTO employee (sid) VALUES ($1)",
//         [userId]
//       );
//     } else {
//       return res.status(400).json({ message: "Invalid user type" });
//     }

//     res.json({ message: "User created successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Error creating user" });
//   }
// });

auth.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const result = await db.query('INSERT INTO Users (user_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, email, role', [name, email, hashedPassword, role]);
    const user = result.rows[0];
    
    const token = jwt.sign(user, jwtSecret);
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


auth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }
  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret);
  res.json({ user: { id: user.id, email: user.email }, token });
});

module.exports = auth;