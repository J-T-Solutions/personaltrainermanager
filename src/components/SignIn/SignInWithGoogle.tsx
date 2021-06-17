import { useAppDispatch } from '../../hooks'
import { signInWithGoogle } from '../../features/authentication/sessionSlice'
import googleBtn from '../../assets/images/google-signin.png'

export const SignInWithGoogle: React.FC = () => {
  const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signInWithGoogle())
  }

  return (
    <form onSubmit={onSubmit}>
      <button>
        <img src={googleBtn} alt="Google Sign In Button" />
      </button>
    </form>
  )
}
