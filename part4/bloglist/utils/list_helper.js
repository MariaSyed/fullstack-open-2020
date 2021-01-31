const dummy = () => 1;

const totalLikes = (blogs) =>
  blogs.reduce((result, blog) => result + blog.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
