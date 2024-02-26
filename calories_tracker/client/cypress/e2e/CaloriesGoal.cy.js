/// <reference types="Cypress" />
import 'cypress-react-selector'

describe('Calories Goal Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    // test to check next button is pressed, calories are entered or not.
    it("calories are entered and next button is pressed", () => {
        cy.get('.username').type('aditjain888')
        cy.get('.password').type('abcABC1234')
        cy.get('.submitButton').click()
        cy.get('.welcomeHeader').contains('Welcome aditjain888')
        cy.get('.totalCaloriesGoal').type(2500)
        cy.get('.calorieGoalSubmitBtn').click()
        cy.get('.caloriesCalculator').should('be.visible')
    })

    // test to check next button is pressed and calories are 0, then error message is displayed
    it("calories are not entered and next button is pressed", () => {
        cy.get('.username').type('aditjain888')
        cy.get('.password').type('abcABC1234')
        cy.get('.submitButton').click()
        cy.get('.welcomeHeader').contains('Welcome aditjain888')
        cy.get('.calorieGoalSubmitBtn').click()
        cy.get('.totalCaloriesError').contains('Calories needs to be more then 0')
    })
})
