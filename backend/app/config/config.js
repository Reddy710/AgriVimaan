module.exports = {
    database:{
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root",
            database: "agrivimaan"
    },
    jwt_secret_key: "Agrivimaan_auth_key"
}

// Create a database connection
// const database = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "agrivimaan"
// });

// Connect to the database
// database.connect((err) => {
//     if (err) {
//         console.error("Error while connecting to db", err);
//         return;
//     }
//     console.log("Connected!");
// });

// module.exports = database;