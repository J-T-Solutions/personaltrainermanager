import { withFirebase } from '../Firebase'

// TODO: Implement dispatch of SignOut as redux thunk action
const SignOutButton: React.FC = () => (
  <button type="button" onClick={() => console.log('SignOut')}>
    Sign Out
  </button>
)

export default withFirebase(SignOutButton)
