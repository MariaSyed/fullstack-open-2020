const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
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
  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  };

  const usersAtStart = await helper.usersInDb();

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
    username: 'root',
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
    username: 'root',
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

afterAll(() => {
  mongoose.connection.close();
});
