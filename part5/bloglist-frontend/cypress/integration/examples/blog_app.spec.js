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
})