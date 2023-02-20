const express = require('express');

const ejs = require('ejs');

const path = require('path');

const app = express();

const port = 3000;

/* const myLogger = (req, res, next) => {
    console.log('middleware 1');
    next();
};

const myLogger2 = (req, res, next) => {
    console.log('middleware 2');
    next();
}; */

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
/* app.use(myLogger);
app.use(myLogger2); */

//ROUTES
app.get('/', (req, res) => {
    /* const photo = {
        id: 1,
        name: 'Photo Name',
        description: 'Photo description',
    };
    res.status(200).send(photo); */
    // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('index');
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
