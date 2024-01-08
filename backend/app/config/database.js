const mysql = require('mysql2');
// const User = require('../models/User');
// const app = express();

const database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "agrivimaan"
});

// Connect to the database
database.connect((err) => {
    if (err) {
        console.error("Error while connecting to db", err);
        return;
    }
    console.log("Connected!");
   
});

module.exports = database;