const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Define a function to create a user
const createUser = async (req, res) => {
    // Get the user data from the request body
    const user = req.body;

    // Check if the username already exists
    const existingUser = await app.get(`/api/users/${user.username}`);
    if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
    }

    // Create a new user object
    const newUser = {
        username: user.username,
        password: user.password,
        is_admin: user.is_admin
    };

    // Save the user object to the JSON file
    await app.post(`/api/users`, newUser);

    // Return the user object
    return res.status(201).json(newUser);
};

// Create a route for the create user endpoint
app.route("/api/users", methods=["POST"])(createUser);