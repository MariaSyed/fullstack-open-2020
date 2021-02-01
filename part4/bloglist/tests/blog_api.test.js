const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const { initialBlogs } = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned with unique identifier id', async () => {
  const response = await api.get('/api/blogs');
  for (let blog of response.body) {
    expect(blog._id).toBeDefined();
  }
});

test('POST request successfully creates a new blog', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Author',
    url: 'https://example.com',
    likes: 0,
  };

  await api.post('/api/blogs').send(newBlog);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(3);
  expect(response.body[2]).toMatchObject(newBlog);
});

test('Missing likes property defaults to zero', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Author',
    url: 'https://example.com',
  };

  await api.post('/api/blogs').send(newBlog);

  const response = await api.get('/api/blogs');

  expect(response.body[2]).toMatchObject(newBlog);
  expect(response.body[2].likes).toBe(0);
});

test('Missing author and title results in 400 error response', async () => {
  const newBlog = {
    author: 'Author',
    likes: 10,
  };

  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.status).toBe(400);
});

afterAll(() => {
  mongoose.connection.close();
});
