const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { registerValidation } = require('../utils/validation');

router.post('/register', async (req, res) => {
  // Validate request body
  console.log("I am invoking")
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { Name, phone_number, Password, address} = req.body;

  try {
    // Check if phone number already exists
    console.log("I am something")
    const existingUser = await User.findByPhoneNumber(phone_number);
    console.log(existingUser)
    if (existingUser) {
      
      return res.status(409).json({ error: 'User with this phone number already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log(hashedPassword)
    // Create user with hashed password
    const newUser = await User.createUser(Name, phone_number, hashedPassword, address);
    
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error while registering user' });
  }
});

module.exports = router;