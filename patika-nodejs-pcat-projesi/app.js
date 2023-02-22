const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 3000;
const Photo = require('./models/Photo.js');

/* const myLogger = (req, res, next) => {
    console.log('middleware 1');
    next();
};

const myLogger2 = (req, res, next) => {
    console.log('middleware 2');
    next();
}; */

// MONGOOSE CONNECT
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* app.use(myLogger);
app.use(myLogger2); */

// ROUTES
app.get('/', async (req, res) => {
    /* const photo = {
        id: 1,
        name: 'Photo Name',
        description: 'Photo description',
    };
    res.status(200).send(photo); */
    // res.sendFile(path.resolve(__dirname, 'temp/index.html'));

    const photos = await Photo.find({});
    res.render('index', {
        photos
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.get('/video-page', (req, res) => {
    res.render('video-page');
});

app.post('/photos', async (req, res) => {
    await Photo.create(req.body);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
