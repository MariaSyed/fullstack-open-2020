const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
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
    {
      ...generateBlog(),
      likes: 5,
    },
    {
      ...generateBlog(),
      likes: 10,
    },
    {
      ...generateBlog(),
      likes: 3,
    },
    {
      ...generateBlog(),
      likes: 2,
    },
  ];

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
    expect(result).toBe(20);
  });
});
