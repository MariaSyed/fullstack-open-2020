const loginUser = ({ username, password }) => {
  cy.get('#username').clear().type(username)
  cy.get('#password').clear().type(password)
  cy.get('#login-button').click()
}

const createBlog = ({ title, author, url }) => {
  cy.contains('new blog').click()

  cy.get('#title').clear().type(title)
  cy.get('#author').clear().type(author)
  cy.get('#url').clear().type(url)

  cy.contains('save').click()
}

const likeBlog = ({ title }) => {
  cy.get('.blog').contains(title).contains('like').click()
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Maria Syed',
      username: 'marsyed',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('shows Login form', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      loginUser({ username: 'marsyed', password: 'password' })

      cy.contains('Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('marsyed')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('Creating blogs', function() {
    const title = 'a blog title'
    const author = 'John Doe'
    const url = 'url.com'

    beforeEach(function() {
      loginUser({ username: 'marsyed', password: 'password' })
      createBlog({ title, author, url })
    })

    it('creates the blog', function() {
      cy.contains(title)
      cy.contains(author)
    })

    it('likes blog when like button is clicked', function() {
      cy.get('.blog').contains(title).contains('view').click()
      cy.get('.blog').contains(title).contains('likes: 0')

      likeBlog({ title })

      cy.get('.blog').contains(title).contains('likes: 1')
    })

    it('deletes blog when remove button is clicked', () => {
      cy.contains('view').click()

      cy.contains('remove').click()

      cy.contains(`Deleted blog: ${title} by ${author}`)
      cy.contains(title).should('not.exist')
      cy.contains(author).should('not.exist')
    })
  })

  describe('Displaying blogs', () => {
    const blogs = [
      { title: '10 likes blog', author: 'John Doe', url: 'url.com' },
      { title: '5 likes blog', author: 'John Doe', url: 'url.com' },
      { title: '20 likes blog', author: 'John Doe', url: 'url.com' }
    ]

    beforeEach(() => {
      loginUser({ username: 'marsyed', password: 'password' })
      blogs.forEach(blog => createBlog(blog))
    })

    it('orders blogs in descending order of likes', () => {
      cy.get('.blog').contains(blogs[0].title).contains('view').click()

      for (let i = 0; i < 10; i++) {
        likeBlog(blogs[0])
      }

      cy.get('.blog').contains(blogs[1].title).contains('view').click()

      for (let i = 0; i < 5; i++) {
        likeBlog(blogs[1])
      }

      cy.get('.blog').contains(blogs[2].title).contains('view').click()

      for (let i = 0; i < 20; i++) {
        likeBlog(blogs[2])
      }

      cy.get('.blog').eq(0).contains(blogs[2].title)
      cy.get('.blog').eq(1).contains(blogs[0].title)
      cy.get('.blog').eq(2).contains(blogs[1].title)
    })
  })
})