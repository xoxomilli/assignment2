const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Define a middleware function to check the user's role
const checkRole = (req, res, next) => {
    // Get the user object from the request headers
    const user = req.headers["user"];

    // Check if the user is a normal user
    if (user && user.is_admin === false) {
        return next();
    }

    // Raise an exception if the user is not a normal user
    next(new Error("Only normal users can access this endpoint"));
};

// Add the middleware function to the application
app.use(checkRole);