# Flight Maintenance Tracker

This project is a simple starter template for a Flight Maintenance Tracker app.
It includes a Node.js/Express backend with MySQL and a React frontend built with Vite.

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
2. Configure the database settings in `backend/.env`.
3. Start the backend server:
   ```bash
   npm start
   ```
4. Start the frontend dev server:
   ```bash
   npm run dev
   ```

This basic version exposes a few REST endpoints and displays a list of aircraft on the homepage.
