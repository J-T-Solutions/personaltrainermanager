import React /*, { ReactElement }*/ from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { compose } from 'recompose'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import { Routes } from '../../constants/routes'

// interface IState extends RouteComponentProps{
//   firebase: Firebase;
// }

// interface IProps{
//   WithAuthorization: any;
// }

type AuthInterface = {
  uid: string
  email: string
}

// Fix Any type, React.Component<any> is a pain in the ass
const withAuthorization = (condition: any) => (Component: React.FC) => {
  class WithAuthorization extends React.Component<any> {
    // Fix Any Type
    listener: any
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser: AuthInterface) => {
          if (!condition(authUser)) {
            this.props.history.push(Routes.SignIn)
          }
        },
        () => this.props.history.push(Routes.SignIn),
      )
    }
    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization)
}

export default withAuthorization
