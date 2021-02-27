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

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('marsyed')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('marsyed')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('marsyed')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {

      const title = 'a blog title'
      const author = 'John Doe'
      const url = "url.com"

      cy.contains('new blog').click()
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.contains('save').click()

      cy.contains(title)
      cy.contains(author)
    })
  })
})