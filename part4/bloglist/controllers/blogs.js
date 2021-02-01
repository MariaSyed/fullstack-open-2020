const express = require('express');
const Blog = require('../models/blog');

const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  let result;
  try {
    const blog = new Blog(request.body);
    result = await blog.save();
  } catch (error) {
    return response.status(400).json({ error: error.toString() });
  }

  return response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const result = await Blog.deleteOne({ _id: request.params.id });
    if (result.deletedCount === 0) throw new Error('Invalid id');
  } catch (error) {
    return response.status(400).json({ error: error.toString() });
  }

  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;
