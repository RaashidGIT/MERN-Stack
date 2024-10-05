//Import required packages

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

//use cookie parser to parse cookies
app.use(cookieParser());

//Route to set a cookie
app.get('/setcookie', (req, res) => {
    res.cookie('username', 'german');
    res.send('Cookie has been set!');
});
//Route to read a cookie
app.get('/getcookie', (req, res) => {
    let username = req.cookies['username'];
    if(username){
        res.send(`Cookie retrieved: ${username}`);
    }
    else{
        res.send('No cookies found');
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});
