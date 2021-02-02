const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const mockDb = require('./mockDb');

const api = supertest(app);

describe('User api', () => {
  beforeEach(async () => {
    await mockDb.clearDatabase();

    await helper.initializeUser();
  });

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    const usersAtStart = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();
    const existingUser = usersAtStart[0];

    const newUser = {
      username: existingUser.username,
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');
    expect(result.status).toBe(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username missing', async () => {
    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    };

    const usersAtStart = await helper.usersInDb();

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Path `username` is required');
    expect(result.status).toBe(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password missing', async () => {
    const newUser = {
      username: 'mariasy',
      name: 'Superuser',
    };

    const usersAtStart = await helper.usersInDb();

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Path `password` is required');
    expect(result.status).toBe(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password is shorter than 3 char', async () => {
    const newUser = {
      username: 'mariasy',
      name: 'Superuser',
      password: 'ab',
    };

    const usersAtStart = await helper.usersInDb();

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'Password must be at least 3 characters long'
    );
    expect(result.status).toBe(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  afterAll(async () => {
    await mockDb.closeDatabase();
  });
});
