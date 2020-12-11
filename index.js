const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.NODE_ENV === "development" ? process.env.DB_HOST_DEV : process.env.DB_HOST_PROD, // prod
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect();

const nocache = require("nocache");
app.use(nocache());
app.set("etag", false);
app.set('trust proxy', true)

app.use(cors());
app.use(bodyParser.urlencoded({
  urlencoded: { limit: '50mb', extended: true }
}));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

function serveReactApp(req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, "./public", "index.html"));
}

app.get("/", serveReactApp);
app.get("/draw", serveReactApp);
app.get("/view", serveReactApp);
app.get("/backgrounds", serveReactApp);
app.use(express.static(path.join(__dirname, "./public")));

app.post("/api/drawings", (req, res) => {
  let drawing = req.body
  const sql = `INSERT INTO drawings ( name, data, background_id, width)
    VALUES ('${drawing.name}','${drawing.data}', '${drawing.backgroundId}', '${drawing.width}' );`

  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  })
})

app.get("/api/drawings", async (req, res) => {
  const sql = `
  SELECT id, background_id, width, name, created_at, data FROM drawings
  ORDER BY created_at DESC 
  LIMIT 3 
  OFFSET ${req.query.page ? (req.query.page - 1) * 3 : 0};`

  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  })
})

app.post("/api/ratings", (req, res) => {
  const sql = `INSERT INTO ratings ( drawing_id, value)
    VALUES ('${req.body.drawing_id}','${req.body.rating}');`

    console.log(req.ip)

    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })
})

app.get("/api/ratings", (req, res) => {
  const sql = `SELECT AVG(value), COUNT(value) FROM ratings WHERE drawing_id = ${req.query.id};`

  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  })
})

// app.delete("/api/drawings", (req, res) => {
//   drawings = drawings.filter(drawing => drawing.id !== req.body.id)
//   res.send("ok")
// })

// start server
const port = process.env.PORT || 3016;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Express server is running at http://localhost:" + port);
});
