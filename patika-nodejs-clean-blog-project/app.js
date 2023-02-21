const express = require('express');

const ejs = require('ejs');

const app = express();

const port = 3000;

// MIDDLEWARES
app.use(express.static('public'));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// ROUTES
app.get('*', (req, res) => {
  switch (req.url) {
    case '/':
      res.render('index');
      break;
    case '/about':
      res.render('about');
      break;
    case '/add_post':
      res.render('add_post');
      break;
    case '/post':
      res.render('post');
      break;
    default:
      res.send('404: Page Not Found', 404);
      break;
  }
});

/* // ROUTES: STANDART
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/about', (req, res) => {
    res.render('about');
  });

  app.get('/add_post', (req, res) => {
    res.render('add_post');
  });

  app.get('/post', (req, res) => {
    res.render('post');
  }); 
 */

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
