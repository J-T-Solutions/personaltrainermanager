import { useAppDispatch } from '../../hooks'
import { signInWithGoogle } from '../../features/authentication/sessionSlice'
import GoogleButton from 'react-google-button'

const SignInWithGoogle: React.FC = () => {
  const dispatch = useAppDispatch()

  const onSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(signInWithGoogle())
  }

  return (
    <GoogleButton
      onClick={onSubmit}
      type="light"
      style={{ width: '100%', marginTop: '30px' }}
    />
  )
}

export default SignInWithGoogle
