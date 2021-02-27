import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'A blog title!',
  author: 'Jake Goodfellow',
  url: 'example.com',
  likes: 10,
  user: {
    username: 'jack_good',
    id: '1'
  }
}

describe('Blog', () => {
  let onLikeMock
  let onRemoveMock
  let component

  beforeEach(  () => {
    onLikeMock = jest.fn()
    onRemoveMock = jest.fn()

    component = render(
      <Blog blog={blog} onLike={onLikeMock} onRemove={onRemoveMock} />
    )
  })

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('does not render url or likes', () => {
    expect(component.queryByText(blog.url)).toBeFalsy()
    expect(component.queryByText(`likes: ${blog.likes}`)).toBeFalsy()
  })

  describe('on click view button', () => {
    beforeEach(() => {
      fireEvent.click(component.getByText('view'))
    })

    test('renders url or likes', () => {
      expect(component.queryByText(blog.url)).toBeTruthy()
      expect(component.queryByText(`likes: ${blog.likes}`)).toBeTruthy()
    })

    describe('on click like button twice', () => {
      beforeEach(() => {
        fireEvent.click(component.getByText('like'))
        fireEvent.click(component.getByText('like'))
      })

      test('calls onLike handler twice', () => {
        expect(onLikeMock).toBeCalledTimes(2)
      })
    })
  })
})