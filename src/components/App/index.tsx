import { Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import clsx from 'clsx'

import Navigation from '../Navigation'
import LandingPage from '../../pages/Landing'
import PasswordForgetPage from '../../pages/PasswordForget'
import HomePage from '../../pages/Home'
import AccountPage from '../Account'
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
import { SignUpPage } from '../../pages/SignUp'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector((state) => selectShowDrawer(state))
  const classes = useAppStyles()

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      dispatch(setAuthUser(JSON.parse(localStorage.getItem('authUser')!)))
    }
    const listener = firebaseInstance.onAuthUserListener(
      (authUser) => {
        console.log('dodane teraz' + authUser.uid)
        localStorage.setItem('authUser', JSON.stringify(authUser))
        return function cleanup() {
          listener()
        }
      },
      () => {
        dispatch(setShowDrawer(false))
        localStorage.removeItem('authUser')
      },
    )
  }, [])

  return (
    <Router history={history}>
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
            <Route path={Routes.SignUp} component={SignUpPage} />
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
