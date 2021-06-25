import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { SignOutButton } from '../../pages/SignOut'
import {
  selectShowDrawer,
  setShowDrawer,
} from '../../features/views/viewsSlice'
import clsx from 'clsx'
import { useNavigationStyles } from './styles'
import { Routes } from '../../constants/routes'
import { NavButton } from '../Navigation/NavButton'

const Navigation: React.FC = () => {
  const classes = useNavigationStyles()
  const authUser = useAppSelector((state) => selectAuthUser(state))
  const isDrawerOpen = useAppSelector((state) => selectShowDrawer(state))

  const dispatch = useAppDispatch()
  const handleOpenDrawer = () => {
    dispatch(setShowDrawer(true))
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        {authUser && (
          <>
            <IconButton
              edge="start"
              onClick={handleOpenDrawer}
              className={clsx(classes.menuButton, isDrawerOpen && classes.hide)}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </>
        )}

        <Typography variant="h6" className={classes.title}>
          Personal Trainer Manager
        </Typography>
        {authUser ? (
          <>
            <NavButton title="Dashboard" to={Routes.Landing} />
            <NavButton title="Account" to={Routes.Account} />
            <SignOutButton />
          </>
        ) : (
          <>
            <NavButton title="Home" to={Routes.Home} />
            <NavButton title="Sign Up" to={Routes.SignUp} />
            <NavButton title="Sign In" to={Routes.SignIn} />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
