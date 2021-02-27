import React, { useState } from 'react'
import { object, func, bool } from 'prop-types'

const containerStyles = { margin: 10, border: '1px solid', padding: 10 }

const Blog = ({ blog, onLike, onRemove, isOwnBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const handleLike = () => onLike(blog)

  const handleRemove = () => {
    const confirmed = window.confirm(`Are you sure you want to remove blog: ${blog.title} by ${blog.author}`)
    if (confirmed) onRemove(blog)
  }

  const { url, user = {}, likes } = blog

  const expandedEl = (
    <div>
      <p>{url}</p>
      <p>likes: {likes} <button onClick={handleLike}>like</button></p>
      <p>{user.username}</p>
      { isOwnBlog && <button onClick={handleRemove}>remove</button> }
    </div>
  )

  const toggleExpanded = () => setExpanded(!expanded)

  return (
    <div className="blog" style={containerStyles}>
      {blog.title + ' ' + blog.author + ' '}

      <button onClick={toggleExpanded}>{expanded ? 'hide' : 'view'}</button>

      { expanded && expandedEl}
    </div>
  )
}

Blog.propTypes = {
  blog: object.isRequired,
  onLike: func.isRequired,
  onRemove: func.isRequired,
  isOwnBlog: bool
}

Blog.defaulProps = {
  isOwnBlog: false
}

export default Blog
