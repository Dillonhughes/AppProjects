# Flight Maintenance Tracker

This project provides a working Flight Maintenance Tracker application. It uses a Node.js/Express backend with MySQL and a React frontend built with Vite.

## Setup

1. Install dependencies for both frontend and backend.
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
   *Note:* if you encounter a `403 Forbidden` error during `npm install`, make
   sure your environment has access to the npm registry or set the registry
   explicitly:
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```
   This repository includes an `.npmrc` file in each project that points to the
   public npm registry.
2. Create a MySQL database and import `backend/schema.sql`.
3. Configure the database settings in `backend/.env`.
4. Start the backend server:
   ```bash
   npm start
   ```
5. Start the frontend dev server:
   ```bash
   npm run dev
   ```

The backend exposes CRUD endpoints for aircraft, parts, work orders and labor logs, along with reporting routes. The frontend allows you to manage aircraft, parts and work orders from a web UI.

### MySQL via Docker

If you don't have MySQL installed locally you can start one with Docker:

```bash
docker run --name flight-mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=flight_tracker -p 3306:3306 -d mysql:8
```

Then update `backend/.env` with `DB_PASSWORD=secret`.
