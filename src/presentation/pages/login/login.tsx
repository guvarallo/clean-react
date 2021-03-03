import React, { useState } from 'react'

import Styles from './login-styles.scss'

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({ isLoading: false })
  const [errorState] = useState({
    email: 'Required field',
    password: 'Required field',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='E-mail' />
          <Input type='password' name='password' placeholder='Password' />
          <button
            data-testid='submit'
            disabled
            className={Styles.submit}
            type='submit'
          >
            Enter
          </button>
          <span className={Styles.link}>Create an account</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
