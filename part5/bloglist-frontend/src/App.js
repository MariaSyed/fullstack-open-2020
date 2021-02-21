import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      setUser(loggedUser);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <LoginForm onLogin={handleLogin} />
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name || user.username}
      {' '}
      logged in
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
