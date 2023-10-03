const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Define a function to create a new inventory item
const createInventoryItem = async (req, res) => {
    // Get the inventory item data from the request body
    const item = req.body;

    // Create a new inventory item object
    const newItem = {
        name: item.name,
        quantity: item.quantity
    };

    // Save the inventory item object to the JSON file
    await app.post("/api/inventory", newItem);

    // Return the inventory item object
    return res.status(201).json(newItem);
};

// Create a route for the create inventory item endpoint
app.route("/api/inventory", methods=["POST"])(createInventoryItem);