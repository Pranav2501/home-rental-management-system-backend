const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/RentalDB.db');

// Get all maintenance requests
router.get('/', (req, res) => {
  db.all('SELECT * FROM MaintenanceRequest', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Get maintenance request by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM MaintenanceRequest WHERE maintenancerequest_ID = ?', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Create a new maintenance request
router.post('/', (req, res) => {
  const { tenant_ID, property_ID, RequestDate, Description, Status } = req.body;
  db.run(
    'INSERT INTO MaintenanceRequest (tenant_ID, property_ID, RequestDate, Description, Status) VALUES (?, ?, ?, ?, ?)',
    [tenant_ID, property_ID, RequestDate, Description, Status],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ data: { maintenancerequest_ID: this.lastID } });
    }
  );
});

// Update maintenance request
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { tenant_ID, property_ID, RequestDate, Description, Status } = req.body;
  db.run(
    'UPDATE MaintenanceRequest SET tenant_ID = ?, property_ID = ?, RequestDate = ?, Description = ?, Status = ? WHERE maintenancerequest_ID = ?',
    [tenant_ID, property_ID, RequestDate, Description, Status, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: `Maintenance request updated successfully`, changes: this.changes });
    }
  );
});

// Delete maintenance request
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM MaintenanceRequest WHERE maintenancerequest_ID = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Deleted maintenance request with ID: ${id}`, changes: this.changes });
  });
});

module.exports = router;
