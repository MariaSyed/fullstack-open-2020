const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.find({})[0];

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return response.status(201).json(savedBlog);
  } catch (error) {
    return response.status(400).json({ error: error.toString() });
  }
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
