import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import UsersList from './UsersList'
import UserInfo from './UserInfo'
import ChatContent from './ChatContent'
import { useAppSelector } from 'hooks'

import SendMessageField from './SendMessageField'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto',
  },
})

const Chat = () => {
  const classes = useStyles()
  const friendsUid = useAppSelector((state) => state.chat.chatFriendsUid)
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <UserInfo />
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <UsersList />
        </Grid>
        <Grid item xs={9}>
          {friendsUid ? <ChatContent /> : <h1>Select your Friend</h1>}

          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <SendMessageField />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat
