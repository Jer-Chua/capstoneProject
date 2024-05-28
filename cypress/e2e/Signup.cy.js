describe('Sign Up spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  })

  context('desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('Unsuccessful Sign up', () => {
      cy.get('#name').should('be.visible').type('cypress')
      cy.get('#email').should('be.visible').type('cypress@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword1!')
      cy.get('#confirmPassword').should('be.visible').type('P@ssword2!')
      cy.get('#submitButton').click()
      cy.get('#password')
        .should('be.visible')
        .should('have.class', 'block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 ring-2 ring-inset ring-red-600 sm:text-sm sm:leading-6');
      cy.get('#confirmPassword')
        .should('be.visible')
        .should('have.class', 'block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 ring-2 ring-inset ring-red-600 sm:text-sm sm:leading-6');
    })

    it('Successful Sign up', () => {
      cy.get('#name').should('be.visible').type('cypress')
      cy.get('#email').should('be.visible').type('cypress@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword1!')
      cy.get('#confirmPassword').should('be.visible').type('P@ssword1!')
      cy.get('#submitButton').click()
      cy.url().should('eq', 'http://localhost:3000/account')
    })

    it('Duplicate Account', () => {
      cy.get('#name').should('be.visible').type('cypress')
      cy.get('#email').should('be.visible').type('cypress@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword1!')
      cy.get('#confirmPassword').should('be.visible').type('P@ssword1!')
      cy.get('#submitButton').click()
      cy.get('#loginFailMessage').should('be.visible')
    })
  })
})