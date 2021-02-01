const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

db.connect();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
