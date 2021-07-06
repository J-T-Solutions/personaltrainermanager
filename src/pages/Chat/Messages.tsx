import {
  List,
  ListItem,
  Grid,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { fetchChatMessages } from 'features/chat/chatSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useEffect } from 'react'

const useStyles = makeStyles({
  messageArea: {
    height: '60vh',
    overflowY: 'auto',
  },
})

const Messages = () => {
  const dispatch = useAppDispatch()
  const messages = Object.values(
    useAppSelector((state) => state.chat.showChatMessages),
  )

  const user1 = useAppSelector((state) => state.session.authUser?.uid)
  const user2 = useAppSelector((state) => state.chat.chatFriendsUid)
  const validation = useAppSelector((state) => state.chat.checkChatInDb)

  useEffect(() => {
    if (user1 && user2 && validation)
      dispatch(fetchChatMessages({ user1, user2 }))
  }, [user1, user2, validation])

  const classes = useStyles()
  return (
    <List className={classes.messageArea}>
      {messages.map((message: any) => {
        return (
          <ListItem key={message.id}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText primary={message.message}></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText secondary={message.messageDate}></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Messages
