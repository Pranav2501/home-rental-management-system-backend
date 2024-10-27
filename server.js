const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import route modules
const propertyRoutes = require('./routes/property');
const propertyOwnerRoutes = require('./routes/propertyOwner');
const applicationRoutes = require('./routes/application');
const maintenanceRequestRoutes = require('./routes/maintenanceRequest');
const tenantRoutes = require('./routes/tenant'); 

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/property', propertyRoutes);
app.use('/api/propertyOwner', propertyOwnerRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/maintenanceRequest', maintenanceRequestRoutes);
app.use('/api/tenant', tenantRoutes); // Register tenant routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
