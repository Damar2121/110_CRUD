const express = require("express");
let mysql = require("mysql12");
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mahasiswa',
  PORT: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:'+ err.stack);
    return;
  }
  console.log("Connected Suscessfully");
});

app.get('/api/mahasiswa', (req, res) => {
  db.query('SELECT * FROM biodata', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
        res.status(500).send('Error fetching mahasiswa');
        return;
    }
    res.json(results);
    });
});

