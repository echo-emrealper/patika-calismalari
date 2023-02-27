//MODULES & VARIABLES
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();
const port = 3000;
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

// MONGOOSE CONNECT
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

// ROUTES
// PHOTO CONTROLLERS
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

// PAGE CONTROLLERS
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/video-page', pageController.getVideoPage);
app.get('/photos/edit/:id', pageController.getEditPage);

// LISTEN
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
