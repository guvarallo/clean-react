export class InvalidCredentialsError extends Error {
  constructor () {
    super('Wrong Credentials')
    this.name = 'InvalidCredentialsError'
  }
}
