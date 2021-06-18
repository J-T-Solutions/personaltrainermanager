import { signOutUser } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'
import Button from '@material-ui/core/Button'

const SignOutButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const onSignOutUser = () => {
    dispatch(signOutUser())
  }

  return (
    <Button color="inherit" onClick={onSignOutUser}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
