import React, { useState } from 'react'
import { func } from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onChangeTitle = ({ target: { value } }) => setTitle(value)
  const onChangeAuthor = ({ target: { value } }) => setAuthor(value)
  const onChangeUrl = ({ target: { value } }) => setUrl(value)

  const onSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={onSubmit}>
        <div>
          title:
          <input id="title" value={title} onChange={onChangeTitle} />
        </div>
        <div>
          author:
          <input id="author" value={author} onChange={onChangeAuthor} />
        </div>
        <div>
          url:
          <input id="url" value={url} onChange={onChangeUrl} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: func.isRequired,
}

export default BlogForm
