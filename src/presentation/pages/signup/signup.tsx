import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import Styles from './signup-styles.scss'

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken
}: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      )
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (
        state.isLoading ||
        state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.passwordConfirmationError
      ) {
        return
      }

      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid='form'
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Create an Account</h2>
          <Input type='text' name='name' placeholder='Enter your name' />
          <Input type='email' name='email' placeholder='E-mail' />
          <Input type='password' name='password' placeholder='Password' />
          <Input
            type='password'
            name='passwordConfirmation'
            placeholder='Confirm your Password'
          />
          <button
            data-testid='submit'
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
            className={Styles.submit}
            type='submit'
          >
            Enter
          </button>
          <Link data-testid='login' replace to='/login' className={Styles.link}>
            Back to Login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
