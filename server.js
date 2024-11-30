const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request made to: ${req.url}`);
  next();
});

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Sample visitor count (could be improved with a database for persistence)
let visitorCount = 42; // This can be dynamically updated based on visits

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get visitor count (future enhancement: store this data persistently)
app.get('/api/visitorCount', (req, res) => {
  res.json({ visitorCount: visitorCount });
});

// Health check route (for uptime monitoring services)
app.get('/health', (req, res) => {
  res.status(200).send('Server is up and running');
});

// Handle other routes that don't exist (404)
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
