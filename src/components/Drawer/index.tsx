import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PeopleIcon from '@material-ui/icons/People'
import MailIcon from '@material-ui/icons/Mail'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  selectShowDrawer,
  setShowDrawer,
} from '../../features/views/viewsSlice'
import { useDrawerStyles } from './styles'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'

const AppDrawer: React.FC = () => {
  const classes = useDrawerStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const isDrawerOpen = useAppSelector((state) => selectShowDrawer(state))
  const history = useHistory()

  const handleDrawerClose = () => {
    dispatch(setShowDrawer(false))
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key={'myCustomers'}
          onClick={() => history.push(Routes.Customers)}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={'My customers'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
    </Drawer>
  )
}

export default AppDrawer
