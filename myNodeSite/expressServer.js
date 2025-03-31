/**
 * expressServer.js
 *
 * A simple Express server that serves your existing static site.
 */

const express = require('express');
const path = require('path');

const app = express();
const port = 1337;

// Path to your 'public' folder
const publicDir = path.join(__dirname, 'public');

// Serve all static files (CSS, images, JS, etc.)
app.use(express.static(publicDir));

// Define routes for each page
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(publicDir, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(publicDir, 'contact.html'));
});

app.get('/roster', (req, res) => {
  res.sendFile(path.join(publicDir, 'roster.html'));
});

app.get('/recruitment', (req, res) => {
  res.sendFile(path.join(publicDir, 'recruitment.html'));
});

app.get('/schedule', (req, res) => {
  res.sendFile(path.join(publicDir, 'schedule.html'));
});

// Wildcard route for 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
