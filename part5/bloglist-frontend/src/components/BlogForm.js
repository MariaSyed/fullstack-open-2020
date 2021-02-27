import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onChangeTitle = ({ target: { value } }) => setTitle(value);
  const onChangeAuthor = ({ target: { value } }) => setAuthor(value);
  const onChangeUrl = ({ target: { value } }) => setUrl(value);

  const onSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={onSubmit}>
        <div>
          title:
          <input value={title} onChange={onChangeTitle} />
        </div>
        <div>
          author:
          <input value={author} onChange={onChangeAuthor} />
        </div>
        <div>
          url:
          <input value={url} onChange={onChangeUrl} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
