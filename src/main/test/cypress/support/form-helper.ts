import faker from 'faker'

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

export const fillFormCorrectly = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))
}

export const submit = (): void => {
  cy.getByTestId('submit').click()
  cy.getByTestId('spinner').should('not.exist')
}
