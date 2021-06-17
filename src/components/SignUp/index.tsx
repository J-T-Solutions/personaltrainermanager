/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Firebase from '../Firebase'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import { SignUpForm } from './SignUpForm'

// const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use'
// const ERROR_MSG_ACCOUNT_EXISTS = `
// An account with this E-Mail address already exists. Try to login with this account instead. If you think the account is already used from one of the social logins, try to sign-in with one of them. Afterward, associate your accounts on your personal account page.
//`

const SignUpPage: React.FC = () => {
  return (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
  )
}

// const INITIAL_STATE = {
//   username: '',
//   email: '',
//   passwordOne: '',
//   passwordTwo: '',
//   isAdmin: false,
//   error: null,
// }

// interface IState {
//   username: string
//   email: string
//   passwordOne: string
//   passwordTwo: string
//   isAdmin: boolean
//   error: { message: string } | null
//   [x: string]: string | { message: string } | null | boolean
// }

// interface IProps {
//   firebase?: Firebase | null
//   history?: any
// }

// class SignUpFormBase extends Component<IProps, IState> {
//   constructor(props: any) {
//     super(props)

//     this.state = { ...INITIAL_STATE }
//   }

//   onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // const { username, email, passwordOne, isAdmin } = this.state
    // const roles: { ADMIN?: string } = {}
    // if (isAdmin) {
    //   roles[ROLES.ADMIN] = ROLES.ADMIN
    // }
    // this.props.firebase &&
    //   this.props.firebase
    //     .doCreateUserWithEmailAndPassword(email, passwordOne)
    //     .then((authUser: AuthUser) => {
    //       // Create a user in your Firebase realtime database
    //       return this.props.firebase
    //         .user(authUser.user.uid)
    //         .set({ username, email, roles })
    //     })
    //     .then(() => {
    //       return this.props.firebase?.doSendEmailVerification()
    //     })
    //     .then(() => {
    //       this.setState({ ...INITIAL_STATE })
    //       this.props.history.push(Routes.Home)
    //     })
    //     .catch((error) => {
    //       if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
    //         error.message = ERROR_MSG_ACCOUNT_EXISTS
    //       }
  //   //       this.setState({ error })
  //   //     })
  //   e.preventDefault()
  // }

  // onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  // onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({ [e.target.name]: e.target.checked })
  // }

  // render() {
  //   const { username, email, passwordOne, passwordTwo, isAdmin, error } =
  //     this.state

  //   const isInvalid =
  //     passwordOne !== passwordTwo ||
  //     passwordOne === '' ||
  //     email === '' ||
  //     username === ''

  //   return (
  //     <form onSubmit={this.onSubmit}>
  //       <input
  //         name="username"
  //         value={username}
  //         onChange={this.onChange}
  //         type="text"
  //         placeholder="Full Name"
  //       />
  //       <input
  //         name="email"
  //         value={email}
  //         onChange={this.onChange}
  //         type="text"
  //         placeholder="Email Address"
  //       />
  //       <input
  //         name="passwordOne"
  //         value={passwordOne}
  //         onChange={this.onChange}
  //         type="password"
  //         placeholder="Password"
  //       />
  //       <input
  //         name="passwordTwo"
  //         value={passwordTwo}
  //         onChange={this.onChange}
  //         type="password"
  //         placeholder="Confirm Password"
  //       />
  //       <label>
  //         Admin:
  //         <input
  //           name="isAdmin"
  //           type="checkbox"
  //           checked={isAdmin}
  //           onChange={this.onChangeCheckbox}
  //         />
  //       </label>

  //       <button disabled={isInvalid} type="submit">
  //         Sign Up
  //       </button>
  //       {error && <p>{error.message}</p>}
  //     </form>
  //   )
  // }
// }

// const SignUpLink: React.FC = () => <p>{`Don't have an account?`}</p>

// const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase)

export default SignUpPage
// export { SignUpForm, SignUpLink }
