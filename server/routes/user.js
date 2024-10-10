const express = require('express');
const passport = require('./../auth');
const path = require('path');

const router = express.Router();

// Middleware used to check if authenticated.
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('isAuthenticated: failed');
    res.redirect('/user/login');
};

// Sanitize the user data before sending it in the response
const sanitizeUser = (user) => {
    return {
        username: user.name || 'Unknown', // Handle missing username
        githubId: user.githubId,
        email: user.email || 'No email provided',
        repositories: user.repositories || [],
    };
};

// Route to get authenticated user's data including username
router.get('/', isAuthenticated, (req, res) => {
    const sanitizedUser = sanitizeUser(req.user); // Sanitize user data
    res.json({
        message: 'User authenticated',
        ...sanitizedUser, // Send sanitized user data
    });
});

// GitHub authentication route
router.get('/auth', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
    console.log('auth: success');
    
    res.redirect('/');
});

// GitHub callback after authentication
router.get('/auth/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    console.log('auth/callback: success');
    res.redirect('/');
});

// Login route
router.get('/login', (req, res) => {
    res.redirect(path.join(__dirname, '../../public/loginErr.html'));
    console.log('login: success');
});

// Logout route
router.post('/logout', (req, res, next) => {
    console.log('logout: success');
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
