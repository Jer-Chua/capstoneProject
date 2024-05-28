describe('Details spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/details/vxcrDwAAQBAJ');
  })

  context('desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('Recommend without Account', () =>{
      cy.get('#noRecommend').should('be.visible').click()
      cy.get('#errorMessage').should('be.visible')
    })

    it('Recommend with Account', () =>{
      cy.get('#loginButton').should('be.visible').click()
      cy.get('#email').should('be.visible').type('testing@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword1!')
      cy.get('#submitButton').click()
      cy.url().should('eq', 'http://localhost:3000/account');
      cy.visit('http://localhost:3000/details/vxcrDwAAQBAJ');
      cy.get('#addRecommend').should('be.visible').click()
    })
    
  })
})