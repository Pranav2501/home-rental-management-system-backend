const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/RentalDB.db');

// Get all properties
router.get('/', (req, res) => {
  db.all('SELECT * FROM Property', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Get property by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM Property WHERE property_ID = ?', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Create a new property
router.post('/', (req, res) => {
  const { Address, City, State, ZipCode, PropertyType, NumberOfRooms, RentAmount, propertyowner_ID } = req.body;
  db.run(
    'INSERT INTO Property (Address, City, State, ZipCode, PropertyType, NumberOfRooms, RentAmount, propertyowner_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [Address, City, State, ZipCode, PropertyType, NumberOfRooms, RentAmount, propertyowner_ID],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ data: { property_ID: this.lastID } });
    }
  );
});

// Update a property
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { Address, City, State, ZipCode, PropertyType, NumberOfRooms, RentAmount, propertyowner_ID } = req.body;
  db.run(
    'UPDATE Property SET Address = ?, City = ?, State = ?, ZipCode = ?, PropertyType = ?, NumberOfRooms = ?, RentAmount = ?, propertyowner_ID = ? WHERE property_ID = ?',
    [Address, City, State, ZipCode, PropertyType, NumberOfRooms, RentAmount, propertyowner_ID, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: `Property updated successfully`, changes: this.changes });
    }
  );
});

// Delete a property
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM Property WHERE property_ID = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Deleted property with ID: ${id}`, changes: this.changes });
  });
});

module.exports = router;
