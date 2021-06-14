import { signOutUser } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'

const SignOutButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const onSignOutUser = () => {
    dispatch(signOutUser())
  }

  return (
    <button type="button" onClick={onSignOutUser}>
      Sign Out
    </button>
  )
}

export default SignOutButton
