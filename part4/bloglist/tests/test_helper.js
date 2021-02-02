const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

// Blogs

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'James',
    url: 'https://example.com',
    likes: 5,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Logan',
    url: 'https://example.com',
    likes: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const initializeBlogs = async () => {
  const savedUsers = await usersInDb();
  const { id } = savedUsers[0];

  const newBlogs = initialBlogs.map((blog) => new Blog({ ...blog, user: id }));
  const blogsPromises = newBlogs.map((blog) => blog.save());
  await Promise.all(blogsPromises);
};

// Users

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const initializeUser = async () => {
  const passwordHash = await bcrypt.hash('password', 10);
  const testUser = { username: 'root', name: 'Root', passwordHash };
  const newUser = new User(testUser);
  await newUser.save();
};

const getValidUserToken = async () => {
  const savedUsers = await usersInDb();
  const { username, id } = savedUsers[0];

  return jwt.sign({ username, id }, config.SECRET);
};

module.exports = {
  blogsInDb,
  usersInDb,
  initializeBlogs,
  initializeUser,
  getValidUserToken,
};
