import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { DRAWER_WIDTH } from '../Drawer/constants'

export const useAppStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -DRAWER_WIDTH,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
)
