const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./dmbs');

const saltRounds = 10;
const jwtSecret = 'secret-key';

auth.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hashedPassword]);
  const user = { id: result.rows[0].id, email };
  const token = jwt.sign(user, jwtSecret);
  res.status(201).json({ user, token });
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