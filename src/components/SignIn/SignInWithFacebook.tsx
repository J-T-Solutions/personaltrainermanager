import { signInWithFacebook } from '../../features/authentication/sessionSlice'
import { useAppDispatch } from '../../hooks'

const SignInWithFacebook: React.FC = () => {
  const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signInWithFacebook())
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Facebook</button>
    </form>
  )
}

export default SignInWithFacebook
