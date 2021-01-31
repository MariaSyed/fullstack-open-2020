const dummy = () => 1;

const totalLikes = (blogs) =>
  blogs.reduce((result, blog) => result + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce(
    (favorite, blog) =>
      favorite && favorite.likes > blog.likes ? favorite : blog,
    undefined
  );

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
