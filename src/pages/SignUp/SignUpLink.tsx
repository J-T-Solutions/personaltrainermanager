import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const SignUpLink: React.FC = () => (
  <p>
    {`Don't have an account?`} <Link to={Routes.SignUp}>Sign Up</Link>
  </p>
)

export default SignUpLink
