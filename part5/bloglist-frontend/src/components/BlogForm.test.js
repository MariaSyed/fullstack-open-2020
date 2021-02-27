// @ts-nocheck
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  let createBlogMock
  let component

  beforeEach(() => {
    createBlogMock = jest.fn()
    component = render(<BlogForm createBlog={createBlogMock} />)
  })

  test('creates blog with correct params', () => {
    const newBlog = {
      title: 'new blog title',
      author: 'author 123',
      url: 'example123.com'
    }

    const title = component.getByTestId('title-input')
    const author = component.getByTestId('author-input')
    const url = component.getByTestId('url-input')

    fireEvent.change(title, { target: { value: newBlog.title } })
    fireEvent.change(author, { target: { value: newBlog.author } })
    fireEvent.change(url, { target: { value: newBlog.url } })

    fireEvent.click(component.getByText('create'))

    expect(createBlogMock).toBeCalledWith(newBlog)
  })
})

