const express = require('express');
const Blog = require('../models/blog');

const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  let result;
  try {
    const blog = new Blog(request.body);
    result = await blog.save();
  } catch (error) {
    return response.status(400).json({ error: error.toString() });
  }

  return response.status(201).json(result);
});

module.exports = blogsRouter;
