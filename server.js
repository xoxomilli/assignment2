
const express = require('express');
const app = express();

// Serve the index.html file
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve a 404 page for any other HTML file
app.get('/:random.html', (req, res) => {
  res.status(404).send('File not found');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
const express = require("express");


// Start the Express.js server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});