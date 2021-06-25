import { Routes } from '../../constants/routes'
import { useAppSelector } from '../../hooks'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { firebaseInstance } from '../Firebase'

interface ChildComponentProps {
  history: any
}

const Account: React.FC<ChildComponentProps> = ({ history }) => {
  const authUser: any = useAppSelector((state) => selectAuthUser(state))

  let accountRole
  const userRole = (userName: any) =>
    firebaseInstance.user(userName.uid).on(
      'value',
      (data) => (accountRole = data.val().role),
      (err) => console.log(err),
    )

  userRole(authUser)

  if (!authUser) {
    history.push(Routes.SignIn)
    console.log('non-authorized')
  }

  return (
    <div>
      <h1>Account Type:{accountRole}</h1>
      <h4>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed nisi,
        labore veniam eos odit deserunt illo expedita! Aliquam obcaecati
        incidunt impedit amet. Nesciunt, nam error consectetur eveniet, in
        voluptas illum distinctio a ea modi accusantium temporibus cumque
        similique praesentium perferendis maxime inventore facilis. Dolore
        tempora unde vero eius ab voluptatibus?
      </h4>
    </div>
  )
}

export default Account
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { Component } from 'react'

// import {
//   AuthUserContext,
//   withAuthorization,
//   withEmailVerification,
// } from '../Session'
// import { withFirebase } from '../Firebase'
// import { PasswordForgetForm } from '../PasswordForget'
// import PasswordChangeForm from '../PasswordChange'
// import { compose } from 'recompose'

// const SIGN_IN_METHODS = [
//   {
//     id: 'password',
//     provider: null,
//   },
//   {
//     id: 'google.com',
//     provider: 'googleProvider',
//   },
//   {
//     id: 'facebook.com',
//     provider: 'facebookProvider',
//   },
// ]

// const AccountPage = () => (
//   <AuthUserContext.Consumer>
//     {(authUser: any) => (
//       <div>
//         <h1>Account: {authUser.email}</h1>
//         <PasswordForgetForm />
//         <PasswordChangeForm />
//         <LoginManagement authUser={authUser} />
//       </div>
//     )}
//   </AuthUserContext.Consumer>
// )

// interface IState {
//   error: null | { message: string }
//   activeSignInMethods: string[]
// }

// interface IProps {
//   firebase?: any
//   authUser: { email: string }
// }

// class LoginManagementBase extends Component<IProps, IState> {
//   constructor(props: any) {
//     super(props)

//     this.state = {
//       activeSignInMethods: [],
//       error: null,
//     }
//   }

//   componentDidMount() {
//     this.fetchSignInMethods()
//   }

//   fetchSignInMethods = () => {
//     this.props.firebase.auth
//       .fetchSignInMethodsForEmail(this.props.authUser.email)
//       .then((activeSignInMethods: any) =>
//         this.setState({ activeSignInMethods, error: null }),
//       )
//       .catch((error: any) => this.setState({ error }))
//   }

//   onSocialLoginLink = (provider: any) => {
//     this.props.firebase.auth.currentUser
//       ?.linkWithPopup(this.props.firebase[provider])
//       .then(this.fetchSignInMethods)
//       .catch((error: any) => this.setState({ error }))
//   }

//   onDefaultLoginLink = (password: any) => {
//     const credential = this.props.firebase.emailAuthProvider.credential(
//       this.props.authUser.email,
//       password,
//     )

//     this.props.firebase.auth.currentUser
//       ?.linkWithCredential(credential)
//       .then(this.fetchSignInMethods)
//       .catch((error: any) => this.setState({ error }))
//   }

//   onUnlink = (providerId: any) => {
//     this.props.firebase.auth.currentUser
//       .unlink(providerId)
//       .then(this.fetchSignInMethods)
//       .catch((error: any) => this.setState({ error }))
//   }

//   render() {
//     const { activeSignInMethods, error } = this.state

//     return (
//       <div>
//         Sign In Methods:
//         <ul>
//           {SIGN_IN_METHODS.map((signInMethod: any) => {
//             const onlyOneLeft = activeSignInMethods.length === 1
//             const isEnabled = activeSignInMethods.includes(signInMethod.id)

//             return (
//               <li key={signInMethod.id}>
//                 {signInMethod.id === 'password' ? (
//                   <DefaultLoginToggle
//                     onlyOneLeft={onlyOneLeft}
//                     isEnabled={isEnabled}
//                     signInMethod={signInMethod}
//                     onLink={this.onDefaultLoginLink}
//                     onUnlink={this.onUnlink}
//                   />
//                 ) : (
//                   <SocialLoginToggle
//                     onlyOneLeft={onlyOneLeft}
//                     isEnabled={isEnabled}
//                     signInMethod={signInMethod}
//                     onLink={this.onSocialLoginLink}
//                     onUnlink={this.onUnlink}
//                   />
//                 )}
//               </li>
//             )
//           })}
//         </ul>
//         {error && error.message}
//       </div>
//     )
//   }
// }

// const SocialLoginToggle = ({
//   onlyOneLeft,
//   isEnabled,
//   signInMethod,
//   onLink,
//   onUnlink,
// }: any) =>
//   isEnabled ? (
//     <button
//       type="button"
//       onClick={() => onUnlink(signInMethod.id)}
//       disabled={onlyOneLeft}
//     >
//       Deactivate {signInMethod.id}
//     </button>
//   ) : (
//     <button type="button" onClick={() => onLink(signInMethod.provider)}>
//       Link {signInMethod.id}
//     </button>
//   )

// interface LoginProps {
//   onLink: any
//   onlyOneLeft: boolean
//   isEnabled: boolean
//   signInMethod: { id: string }
//   onUnlink: any
// }

// interface LoginState {
//   passwordOne: string
//   passwordTwo: string
//   [x: string]: string
// }

// class DefaultLoginToggle extends Component<LoginProps, LoginState> {
//   constructor(props: any) {
//     super(props)

//     this.state = { passwordOne: '', passwordTwo: '' }
//   }

//   onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()

//     this.props.onLink(this.state.passwordOne)
//     this.setState({ passwordOne: '', passwordTwo: '' })
//   }

//   onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ [event.target.name]: event.target.value })
//   }

//   render() {
//     const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props

//     const { passwordOne, passwordTwo } = this.state

//     const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

//     return isEnabled ? (
//       <button
//         type="button"
//         onClick={() => onUnlink(signInMethod.id)}
//         disabled={onlyOneLeft}
//       >
//         Deactivate {signInMethod.id}
//       </button>
//     ) : (
//       <form onSubmit={this.onSubmit}>
//         <input
//           name="passwordOne"
//           value={passwordOne}
//           onChange={this.onChange}
//           type="password"
//           placeholder="New Password"
//         />
//         <input
//           name="passwordTwo"
//           value={passwordTwo}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Confirm New Password"
//         />

//         <button disabled={isInvalid} type="submit">
//           Link {signInMethod.id}
//         </button>
//       </form>
//     )
//   }
// }

// const LoginManagement = withFirebase(LoginManagementBase)

// const condition = (authUser: any) => !!authUser

// export default compose(
//   withEmailVerification,
//   withAuthorization(condition),
// )(AccountPage)
