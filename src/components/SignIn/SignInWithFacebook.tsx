import { Button, withStyles } from '@material-ui/core'
import { signInWithFacebook } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'

const FacebookButton = withStyles(() => ({
  root: {
    height: '50px',
    marginTop: '15px',
  },
}))(Button)

const SignInWithFacebook: React.FC = () => {
  const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signInWithFacebook())
  }

  return (
    <form onSubmit={onSubmit}>
      <FacebookButton
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Sign In with Facebook
      </FacebookButton>
    </form>
  )
}

export default SignInWithFacebook
