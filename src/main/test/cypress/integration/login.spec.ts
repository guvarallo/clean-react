import faker from 'faker'

import {
  baseUrl,
  testInputStatus,
  fillFormCorrectly,
  submit
} from '../support/form-helper'

describe('Login', () => {
  beforeEach(() => cy.visit('login'))

  it('Should load with correct initial state', () => {
    testInputStatus('email', 'invalid', 'Required field', '⚠️')
    testInputStatus('password', 'invalid', 'Required field', '⚠️')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    testInputStatus('email', 'invalid', 'Invalid value', '⚠️')
    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    testInputStatus('password', 'invalid', 'Invalid value', '⚠️')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    fillFormCorrectly('email', 'password')
    testInputStatus('email', 'valid', 'Looks good', '✔')
    testInputStatus('password', 'valid', 'Looks good', '✔')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.random.words()
      }
    })
    fillFormCorrectly('email', 'password')
    submit()
    cy.getByTestId('main-error').should('contain.text', 'Wrong Credentials')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError with any other statusCode', () => {
    cy.intercept('POST', /login/, {
      statusCode: 400,
      body: {
        error: faker.random.words()
      }
    })
    fillFormCorrectly('email', 'password')
    submit()
    cy.getByTestId('main-error').should(
      'contain.text',
      'An error has occurred. Try again later'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.random.uuid()
      }
    })
    fillFormCorrectly('email', 'password')
    submit()
    cy.getByTestId('main-error').should(
      'contain.text',
      'An error has occurred. Try again later'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save account if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      }
    })
    fillFormCorrectly('email', 'password')
    submit()
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => {
      return assert.isOk(window.localStorage.getItem('account'))
    })
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      }
    }).as('request')
    fillFormCorrectly('email', 'password')
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      }
    }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
