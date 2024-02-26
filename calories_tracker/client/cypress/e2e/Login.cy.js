/// <reference types="Cypress" />
import 'cypress-react-selector'

describe('Login Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    // test to check when username and password are provided then clicking submit takes them to next component
    it("submit button takes to caloriesGoal component", () => {
        cy.get('.username').type('aditjain888')
        cy.get('.password').type('abcABC1234')
        cy.get('.submitButton').click()
        cy.get('.welcomeHeader').contains('Welcome aditjain888')
        cy.get('.username').should('not.exist')
        cy.get('.password').should('not.exist')
    })

    // test to check that create account button takes them to createAccount component
    it("Create account button takes to createAccount component", () => {
        cy.get('.createAccBtn').click()
        cy.get('.createAccForm',{timeout: 10000}).should('be.visible')
    })

    // test to check when password is not provided, submit button throws an error
    it("password not provided", () => {
        cy.get('.username').type('aditjain58')
        cy.get('.submitButton').click()
        cy.get('.loginError').contains('password not provided')
        cy.get('.welcomeHeader').should('not.exist')
    })

    // test to check when username is not provided, submit button throws an error
    it("username not provided", () => {
        cy.get('.password').type('password')
        cy.get('.submitButton').click()
        cy.get('.loginError').contains('username not provided')
        cy.get('.welcomeHeader').should('not.exist')
    })

     // test to check that user is not logged in if credentials do not exist in database
     it("username not provided", () => {
        cy.get('.username').type('aditjain854')
        cy.get('.password').type('abcABC1332')
        cy.get('.submitButton').click()
        cy.get('.loginError').contains('No user found with provided credentials')
    })
})
