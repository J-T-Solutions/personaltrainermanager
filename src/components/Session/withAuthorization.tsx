/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React /*, { ReactElement }*/ from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

type AuthInterface = {
  uid: string
  email: string
}

// Fix Any type, React.Component<any> is a pain in the ass
const withAuthorization = (condition: any) => (Component: React.FC) => {
  class WithAuthorization extends React.Component<any> {
    // Fix Any Type
    listener: any

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
