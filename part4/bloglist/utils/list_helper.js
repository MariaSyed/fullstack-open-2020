const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) =>
  blogs.reduce((result, blog) => result + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce(
    (result, blog) => (result && result.likes > blog.likes ? result : blog),
    {}
  );

const mostBlogs = (blogs) => {
  if (!blogs.length) return {};

  const authorsByBlogsCount = _.countBy(blogs, 'author');
  const authorWithMostBlogs = _.maxBy(
    _.keys(authorsByBlogsCount),
    (o) => authorsByBlogsCount[o]
  );

  return {
    author: authorWithMostBlogs,
    blogs: authorsByBlogsCount[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return {};

  const authorsByTotalLikes = _(blogs)
    .groupBy('author')
    .map((obj, author) => ({ author, likes: _.sumBy(obj, 'likes') }))
    .value();

  return _.maxBy(authorsByTotalLikes, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
