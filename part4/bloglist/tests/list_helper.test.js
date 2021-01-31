const listHelper = require('../utils/list_helper');

const generateBlog = () => ({
  _id: Math.random().toString(36).substr(2, 9),
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url:
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0,
});

const listWithOneBlog = [generateBlog()];

const listWithManyBlogs = [
  { ...generateBlog(), author: 'A', likes: 5 },
  { ...generateBlog(), author: 'Most likes', likes: 10 },
  { ...generateBlog(), author: 'Most likes', likes: 5 },
  { ...generateBlog(), author: 'Most blogs', likes: 3 },
  { ...generateBlog(), author: 'Most blogs', likes: 2 },
  { ...generateBlog(), author: 'Most blogs', likes: 5 },
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(30);
  });
});

describe('favourite blog', () => {
  test('of empty list is empty obj', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0]);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toBe(listWithManyBlogs[1]);
  });
});

describe('most blogs', () => {
  test('of empty list is empty obj', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });

  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    });
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({
      author: 'Most blogs',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  test('of empty list is empty obj', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual({});
  });

  test('when list has only one blog, equals that author with likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: 'Most likes',
      likes: 15,
    });
  });
});
