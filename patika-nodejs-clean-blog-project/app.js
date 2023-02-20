const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  const blog = {
    id: 1,
    title: 'Blog title',
    description: 'Blog description',
  };
  res.status(200).send(blog);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
