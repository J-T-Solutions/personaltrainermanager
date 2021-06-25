import { Link } from 'react-router-dom'
import { Routes } from '../../constants/routes'

const PasswordForgetLink: React.FC = () => (
  <p>
    <Link to={Routes.PasswordForget}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetLink
