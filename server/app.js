// app.js
require('./../config/config');
const express = require('express');
const session = require('express-session');
require('./db/mongoose');
const usernameRoutes  = require('./routes/api/username');
const userRoutes  = require('./routes/user');
const  passport  = require('./auth');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

// Session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Cors middleware
app.use(cors());

// Body parser middleware
app.use(express.json());

// Static files
app.use(express.static(`${__dirname}/../public`));

// Routes
app.use('/user', userRoutes);
app.use('/api/username', usernameRoutes);

// Start server
app.listen(port, () => {
    console.log(`Starting server on port ${port}.`);
});

module.exports.app = app;
