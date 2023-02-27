// VARIABLES AND MODULES
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();
const port = 3000;
const postControllers = require('./controllers/postControllers');
const pageControllers = require('./controllers/pageControllers');

// MONGOOSE CONNECT
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/cleanblog-test-db');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// ROUTES: STANDART
  // POST CONTROLLERS
app.get('/', postControllers.getAllPosts);
app.get('/posts/:id', postControllers.getPost);
app.post('/posts', postControllers.createPost);
app.put('/posts/:id', postControllers.updatePost);
app.delete('/posts/:id', postControllers.deletePost);

  // PAGE CONTROLLERS
app.get('/about', pageControllers.getAboutPage);
app.get('/add_post', pageControllers.getAddPostPage);
app.get('/post', pageControllers.getPostPage);
app.get('/posts/edit/:id', pageControllers.getEditPostPage);

// LISTENERS
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
