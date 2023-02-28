const Post = require('../models/Post');
const fs = require('fs');

exports.getAllPosts = async (req, res) => {
  const page = req.query.page || 1;
  const postPerPage = 3;
  const totalPosts = await Post.find({}).countDocuments();

  const posts = await Post.find({})
    .sort('-dateCreated')
    .limit(page * postPerPage);

  res.render('index', {
    posts: posts,
    current: parseInt(page),
    pages: Math.ceil(totalPosts / postPerPage),
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
