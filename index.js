const express = require('express')
const mysql = require('mysql')

const app = express()

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "2PROgr2"
});

conn.connect((err) => {
  if (err) {
    console.log("Nie połączono z bazą danych");
    console.log(err);
  } else {
    console.log("Połączono z bazą danych");
  }

})

app.get('/all', (req, res) => {
  conn.query("SELECT * FROM osoby", (err, data, data_info) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  })
})

app.get('/add/:imie/:nazwisko/:wiek', (req, res)=>{
  const imie = req.params.imie
  const nazwisko = req.params.nazwisko
  const wiek = req.params.wiek

  let sql = `INSERT INTO osoby VALUES ("", "${imie}", "${nazwisko}", "${wiek}")`
  conn.query(sql, (err, data, data_info) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  })
})

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000')
})