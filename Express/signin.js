const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key', // Use a secure secret key
    resave: false,
    saveUninitialized: true,
}));

// Serve the sign-in HTML page
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if the provided credentials are valid
    if (username === 'admin' && password === 'admin') {
        req.session.isLoggedIn = true;
        res.cookie('role', 'admin'); // Set cookie role properly
        res.redirect('/dashboard');
    } else {
        res.send("Invalid credentials. Please try again.");
    }
});

// Handle logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('role');
            res.send('You are now logged out!');
        }
    });
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.cookies.role === 'admin') {
            res.send('Hi, Admin! Welcome to the dashboard!');
        } else {
            res.send('Welcome to the dashboard!');
        }
    } else {
        res.send('Access denied! Please sign in first!');
    }
});

// Set cookie route
app.get('/setcookie', (req, res) => {
    res.cookie('role', 'admin', { maxAge: 90000000, httpOnly: true });
    res.send('Cookie has been set');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
