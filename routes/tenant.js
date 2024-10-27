const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/RentalDB.db');

// Get all tenants
router.get('/', (req, res) => {
  db.all('SELECT * FROM Tenant', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Get tenant by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM Tenant WHERE tenant_ID = ?', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Create a new tenant
router.post('/', (req, res) => {
  const { Name, Email, PhoneNumber } = req.body;
  if (!Name || !Email) {
    res.status(400).json({ error: 'Name and Email are required' });
    return;
  }

  db.run(
    'INSERT INTO Tenant (Name, Email, PhoneNumber) VALUES (?, ?, ?)',
    [Name, Email, PhoneNumber || ''],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ data: { tenant_ID: this.lastID, Name, Email, PhoneNumber } });
    }
  );
});

// Update tenant by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { Name, Email, PhoneNumber } = req.body;

  db.run(
    'UPDATE Tenant SET Name = ?, Email = ?, PhoneNumber = ? WHERE tenant_ID = ?',
    [Name, Email, PhoneNumber, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: `Tenant with ID ${id} updated successfully`, changes: this.changes });
    }
  );
});

// Delete tenant by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM Tenant WHERE tenant_ID = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Tenant with ID ${id} deleted successfully`, changes: this.changes });
  });
});

module.exports = router;
