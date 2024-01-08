const express = require('express');
const router = express.Router();
const DroneInventory = require('../models/DroneInventory');
console.log('HI')
// GET all drones
// Update the route handlers in your router file

// GET all drones
router.get('/', async (req, res) => {
  try {
    const drones = await DroneInventory.getAllDrones();
    res.status(200).json(drones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch drones' });
  }
});

// GET a drone by ID
router.get('/:droneId', async (req, res) => {
  const droneId = req.params.droneId;
  try {
    const drone = await DroneInventory.getDroneById(droneId);
    if (!drone) {
      res.status(404).json({ error: 'Drone not found' });
    } else {
      res.status(200).json(drone);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch drone' });
  }
});

// POST a new drone
router.post('/', async (req, res) => {
  console.log(req.body)
  const newDrone = req.body;
  try {
    const result = await DroneInventory.createDrone(newDrone);
    res.status(201).json({ message: 'Drone created successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new drone' });
  }
});

// PUT/update a drone by ID
router.put('/:droneId', async (req, res) => {
  const droneId = req.params.droneId;
  const updatedDrone = req.body;
  try {
    const result = await DroneInventory.updateDrone(droneId, updatedDrone);
    res.status(200).json({ message: 'Drone updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the drone' });
  }
});
 module.exports= router;
