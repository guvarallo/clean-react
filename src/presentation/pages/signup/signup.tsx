import React, { useEffect, useState } from 'react'

import Styles from './signup-styles.scss'

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: 'Required field',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.name, state.email, state.password])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
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
            disabled
            className={Styles.submit}
            type='submit'
          >
            Enter
          </button>
          <span className={Styles.link}>Back to Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
