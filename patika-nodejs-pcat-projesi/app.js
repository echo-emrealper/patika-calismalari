const express = require('express');

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

//MIDDLEWARES
app.use(express.static('public'));
/* app.use(myLogger);
app.use(myLogger2); */

app.get('/', (req, res) => {
    /*     const photo = {
        id: 1,
        name: 'Photo Name',
        description: 'Photo description',
    };
    res.status(200).send(photo); */
    res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
