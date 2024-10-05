const express = require('express');
const path = require('path'); // Moved this line up for clarity
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.urlencoded());
const fs = require('fs');

// app.get('/news', (req, res) => {
//     res.sendFile(path.join(__dirname, 'news.html'));
// });
// app.post('/news', (req, res) => {
//     res.sendFile(path.join(__dirname, 'news.html'));
// });
// app.put('/news', (req, res) => {
//     res.sendFile(path.join(__dirname, 'news.html'));
// });
// app.delete('/news', (req, res) => {
//     res.sendFile(path.join(__dirname, 'news.html'));
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, 'news.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Download the image
app.get('/image', (req, res) => {
    res.download(path.join(__dirname, 'public/images/download.jpg'));
});

// Download the PDF
app.get('/document', (req, res) => {
    res.download(path.join(__dirname, 'public/documents/download1.pdf'));
});

app.post('/submit', (req, res) => {
    formData = req.body;
    console.log('formdata');

    Name1 = formData.name1;
    Name2 = formData.name2;
    gender = formData.gender;
    email = formData.email;
    phno = formData.phone;
    address = formData.address;
    quality = formData.qualification;
    
    console.log(`Name: ${Name1} ${Name2}`);
    console.log(`Gender: ${gender}`);
    console.log(`Qualification: ${quality}`);
    console.log(`Email: ${email}`);
    console.log(`Phone No.: ${phno}`);
    console.log(`Address: ${address}`);
})

// app.post('/message', (req, res) => {
//     messageData = req.body;
//     Name = messageData.name;
//     Email = messageData.email;
//     Message = messageData.message;

//     fs.writeFileSync('message.txt', `${Name}`);
//     fs.appendFileSync('message.txt', `${Email}`);
//     fs.appendFileSync('message.txt', `${Message}`);

//     res.send('Form submitted successfully!');

// })

app.post('/message', (req, res) => {
    messageData = req.body;
    Name = messageData.name;
    Email = messageData.email;
    Message = messageData.message;

    fs.appendFile('formdata.txt', '', (err) => {
        if(err){
            console.error(err);
            res.status(500).send('Error writing to file');
        }
        else{
            Object.keys(messageData).forEach((key) => {
                const data = `${key} : ${messageData[key]}\n`;
                fs.appendFile('formdata.txt', data, (err) => {
                    if(err){
                        console.error(err);
                    }
                });
            });
            res.send('Form submitted successfully!');
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
