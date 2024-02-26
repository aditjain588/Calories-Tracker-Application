/// <reference types="Cypress" />
import 'cypress-react-selector'

describe('Calories Goal Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    // test to check when submit is clicked and food item quantity is not entered, error is thrown to UI
    it("food item quantity not entered test", () => {
        cy.get('.username').type('aditjain888')
        cy.get('.password').type('abcABC1234')
        cy.get('.submitButton').click()
        cy.get('.welcomeHeader').contains('Welcome aditjain888')
        cy.get('.totalCaloriesGoal').type(2500)
        cy.get('.calorieGoalSubmitBtn').click()
        cy.get('.caloriesCalculator').should('be.visible')
        cy.get('.foodConsumed').type("apple")
        cy.get('.foodConsumedSubmitBtn').click()
        cy.get('.nutrientsInfoErrorMsg').contains('Quantity cannot be empty')
    })

    // test to check when submit is clicked and food item consumed is not entered, error is thrown to UI
    it("food item consumed not entered test", () => {
        cy.get('.username').type('aditjain888')
        cy.get('.password').type('abcABC1234')
        cy.get('.submitButton').click()
        cy.get('.welcomeHeader').contains('Welcome aditjain888')
        cy.get('.totalCaloriesGoal').type(2500)
        cy.get('.calorieGoalSubmitBtn').click()
        cy.get('.caloriesCalculator').should('be.visible')
        cy.get('.foodConsumedSubmitBtn').click()
        cy.get('.nutrientsInfoErrorMsg').contains("Food consumed cannot be empty")
    })

    // test to check when submit is clicked, food item and quanitty is entered but no results found, error is thrown to UI
    it("no results found test", () => {
        cy.get('.username').type('aditjain888')
        cy.get('.password').type('abcABC1234')
        cy.get('.submitButton').click()
        cy.get('.welcomeHeader').contains('Welcome aditjain888')
        cy.get('.totalCaloriesGoal').type(2500)
        cy.get('.calorieGoalSubmitBtn').click()
        cy.get('.caloriesCalculator').should('be.visible')
        cy.get('.foodConsumed').type("rapple")
        cy.get('.quantity').type(1)
        cy.get('.foodConsumedSubmitBtn').click()
        cy.get('.nutrientsInfoErrorMsg').contains("Food consumed not found, try again")
    })

    // test to check when submit is clicked, food item and quanitty is entered but no results found, error is thrown to UI
    it("no results found test", () => {
        cy.get('.username').type('aditjain888')
        cy.get('.password').type('abcABC1234')
        cy.get('.submitButton').click()
        cy.get('.welcomeHeader').contains('Welcome aditjain888')
        cy.get('.totalCaloriesGoal').type(2500)
        cy.get('.calorieGoalSubmitBtn').click()
        cy.get('.caloriesCalculator').should('be.visible')
        cy.get('.foodConsumed').type("apple")
        cy.get('.quantity').type(1)
        cy.get('.foodConsumedSubmitBtn').click()
        
        cy.get('.NutrientsTable').get("tr td:nth-child(3)").contains(94)
        cy.get('.NutrientsTable').get("tr td:nth-child(4)").contains(26)
        cy.get('.NutrientsTable').get("tr td:nth-child(5)").contains(1)
        cy.get('.NutrientsTable').get("tr td:nth-child(6)").contains(19)
    })
})
