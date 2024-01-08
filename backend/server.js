const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/config/database');
const registerRoute = require('./app/routes/register');
const loginRoute = require('./app/routes/login');
const droneRoute = require('./app/routes/drones')
const User = require('./app/models/User');
const DroneInventory = require('./app/models/DroneInventory');


const app = express();

app.use(bodyParser.json());

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Create the users table if not exists
  User.createTable();
  DroneInventory.createTable();
});

// Routes
app.use('/auth', registerRoute);
app.use('/auth', loginRoute);

app.use('/drones', droneRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

