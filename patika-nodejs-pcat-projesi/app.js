const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
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
app.use(fileUpload());
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

    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos,
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

app.get('/photos/:id', async (req, res) => {
    //console.log(req.params.id);
    //res.render('photo');
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
    });
});

app.post('/photos', async (req, res) => {
    // console.log(req.files.image);
    // await Photo.create(req.body);
    // res.redirect('/');
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
    
    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
