const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const { loginValidation } = require('../utils/validation');

router.post('/login', async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { phone_number, Password } = req.body;

  try {
    const user = await User.findByPhoneNumber(phone_number);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // console.log(config)
    // Generate JWT token with user information
    const token = jwt.sign({ userId: user.id, username: user.Name }, config.jwt_secret_key, {
      expiresIn: '1h', // Token expires in 1 hour, adjust as needed
    });

    // Send the token in the response
    return res.status(200).json({ message: 'Login successful', token});
  } catch (error) {
    return res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
