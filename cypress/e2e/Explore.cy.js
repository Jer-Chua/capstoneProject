describe('Explore spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/explore');
  })

  context('desktop resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('Favourite without Account', () =>{
      cy.get('#noAccountHeart').should('be.visible').click()
      cy.get('#errorMessage').should('be.visible')
    })

    it('Favourite with Account', () =>{
      cy.get('#loginButton').should('be.visible').click()
      cy.get('#email').should('be.visible').type('testing@gmail.com')
      cy.get('#password').should('be.visible').type('P@ssword1!')
      cy.get('#submitButton').click()
      cy.url().should('eq', 'http://localhost:3000/account');
      cy.get('#navExplore').click()
      cy.wait(5000)
      cy.get('#heart').should('be.visible').click()
    })

    it('Filter Bar', () =>{
      cy.get('#searchBar').should('be.visible').type('programming')
      cy.get('#searchIcon').click()
      cy.wait(5000)
      cy.contains('C Programming')
    })

    it('Filter Popup Box', () =>{
      cy.get('#filterIcon').click()
      cy.contains('Apply Filters')
      cy.get('#authorBar').should('be.visible').type('World Book')
      cy.get('#filterApplyBtn').click()
      cy.contains('The World Book Encyclopedia')
    })

    
  })
})