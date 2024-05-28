describe('Homepage Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  context('desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('displays full header', () => {
      cy.get('#desktop-menu').should('be.visible')
      cy.get('#phone-menu').should('not.be.visible')
    })

    it('testing favourite without account', () =>{
      cy.get('#noAccountHeart').should('be.visible').click()
      cy.get('#errorMessage').should('be.visible')
    })

    it('testing favourite with account', () =>{
      cy.get('#loginButton').should('be.visible').click()
      cy.get('#email').should('be.visible').type('testing@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword1!')
      cy.get('#submitButton').click()
      cy.url().should('eq', 'http://localhost:3000/account');
      cy.get('#navHome').click()
      cy.wait(5000)
      cy.get('#heart').should('be.visible').click()
    })
  })

  context('iphone-12 resolution', () => {
    beforeEach(() => {
      cy.viewport(390, 844)
    })

    it('displays mobile menu on click', () => {
      cy.get('#desktop-menu').should('not.be.visible')
      cy.get('#phone-menu').should('be.visible').click()
      cy.get('#phone-option').should('be.visible')
    })
  })

})