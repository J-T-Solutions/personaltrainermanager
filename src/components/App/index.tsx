import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import { Routes } from '../../constants/routes'
import React from 'react'

const App: React.FC = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={Routes.Landing} component={LandingPage} />
      <Route path={Routes.SignUp} component={SignUpPage} />
      <Route path={Routes.SignIn} component={SignInPage} />
      <Route path={Routes.PasswordForget} component={PasswordForgetPage} />
      <Route path={Routes.Home} component={HomePage} />
      <Route path={Routes.Account} component={AccountPage} />
    </div>
  </Router>
)

export default App
