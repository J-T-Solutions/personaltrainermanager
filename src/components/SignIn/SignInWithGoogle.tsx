import { useAppDispatch } from '../../hooks'
import { signInWithGoogle } from '../../features/authentication/sessionSlice'
import googleBtn from '../../assets/images/google-signin.png'

const SignInWithGoogle: React.FC = () => {
  const dispatch = useAppDispatch()

  const onSubmit = (e: any) => {
    e.preventDefault()
    dispatch(signInWithGoogle())
  }

  return (
    <div onClick={onSubmit}>
      <img src={googleBtn} alt="Google Sign In Button" />
    </div>
  )
}

export default SignInWithGoogle
