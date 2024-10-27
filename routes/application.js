const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/RentalDB.db');

// Get all applications with tenant name and property address
router.get('/', (req, res) => {
  const query = `
    SELECT Application.*, Tenant.Name AS TenantName, Property.Address AS PropertyAddress 
    FROM Application
    LEFT JOIN Tenant ON Application.tenant_ID = Tenant.tenant_ID
    LEFT JOIN Property ON Application.property_ID = Property.property_ID
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Get application by ID with tenant name and property address
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT Application.*, Tenant.Name AS TenantName, Property.Address AS PropertyAddress 
    FROM Application
    LEFT JOIN Tenant ON Application.tenant_ID = Tenant.tenant_ID
    LEFT JOIN Property ON Application.property_ID = Property.property_ID
    WHERE application_ID = ?
  `;
  
  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Create a new application
router.post('/', (req, res) => {
  const { tenant_ID, property_ID, ApplicationDate, ApplicationStatus } = req.body;
  db.run(
    'INSERT INTO Application (tenant_ID, property_ID, ApplicationDate, ApplicationStatus) VALUES (?, ?, ?, ?)',
    [tenant_ID, property_ID, ApplicationDate, ApplicationStatus],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ data: { application_ID: this.lastID } });
    }
  );
});

// Update application
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { tenant_ID, property_ID, ApplicationDate, ApplicationStatus } = req.body;
  db.run(
    'UPDATE Application SET tenant_ID = ?, property_ID = ?, ApplicationDate = ?, ApplicationStatus = ? WHERE application_ID = ?',
    [tenant_ID, property_ID, ApplicationDate, ApplicationStatus, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: `Application updated successfully`, changes: this.changes });
    }
  );
});

// Delete application
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM Application WHERE application_ID = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Deleted application with ID: ${id}`, changes: this.changes });
  });
});

module.exports = router;
