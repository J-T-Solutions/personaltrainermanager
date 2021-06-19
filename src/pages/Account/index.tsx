const Account: React.FC = () => (
  <div>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
    repellat obcaecati distinctio quo, inventore nisi rem sint nulla provident
    illum sed eveniet reprehenderit praesentium officia illo perferendis
    ducimus. Numquam eos quae quam, dolorum quo delectus sit, eligendi
    perferendis porro nam commodi? Vel eligendi inventore quaerat earum sapiente
    autem ad aliquid provident ab neque optio voluptates eius, dolorum numquam
    iure voluptate beatae. Porro, sequi. Nam quos aut provident, quibusdam ex
    temporibus. Amet laudantium quidem mollitia, odit nostrum aliquam iusto cum
    tempora dicta officia, rem qui molestiae fuga animi eius veniam? Eos
    necessitatibus excepturi officia nesciunt accusantium dolorem ipsa quos,
    soluta in a obcaecati at eligendi debitis minus error maiores aliquam modi
    illum? Nemo dolore, assumenda asperiores dignissimos consequuntur iusto
    sapiente, vero unde inventore velit alias saepe, consequatur aut molestiae
    minus porro! Possimus voluptatibus enim molestias eligendi qui repellendus
    nesciunt aliquid explicabo ab. Eius beatae nemo sint quos voluptates. A sit
    mollitia dolorum optio doloremque aliquid, autem vero tempora eveniet culpa
    assumenda facilis et eius saepe nulla, repellat debitis, id enim delectus.
    Cumque officiis hic facere eveniet voluptatum accusamus error repudiandae
    nisi minus, ipsam explicabo velit culpa soluta, odio obcaecati magnam
    aspernatur debitis optio fugiat adipisci excepturi. Recusandae pariatur ipsa
    reiciendis aspernatur enim distinctio deserunt suscipit esse maiores beatae!
    Molestiae molestias eos alias sit assumenda obcaecati, neque minima vitae
    eius voluptatum temporibus quis voluptate voluptatibus deserunt, nisi
    laudantium culpa aliquam vero quos similique. Nam tenetur atque dolorum
    voluptatum inventore perspiciatis molestiae a numquam vero, laborum quod
    maiores, eum repellat ab quasi distinctio natus aut sequi deserunt
    perferendis facere error, recusandae placeat! Aliquid nulla ipsa, totam
    necessitatibus dolorum odit magni cum soluta reiciendis commodi quo
    explicabo quis quas sint non esse nobis quasi harum corporis, blanditiis
    enim? Repellat fugit possimus sint eos cumque harum porro quos molestias,
    error voluptatum repudiandae impedit praesentium adipisci.
  </div>
)
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
