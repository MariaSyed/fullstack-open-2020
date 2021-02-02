const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const mockDb = require('./mockDb');

const api = supertest(app);

describe('Blog api', () => {
  let token;

  beforeAll(async () => {
    await mockDb.clearCollection('users');
    await helper.initializeUser();

    token = await helper.getValidUserToken();
  });

  beforeEach(async () => {
    await mockDb.clearCollection('blogs');

    await helper.initializeBlogs();
  });

  describe('Fetching blogs', () => {
    test('returns blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('returns all blogs with unique identifier id', async () => {
      const response = await api.get('/api/blogs');
      for (let blog of response.body) {
        expect(blog._id).toBeDefined();
      }
    });
  });

  describe('Creating blogs', () => {
    test('creates a new blog with correct body', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'Author',
        url: 'https://example.com',
        likes: 0,
      };

      const blogsAtStart = await helper.blogsInDb();

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog);

      const response = await api.get('/api/blogs');

      expect(response.body).toHaveLength(blogsAtStart.length + 1);
      expect(response.body[blogsAtStart.length]).toMatchObject(newBlog);
    });

    test('creates blog with zero default likes', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'Author',
        url: 'https://example.com',
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog);

      const savedBlog = response.body;

      expect(savedBlog).toMatchObject(newBlog);
      expect(savedBlog.likes).toBe(0);
    });

    test('throws 400 error response with missing url and title', async () => {
      const newBlog = {
        author: 'Author',
        likes: 10,
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog);
      expect(response.status).toBe(400);
    });

    test('throws 401 error with missing auth token ', async () => {
      const newBlog = {
        title: 'Title',
        author: 'Author',
        likes: 10,
      };

      const response = await api.post('/api/blogs').send(newBlog);
      expect(response.status).toBe(401);
    });
  });

  describe('Deleting blogs', () => {
    test('deletes blog with valid id provided', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
      expect(blogsAtEnd).not.toContainEqual(blogToDelete);
    });

    test('throws error with invalid id provided', async () => {
      const blogsAtStart = await helper.blogsInDb();

      await api
        .delete(`/api/blogs/invalid-blog-id`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(blogsAtStart.length);
    });
  });

  describe('Updating blogs', () => {
    test('updates blog with valid id provided', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const blogUpdate = { author: 'Updated Author' };

      await api
        .patch(`/api/blogs/${blogToUpdate._id}`)
        .send(blogUpdate)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toContainEqual({ ...blogToUpdate, ...blogUpdate });
    });

    test('throws error with invalid id provided', async () => {
      const blogsAtStart = await helper.blogsInDb();

      await api.patch(`/api/blogs/invalid-blog-id`).expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toEqual(blogsAtStart);
    });
  });

  afterAll(async () => {
    await mockDb.closeDatabase();
  });
});
