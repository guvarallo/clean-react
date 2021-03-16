import React, { useState } from 'react'

import Styles from './signup-styles.scss'

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Required field',
    emailError: 'Required field',
    passwordError: 'Required field',
    passwordConfirmationError: 'Required field',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
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
