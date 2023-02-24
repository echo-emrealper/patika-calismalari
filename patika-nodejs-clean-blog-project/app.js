const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const port = 3000;
const Post = require('./models/Post');

// MONGOOSECONNECT
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/cleanblog-test-db');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// ROUTES
/* app.get('*', (req, res) => {
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
}); */

// ROUTES: STANDART
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
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

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
