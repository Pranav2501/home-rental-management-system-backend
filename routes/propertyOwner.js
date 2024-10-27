const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/RentalDB.db');

// Get all property owners
router.get('/', (req, res) => {
  db.all('SELECT * FROM PropertyOwner', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Get property owner by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM PropertyOwner WHERE propertyowner_ID = ?', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Create a new property owner
router.post('/', (req, res) => {
  const { Name, Email, PhoneNumber, Address, TaxID } = req.body;
  db.run(
    'INSERT INTO PropertyOwner (Name, Email, PhoneNumber, Address, TaxID) VALUES (?, ?, ?, ?, ?)',
    [Name, Email, PhoneNumber, Address, TaxID],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ data: { propertyowner_ID: this.lastID } });
    }
  );
});

// Update a property owner
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { Name, Email, PhoneNumber, Address, TaxID } = req.body;
  db.run(
    'UPDATE PropertyOwner SET Name = ?, Email = ?, PhoneNumber = ?, Address = ?, TaxID = ? WHERE propertyowner_ID = ?',
    [Name, Email, PhoneNumber, Address, TaxID, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: `Property owner updated successfully`, changes: this.changes });
    }
  );
});

// Delete a property owner
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM PropertyOwner WHERE propertyowner_ID = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Deleted property owner with ID: ${id}`, changes: this.changes });
  });
});

module.exports = router;
