import { Routes } from 'constants/routes'
import { selectAuthUser } from 'features/authentication/sessionSlice'
import { useAppSelector } from 'hooks'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute: React.FC<{
  component: any
  path: string
  exact?: boolean
}> = ({ component, path, exact = false }) => {
  const authUser = useAppSelector((state) => selectAuthUser(state))

  return authUser ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={Routes.SignIn} />
  )
}
export default PrivateRoute
