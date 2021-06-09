import { Link } from 'react-router-dom'

import SignOutButton from '../SignOut'
import { Routes } from '../../constants/routes'

import { useAppSelector } from '../../hooks'
import { selectAuthUser } from '../../features/authentication/sessionSlice'

const Navigation: React.FC = () => {
  const authUser = useAppSelector((state) => selectAuthUser(state))

  return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
}

const NavigationAuth: React.FC = () => (
  <ul>
    <li>
      <Link to={Routes.Landing}>Landing</Link>
    </li>
    <li>
      <Link to={Routes.Home}>Home</Link>
    </li>
    <li>
      <Link to={Routes.Account}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
)

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={Routes.Landing}>Landing</Link>
    </li>
    <li>
      <Link to={Routes.SignIn}>Sign In</Link>
    </li>
    <li>
      <Link to={Routes.SignUp}>Sign Up</Link>
    </li>
  </ul>
)

export default Navigation
