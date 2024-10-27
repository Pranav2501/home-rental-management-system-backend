# Home Rental Management System Backend

This is the backend server for the Home Rental Management System, built with Node.js, Express, and SQLite.

## Features

- RESTful API endpoints for managing properties, property owners, applications, maintenance requests, and tenants
- SQLite database for data persistence
- CORS enabled for frontend integration
- Express.js for efficient routing and middleware support

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Project Structure

```
home-rental-management-system-backend/
│
├── db/
│   └── RentalDB.db
│
├── routes/
│   ├── application.js
│   ├── maintenanceRequest.js
│   ├── property.js
│   ├── propertyOwner.js
│   └── tenant.js
│
├── server.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Pranav2501/home-rental-management-system-backend.git
   cd home-rental-management-system-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Server

Start the server with:

```
npm start
```

The server will run on `http://localhost:4000` by default.

## API Endpoints

### Properties

- GET /api/property - Get all properties
- GET /api/property/:id - Get a specific property
- POST /api/property - Create a new property
- PUT /api/property/:id - Update a property
- DELETE /api/property/:id - Delete a property

### Property Owners

- GET /api/propertyOwner - Get all property owners
- GET /api/propertyOwner/:id - Get a specific property owner
- POST /api/propertyOwner - Create a new property owner
- PUT /api/propertyOwner/:id - Update a property owner
- DELETE /api/propertyOwner/:id - Delete a property owner

### Applications

- GET /api/application - Get all applications
- GET /api/application/:id - Get a specific application
- POST /api/application - Create a new application
- PUT /api/application/:id - Update an application
- DELETE /api/application/:id - Delete an application

### Maintenance Requests

- GET /api/maintenanceRequest - Get all maintenance requests
- GET /api/maintenanceRequest/:id - Get a specific maintenance request
- POST /api/maintenanceRequest - Create a new maintenance request
- PUT /api/maintenanceRequest/:id - Update a maintenance request
- DELETE /api/maintenanceRequest/:id - Delete a maintenance request

### Tenants

- GET /api/tenant - Get all tenants
- GET /api/tenant/:id - Get a specific tenant
- POST /api/tenant - Create a new tenant
- PUT /api/tenant/:id - Update a tenant
- DELETE /api/tenant/:id - Delete a tenant

## Database

The application uses SQLite as its database, stored in `./db/RentalDB.db`. The database file is included in the repository.

### Database Schema

The database includes the following tables:

1. Property
2. PropertyOwner
3. Application
4. MaintenanceRequest
5. Tenant
6. LeaseAgreement
7. Payment
8. TenantReferral


For more detailed information on the database structure and queries, please refer to the [database README](https://github.com/Pranav2501/databases-RentalDB).

## Error Handling

All routes include basic error handling. If an error occurs, the API will respond with a 400 status code and an error message in JSON format.

## CORS

Cross-Origin Resource Sharing (CORS) is enabled for all routes, allowing the frontend application to make requests to this API.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License 

