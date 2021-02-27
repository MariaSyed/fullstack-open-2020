import React, { useState } from 'react';

const Blog = ({ blog, onLike }) => {
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => onLike(blog);

  const expandedEl = (
    <div>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>{blog.user?.username}</p>
    </div>
  )

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div style={{ margin: 10, border: '1px solid', padding: 10 }}>
       <div>
         {blog.title + ' ' + blog.author + ' '}
         <button onClick={toggleExpanded}>{expanded ? 'hide' : 'view'}</button>
       </div>
       { expanded && expandedEl}
    </div>
  )
}

export default Blog;
