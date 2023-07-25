let sql;
const sqlite3 = require("sqlite3").verbose();

// connect to DB
const db = new sqlite3.Database("./test.sqlite", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

});

// Create table

// sql = `INSERT INTO users(first_name, last_name, password, email) VALUES (?,?,?,?)`;
// db.run(sql, ['soukayna', 'khalis', 'drissoukayna', 'soukaynakhalis100@gmail.com'], (err) => {
//     if (err) return console.error(err.message);
// });

// GET The users data

// sql = `SELECT * FROM users`;

// db.all(sql, (err, result) => {
//   if (err) return console.error(err.message);
//   console.log(result);
// })
