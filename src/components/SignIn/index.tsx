/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { SignUpLink } from '../SignUp'
import Firebase, { withFirebase } from '../Firebase'
import { Routes } from '../../constants/routes'
import { PasswordForgetLink } from '../PasswordForget'
import { SignInForm } from './SignInWithEmail'

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential'
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.
`

const SignInPage: React.FC = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
)

// FIX interface
interface IProps {
  firebase: Firebase
  history?: any
}

interface GoogleState {
  error: { message: string } | null
}

class SignInGoogleBase extends Component<IProps, GoogleState> {
  // Fix Any type
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser: any) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        })
      })
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(Routes.Home)
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }

        this.setState({ error })
      })

    event.preventDefault()
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

class SignInFacebookBase extends Component<IProps, GoogleState> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.firebase
      .doSignInWithFacebook()
      .then((socialAuthUser: any) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        })
      })
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(Routes.Home)
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }

        this.setState({ error })
      })

    event.preventDefault()
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase)
const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase)

export default SignInPage
export { SignInGoogle, SignInFacebook }
