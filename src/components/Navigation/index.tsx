import { useAppSelector } from '../../hooks'
import { selectAuthUser } from '../../features/authentication/sessionSlice'
import { SignOutButton } from '../SignOut'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

const Navigation: React.FC = () => {
  const classes = useStyles()
  const authUser = useAppSelector((state) => selectAuthUser(state))

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Personal Trainer Manager
        </Typography>
        {authUser && <SignOutButton />}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
