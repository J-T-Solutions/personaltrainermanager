import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import clsx from 'clsx'

import Navigation from '../Navigation'
import LandingPage from '../../pages/Landing'
import PasswordForgetPage from '../../pages/PasswordForget'
import HomePage from '../../pages/Home'
import AccountPage from '../../pages/Account'
import { Routes } from '../../constants/routes'
import React, { useEffect } from 'react'
import { SignOutPage } from '../../pages/SignOut'
import { firebaseInstance } from '../Firebase'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAuthUser } from '../../features/authentication/sessionSlice'
import SignInPage from '../../pages/SignIn/SignInPage'
import AppDrawer from '../Drawer'
import {
  selectShowDrawer,
  setShowDrawer,
} from '../../features/views/viewsSlice'
import { useAppStyles } from './styles'
import { SignUpForm } from '../../pages/SignUp'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector((state) => selectShowDrawer(state))
  const classes = useAppStyles()

  useEffect(() => {
    const listener = firebaseInstance.onAuthUserListener(
      (authUser) => {
        dispatch(setAuthUser(authUser))
      },
      () => {
        dispatch(setShowDrawer(false))
      },
    )
    // removes listener
    return function cleanup() {
      listener()
    }
  }, [])

  return (
    <Router>
      <div className={classes.root}>
        <Navigation />
        <AppDrawer />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: isDrawerOpen,
          })}
        >
          <Container maxWidth="lg">
            <Route exact path={Routes.Landing} component={LandingPage} />
            <Route path={Routes.SignUp} component={SignUpForm} />
            <Route path={Routes.SignIn} component={SignInPage} />
            <Route
              path={Routes.PasswordForget}
              component={PasswordForgetPage}
            />
            <Route path={Routes.Home} component={HomePage} />
            <Route path={Routes.Account} component={AccountPage} />
            <Route path={Routes.SingOut} component={SignOutPage} />
          </Container>
        </main>
      </div>
    </Router>
  )
}

export default App
