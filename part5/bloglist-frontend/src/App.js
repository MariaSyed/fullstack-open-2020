import React, { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const localStorage = {
  setLoggedUser: (user) => window.localStorage.setItem('loggedUser', JSON.stringify(user)),
  removeLoggedUser: () => window.localStorage.removeItem('loggedUser'),
  getLoggedUser: () => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    return loggedUser && JSON.parse(loggedUser);
  },
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const refreshBlogs = async () => {
    const b = await blogService.getAll();
    setBlogs(b);
  };

  useEffect(() => {
    refreshBlogs();

    const loggedUser = localStorage.getLoggedUser();
    if (loggedUser) setUser(loggedUser);
  }, []);

  useEffect(() => {
    if (user) blogService.setToken(user.token);
  }, [user])

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials);
      localStorage.setLoggedUser(loggedUser);
      setUser(loggedUser);
      showSuccessMessage('Logged in!');
    } catch (err) {
      showErrorMessage('Wrong username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeLoggedUser();
    setUser(null);
  };

  const handleAddBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      refreshBlogs();

      showSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`);
    } catch (err) {
      showErrorMessage('Failed to create blog');
    }
  };

  return (
    <div>
      <Notification variant="success" message={successMessage} />
      <Notification variant="error" message={errorMessage} />

      {
        user ? (
          <>
            <h2>blogs</h2>
            <p>
              {user.name || user.username}
              {' '}
              logged in
            </p>
            <button type="submit" onClick={handleLogout}>logout</button>
            {' '}

            <Togglable buttonLabel="new blog">
              <BlogForm createBlog={handleAddBlog} />
            </Togglable>

            {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
          </>
        ) : (
          <>
            <h2>log in to application</h2>
            <LoginForm onLogin={handleLogin} />
          </>
        )
      }
    </div>
  );
};

export default App;
