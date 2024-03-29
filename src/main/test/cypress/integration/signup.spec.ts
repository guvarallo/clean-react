import faker from 'faker'

import {
  baseUrl,
  fillFormCorrectly,
  submit,
  testInputStatus
} from '../support/form-helper'

describe('SignUp', () => {
  beforeEach(() => cy.visit('signup'))

  it('Should load with correct initial state', () => {
    testInputStatus('name', 'invalid', 'Required field', '⚠️')
    testInputStatus('email', 'invalid', 'Required field', '⚠️')
    testInputStatus('password', 'invalid', 'Required field', '⚠️')
    testInputStatus('passwordConfirmation', 'invalid', 'Required field', '⚠️')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(1))
    testInputStatus('name', 'invalid', 'Invalid value', '⚠️')
    cy.getByTestId('email').type(faker.random.word())
    testInputStatus('email', 'invalid', 'Invalid value', '⚠️')
    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    testInputStatus('password', 'invalid', 'Invalid value', '⚠️')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    testInputStatus('passwordConfirmation', 'invalid', 'Invalid value', '⚠️')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    fillFormCorrectly('email', 'password', 'name', 'passwordConfirmation')
    testInputStatus('name', 'valid', 'Looks good', '✔')
    testInputStatus('email', 'valid', 'Looks good', '✔')
    testInputStatus('password', 'valid', 'Looks good', '✔')
    testInputStatus('passwordConfirmation', 'valid', 'Looks good', '✔')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 403,
      body: {
        error: faker.random.words()
      }
    })
    fillFormCorrectly('email', 'password', 'name', 'passwordConfirmation')
    submit()
    cy.getByTestId('main-error').should('contain.text', 'Email already in use')
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Should present UnexpectedError with any other statusCode', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 400,
      body: {
        error: faker.random.words()
      }
    })
    fillFormCorrectly('email', 'password', 'name', 'passwordConfirmation')
    submit()
    cy.getByTestId('main-error').should(
      'contain.text',
      'An error has occurred. Try again later'
    )
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.datatype.uuid()
      }
    })
    fillFormCorrectly('email', 'password', 'name', 'passwordConfirmation')
    submit()
    cy.getByTestId('main-error').should(
      'contain.text',
      'An error has occurred. Try again later'
    )
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Should save account on success', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      }
    })
    fillFormCorrectly('email', 'password', 'name', 'passwordConfirmation')
    submit()
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => {
      return assert.isOk(window.localStorage.getItem('account'))
    })
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      }
    }).as('request')
    fillFormCorrectly('email', 'password', 'name', 'passwordConfirmation')
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      }
    }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
