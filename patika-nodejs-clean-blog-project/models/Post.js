// LOAD MODULES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const PostSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// CREATE MODEL
const Post = mongoose.model('Post', PostSchema);

// EXPORT
module.exports = Post;
