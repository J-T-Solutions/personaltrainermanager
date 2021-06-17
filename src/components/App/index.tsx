import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import { Routes } from '../../constants/routes'
import React, { useEffect } from 'react'
import { SignOutPage } from '../SignOut'
import { firebaseInstance } from '../Firebase'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  selectAuthUser,
  setAuthUser,
} from '../../features/authentication/sessionSlice'
import SignInPage from '../SignIn/SignInPage'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => selectAuthUser(state))

  useEffect(() => {
    const listener = firebaseInstance.onAuthUserListener((authUser) => {
      if (authUser) {
        dispatch(setAuthUser(authUser))
      } else {
        dispatch(setAuthUser(null))
      }
      return function cleanup() {
        listener()
      }
    })
  }, [])

  return (
    <Router>
      <Navigation />
      <Container maxWidth="lg">
        <Route exact path={Routes.Landing} component={LandingPage} />
        <Route path={Routes.SignUp} component={SignUpPage} />
        <Route path={Routes.SignIn} component={SignInPage} />
        <Route path={Routes.PasswordForget} component={PasswordForgetPage} />
        <Route path={Routes.Home} component={HomePage} />
        <Route path={Routes.Account} component={AccountPage} />
        <Route path={Routes.SingOut} component={SignOutPage} />
        {!authUser && <Redirect to={Routes.SignIn} />}
      </Container>
    </Router>
  )
}

export default App
