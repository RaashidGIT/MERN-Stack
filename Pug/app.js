const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Set 'views' directory for any views being rendered
app.set('views', path.join(__dirname, 'views'));
// app.set('public', path.join(__dirname, 'public'));
app.use(express.static('public'));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req,res) => {
    res.render('form', { title: 'Submit Form'});
});

// Define a route to render the template
app.get('/', (req, res) => {
    items = ['item 1', 'item 2', 'item 3'];
    res.render('index',{title: 'Express & Pug tutorial', message: 'Welcome to Pug Template engine!', items});
});
app.get('/layout', (req, res) => {
    items = ['Kazuya Mishima', 'Heihachi Mishima', 'Jun Kazama', 'Asuka Kazama'];
    res.render('layout_ex',{title: 'Tekken!', message: 'Welcome to the King of Iron First Tournament', items});
});
app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/result', (req, res) => {
    const { name, email, place, phone } = req.body;
    res.render('result', {title: 'Form Submitted', name, email, place, phone });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});