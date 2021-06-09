/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/display-name */
import React from 'react'
import Firebase from './firebase'

const FirebaseContext = React.createContext<Firebase | null>(null)

export const withFirebase =
  <P extends {}>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) =>
    (
      <FirebaseContext.Consumer>
        {(firebase) => <Component {...props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    )

export default FirebaseContext
