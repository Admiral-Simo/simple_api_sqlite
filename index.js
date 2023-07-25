// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('users.sqlite');

// Create a users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
  )
`);

app.use(bodyParser.json());
app.use(cors());

// POST route to insert a new user
app.post('/users', (req, res) => {
  const { username, password, first_name, last_name, email } = req.body;
  if (!username || !password || !first_name || !last_name || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const insertQuery = `INSERT INTO users (username, password, first_name, last_name, email) 
                       VALUES (?, ?, ?, ?, ?)`;
  db.run(insertQuery, [username, password, first_name, last_name, email], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert user.' });
    }
    res.status(201).json({ message: 'User inserted successfully.' });
  });
});

// GET route to fetch all users
app.get('/users', (req, res) => {
  const selectQuery = `SELECT * FROM users`;
  db.all(selectQuery, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users.' });
    }
    res.json(rows);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
