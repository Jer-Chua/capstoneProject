describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  })

  context('desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('login', () =>{
      cy.get('#email').should('be.visible').type('testing@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword1!')
      cy.get('#submitButton').click()
      cy.url().should('eq', 'http://localhost:3000/account');
    })

    it('fail login', () =>{
      cy.get('#email').should('be.visible').type('testing@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword!')
      cy.get('#submitButton').click()
      cy.get('#loginFailMessage').should('be.visible')
    })
  })
})