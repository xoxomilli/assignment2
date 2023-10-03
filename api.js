const express = require('express');
const app = express();

// Create a file system to store inventory data
const fs = require('fs');
const itemsFile = './items.json';

// Define the inventory item data structure
const Item = {
  id: Number,
  name: String,
  price: Number,
  size: String,
};

// Get all inventory items
app.get('/items', async (req, res) => {
  // Read the inventory data from the file system
  const items = await fs.promises.readFile(itemsFile, 'utf8');

  // Parse the inventory data into an array of Item objects
  const itemObjects = JSON.parse(items);

  // Return the inventory items
  res.json(itemObjects);
});

// Get a single inventory item
app.get('/items/:id', async (req, res) => {
  // Get the item ID from the request
  const id = req.params.id;

  // Read the inventory data from the file system
  const items = await fs.promises.readFile(itemsFile, 'utf8');

  // Parse the inventory data into an array of Item objects
  const itemObjects = JSON.parse(items);

  // Find the item with the matching ID
  const item = itemObjects.find((item) => item.id === id);

  // Return the item, or a 404 error if the item is not found
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Create a new inventory item
app.post('/items', async (req, res) => {
  // Validate the request body
  const { name, price, size } = req.body;

  // Create a new Item object
  const item = new Item({
    name,
    price,
    size,
  });

  // Add the item to the inventory data
  const items = await fs.promises.readFile(itemsFile, 'utf8');
  const itemObjects = JSON.parse(items);
  itemObjects.push(item);

  // Write the updated inventory data to the file system
  await fs.promises.writeFile(itemsFile, JSON.stringify(itemObjects), 'utf8');

  // Return the newly created item
  res.json(item);
});

  const id = req.params.id;

  // Get the updated item data from the request body
  const { name, price, size } = req.body;

  // Read the inventory data from the file system
  const items = await fs.promises.readFile(itemsFile, 'utf8');

  // Parse the inventory data into an array of Item objects
  const itemObjects = JSON.parse(items);

  // Find the item with the matching ID
  const item = itemObjects.find((item) => item.id === id);

  // Update the item data
  item.name = name;
  item.price = price;
  item.size = size;

  // Write the updated inventory data to the file system
  await fs.promises.writeFile(itemsFile, JSON.stringify(itemObjects), 'utf8');

  // Return the updated item
  res.json(item);