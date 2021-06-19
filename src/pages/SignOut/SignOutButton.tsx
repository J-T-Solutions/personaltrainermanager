import { signOutUser } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const SignOutButton: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const onSignOutUser = async () => {
    await dispatch(signOutUser())
    history.push(Routes.SignIn)
  }

  return (
    <Button color="inherit" onClick={onSignOutUser}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
