const db = require('../config/database');

class User {
  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        phone_number INT(15) NOT NULL,
        Password VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL
      )
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating users table: ', err);
      } else {
        console.log('Users table created successfully');
      }
    });
  
 
  }

  static createUser(Name, phone_number, Password, address, callback) {
    const sql = 'INSERT INTO users (Name, phone_number, Password, address) VALUES (?, ?, ?, ?)';
    db.query(sql, [Name, phone_number, Password, address], (err, result) => {
      if (err) {
        console.error('Error creating user: ', err);
        return callback(err, null);
      }
      console.log('User created successfully');
      return callback(null, result);
    });
  }
  static async findByPhoneNumber(phoneNumber) {
    try {
      const sql = 'SELECT * FROM users WHERE phone_number = ?';
      const result = await new Promise((resolve, reject) => {
        db.query(sql, [phoneNumber], (err, result) => {
          if (err) {
            console.error('Error finding user by phone number: ', err);
            reject(err);
          } else {
            resolve(result[0]); // Assuming one user per phone number
          }
        });
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;