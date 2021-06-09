import { compose } from 'recompose'
import app from 'firebase/app'

import { withAuthorization, withEmailVerification } from '../Session'

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
)

const condition = (authUser: app.auth.UserCredential) => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage)
