import React, { memo } from 'react'

import Styles from './login-header-styles.scss'
import Logo from '../logo/logo'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
      <h1>4Dev - Surveys for Devs</h1>
    </header>
  )
}

export default memo(LoginHeader)
