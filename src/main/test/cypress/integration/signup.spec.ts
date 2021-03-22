import { testInputStatus } from '../support/form-helper'

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
})
