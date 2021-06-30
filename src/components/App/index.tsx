import { Router, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import clsx from 'clsx'

import Navigation from '../Navigation'
import AppDrawer from '../Drawer'
import SignInPage from '../../pages/SignIn/SignInPage'
import { SignOutPage } from '../../pages/SignOut'
import LandingPage from '../../pages/Landing'
import HomePage from '../../pages/Home'
import AccountPage from '../../pages/Account'
import { PasswordForgetPage } from '../../pages/PasswordForget'
import MyCustomers from '../../pages/MyCustomers'
import SignUpPage from '../../pages/SignUp/SignUpPage'
import { Routes } from '../../constants/routes'
import { useAppSelector } from '../../hooks'
import { selectShowDrawer } from '../../features/views/viewsSlice'

import { useAppStyles } from './styles'
import { createBrowserHistory } from 'history'
import { AddCustomerPage } from 'pages/MyCustomers/AddCustomerPage'
import useAuth from 'hooks/useAuth'
import { PrivateRoute } from 'components/PrivateRoute'

const history = createBrowserHistory()

const App: React.FC = () => {
  const isDrawerOpen = useAppSelector((state) => selectShowDrawer(state))
  const classes = useAppStyles()

  // TODO: move components and pages to features folders
  useAuth()

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
            <Route path={Routes.SingOut} component={SignOutPage} />
            <PrivateRoute path={Routes.Account} component={AccountPage} />
            <PrivateRoute path={Routes.Customers} component={MyCustomers} />
            <PrivateRoute
              path={Routes.AddCustomer}
              component={AddCustomerPage}
            />
          </Container>
        </main>
      </div>
    </Router>
  )
}

export default App
