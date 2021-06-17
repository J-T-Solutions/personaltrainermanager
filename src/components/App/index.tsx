import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import { Routes } from '../../constants/routes'
import React, { useEffect } from 'react'
import { SignOutPage } from '../SignOut'
import { firebaseInstance } from '../Firebase'
import { useAppDispatch } from '../../hooks'
import { setAuthUser } from '../../features/authentication/sessionSlice'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    firebaseInstance.auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        dispatch(setAuthUser(authUser))
      } else {
        dispatch(setAuthUser(null))
      }
    })
  }, [])

  return (
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
        <Route path={Routes.SignOut} component={SignOutPage} />
      </div>
    </Router>
  )
}

export default App
