/// <reference types="cypress" />


describe('real world DNEVA test', () => {
    
    before('log in', () => {
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').clear() .type('Katharina_Bernier')
    cy.get('#password').clear() .type('s3cret')
    cy.get('.MuiButton-label').click()
    cy.get('H6[data-test="sidenav-user-full-name"]').should('have.text','Edgar J')
    })

    it('create bank account', () => { 
    //go to bank accounts
    cy.get('.MuiButtonBase-root') .contains('Bank') .click() 
    cy.get('H2').should('have.text','Bank Accounts')  
    
    //create a new bank account
    cy.get('.MuiButton-label') .contains('Create') .click()  
    cy.get('#bankaccount-bankName-input').clear() .type('TestBank')
    cy.get('#bankaccount-routingNumber-input').clear() .type('123556789')
    cy.get('#bankaccount-accountNumber-input').clear() .type('123556789')
    cy.get('Button[data-test="bankaccount-submit"]').click()
    cy.get('.MuiListItem-root') .contains('TestBank').should('exist')

    // deleting bank account
    cy.get('.MuiButton-containedSecondary').last().click()
    cy.get('.MuiListItem-root') .contains('TestBank (Deleted)').should('exist')
})
after('log out', () => {
    cy.get('.MuiListItemText-primary').contains('Logout').click()
    cy.get('H1').should('have.text','Sign in')
    })

})
