const Blog = require('../models/blog');
const User = require('../models/user');

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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Cool kids',
    author: 'Willow',
    url: 'https://example.com',
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
