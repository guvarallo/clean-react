import faker from 'faker'

export const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (
  field: string,
  valid: string,
  statusMessage: string,
  status: string
): void => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', valid)
  cy.getByTestId(`${field}-status`)
    .should('have.attr', 'title', statusMessage)
    .should('contain.text', status)
}

export const fillFormCorrectly = (
  email: string,
  password: string,
  name?: string,
  passwordConfirmation?: string
): void => {
  const pass = faker.random.alphaNumeric(5)
  cy.getByTestId(email).type(faker.internet.email())
  cy.getByTestId(password).type(pass)
  if (name && passwordConfirmation) {
    cy.getByTestId(name).type(faker.name.firstName())
    cy.getByTestId(passwordConfirmation).type(pass)
  }
}

export const submit = (): void => {
  cy.getByTestId('submit').click()
  cy.getByTestId('spinner').should('not.exist')
}
