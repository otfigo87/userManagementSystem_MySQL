const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config;

const app = express();
const port = process.env.PORT || 3001;

// Parsing middleware
// Parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
// Parse application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Template Engine
app.engine('hbs', exphbs.engine( {extname: '.hbs' }));
app.set('view engine', 'hbs');

// Connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  user: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// Connect to DB
pool.getConnection((err, connection) => {
    if(err){
        throw err; // Not Connected
    } else {
        console.log("Connected as ID" + connection.threadId);
    }
})

// Router
const routes = require('./server/routes/user'); // Path

app.use('/', routes);





app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})