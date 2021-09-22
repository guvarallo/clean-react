import React from 'react'

import ApiContext from '@/presentation/contexts/api/api-context'
import { SurveyList } from '@/presentation/pages'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '../adapters/current-account-adapter'
import { makeLogin } from '../factories/pages/login/login-factory'
import { makeSignUp } from '../factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={makeLogin} />
          <Route path='/signup' exact component={makeSignUp} />
          <Route path='/' exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
