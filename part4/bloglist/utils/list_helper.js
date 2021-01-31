const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) =>
  blogs.reduce((result, blog) => result + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce(
    (result, blog) => (result && result.likes > blog.likes ? result : blog),
    undefined
  );

const mostBlogs = (blogs) => {
  if (!blogs.length) return undefined;

  const authorsByBlogsCount = _.countBy(blogs, 'author');
  const authorWithMostBlogs = _.max(
    Object.keys(authorsByBlogsCount, (author) => authorsByBlogsCount[author])
  );

  return {
    author: authorWithMostBlogs,
    blogs: authorsByBlogsCount[authorWithMostBlogs],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
