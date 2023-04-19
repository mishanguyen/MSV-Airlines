const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./dmbs');

//sign up options for customers  
auth.post("/signup", async (req, res) => {
  const { username, password, userType, fname, lname, address } = req.body;
  console.log(req.body);
  try {
    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM login WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into login table
    const newUser = await pool.query(
      "INSERT INTO login (username, password, type) VALUES ($1, $2, $3) RETURNING id",
      [username, hashedPassword, userType]
    );


    // Determine user type and insert into appropriate table
    const userId = newUser.rows[0].id;
    
    if (userType === "customer") {
      console.log(newUser);
      const newCustomer = await pool.query(
        "INSERT INTO customer (custid, fname, address, lname) VALUES ($1, $2, $3, $4)",
        [userId, fname, address, lname]
      );
    } else if (userType === "employee") {
      const newEmployee = await pool.query(
        "INSERT INTO employee (eid, fname, address, lname) VALUES ($1, $2, $3, $4)",
        [userId, fname, address, lname]
      );
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error creating user" });
  }
});


// auth.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   console.log(req.body);
//   // Query database for customer with matching username and password
//   const customer = db.customers.find(c => c.username === username && c.password === password);

//   if (customer) {

//     // Generate JWT token with customer ID as payload 
//     const token = jwt.sign({ customerId: customer.id }, 'secret_key');

//     // Return success message and token to client
//     res.json({ message: 'success', token }); 
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });

auth.post('/login', async (req,res) => {
  try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //     return res.status(422).send({ message: errors.array() });
      // }
      const { username, password } = req.body;
      const user = await pool.query(
        "SELECT * FROM login WHERE username = $1",
        [username]
      );

      if (user) {
        const hashedPassword = user.rows[0].password;
        const ok = await bcrypt.compare(password, hashedPassword);
        if (ok) {
          const token = jwt.sign({ userId: user.id }, 'secret_key');
          res.json({ message: 'success', token });
          
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
      }
  } catch (err) {
          res.status(400)
          res.send({ message: err });
  }
});

module.exports = auth;