import { Router, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import clsx from 'clsx'

import Navigation from '../Navigation'
import AppDrawer from '../Drawer'
import { firebaseInstance } from '../Firebase'
import SignInPage from '../../pages/SignIn/SignInPage'
import { SignOutPage } from '../../pages/SignOut'
import LandingPage from '../../pages/Landing'
import HomePage from '../../pages/Home'
import AccountPage from '../../pages/Account'
import { PasswordForgetPage } from '../../pages/PasswordForget'
import MyCustomers from '../../pages/MyCustomers'
import SignUpPage from '../../pages/SignUp/SignUpPage'
import { Routes } from '../../constants/routes'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAuthUser } from '../../features/authentication/sessionSlice'
import {
  selectShowDrawer,
  setShowDrawer,
} from '../../features/views/viewsSlice'

import { useAppStyles } from './styles'
import { createBrowserHistory } from 'history'
import { LocalStorageKey } from '../../constants/localStorage'
import { AddCustomerPage } from 'pages/MyCustomers/AddCustomerPage'
import Chat from 'pages/Chat'

const history = createBrowserHistory()

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector((state) => selectShowDrawer(state))
  const classes = useAppStyles()

  useEffect(() => {
    const authUserFromLocalStorage = localStorage.getItem(
      LocalStorageKey.AuthUser,
    )

    if (authUserFromLocalStorage) {
      dispatch(setAuthUser(JSON.parse(authUserFromLocalStorage)))
    }

    const listener = firebaseInstance.onAuthUserListener(
      (authUser) => {
        localStorage.setItem(LocalStorageKey.AuthUser, JSON.stringify(authUser))
        dispatch(setAuthUser(authUser))
      },
      () => {
        dispatch(setShowDrawer(false))
        localStorage.removeItem(LocalStorageKey.AuthUser)
      },
    )
    // removes listener
    return function cleanup() {
      listener()
    }
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
          <div className={classes.toolbar}></div>
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
            <Route path={Routes.Customers} component={MyCustomers} />
            <Route path={Routes.AddCustomerPage} component={AddCustomerPage} />
            <Route path={Routes.Chat} component={Chat} />
          </Container>
        </main>
      </div>
    </Router>
  )
}

export default App
