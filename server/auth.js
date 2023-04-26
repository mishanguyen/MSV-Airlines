const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./dmbs');

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
      const newCustomer = await pool.query(
        "INSERT INTO customer (custid, fname, lname, address) VALUES ($1, $2, $3, $4)",
        [userId, fname, lname, address]
      );
    } else if (userType === "employee") {
      const newEmployee = await pool.query(
        "INSERT INTO employee (eid, fname, lname, address) VALUES ($1, $2, $3, $4)",
        [userId, fname, lname, address]
      );
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    console.log(`User with username ${username} created successfully`);
    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error(`Error creating user: ${err.message}`);
    res.status(500).json({ message: "Error creating user" });
  }
});

auth.post('/login', async (req,res) => {
  try {
     
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
          res.json({ message: 'success', token});
          
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
      }
  } catch (err) {
          res.status(400)
          res.send({ message: err });
  }
});

auth.post('/getuserinfo', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM login WHERE username = $1",
      [username]
    );
    if (user.rows[0].type === 'customer') {
      const userinfo = await pool.query("SELECT * FROM login JOIN customer on login.id = customer.custid AND login.username = $1", [username]);
      console.log(userinfo.rows[0]);
      // req.session.user = userinfo.rows[0]
      res.send(userinfo.rows[0]);

    } else if (user.rows[0].type === 'employee') {
      const userinfo = await pool.query("SELECT * FROM login JOIN employee ON login.id = employee.eid AND login.username = $1", [username]);
      console.log(userinfo.rows[0]);
      // req.session.user = userinfo.rows[0]
      res.send(userinfo.rows[0]);
    }
  } catch (err) {
    res.status(400);
    res.send({ message: err });
  }
});

// auth.get('/empview', async (req, res) => {
//   try {
//     const empView = await pool.query('SELECT * FROM emp_view');
//     res.send(empView.rows);
//   } catch (err) {
//     console.error(`Error fetching employee view: ${err.message}`);
//     res.status(500).json({ message: "Error fetching employee view" });
//   }
// });

// auth.get('/empview', async (req, res) => {
//   try {
//     const custId = req.query.custId;
//     const empView = await pool.query('SELECT * FROM emp_view WHERE custId = $1', [custId]);
//     res.send(empView.rows);
//   } catch (err) {
//     console.error('No info for user')
//   }
// });

auth.get('/empview/:custId?', async (req, res) => {
  try {
    const custId = req.params.custId;
    let empView;
    if (custId) {
      empView = await pool.query('SELECT * FROM emp_view WHERE custid = $1', [custId]);
    } else {
      empView = await pool.query('SELECT * FROM emp_view');
    }
    res.send(empView.rows);
  } catch (err) {
    console.error(`Error fetching employee view: ${err.message}`);
    res.status(500).json({ message: "Error fetching employee view" });
  }
});



module.exports = auth;
