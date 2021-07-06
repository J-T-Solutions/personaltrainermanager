import { Grid, TextField, Fab } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { firebaseInstance } from 'components/Firebase'
import { selectAuthUser } from 'features/authentication/sessionSlice'
import {
  checkChatInDb,
  createUserChat,
  sendChatMessage,
} from 'features/chat/chatSlice'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'hooks'

const SendMessageField = () => {
  const dbCheck = useAppSelector((state) => state.chat.checkChatInDb)
  const dispatch = useAppDispatch()
  const authUid: string | undefined = useAppSelector(
    (state) => selectAuthUser(state)?.uid,
  )
  const friend = useAppSelector((state) => state.chat.chatFriendsUid)
  const chatId = useAppSelector((state) => state.chat.commonChatUid)
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (message, { resetForm }) => {
      try {
        resetForm({})
        await dispatch(sendChatMessage({ message, authUid, chatId })).unwrap()
        if (!dbCheck) {
          await dispatch(createUserChat({ authUid, friend, chatId }))
          dispatch(checkChatInDb({ authUid, friend }))
        }
      } catch (err) {
        console.log(err)
      }
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={11}>
          <TextField
            id="message"
            name="message"
            label="Type Something"
            fullWidth
            value={formik.values.message}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid xs={1} style={{ textAlign: 'right' }}>
          <Fab color="primary" aria-label="add" type="submit">
            <SendIcon />
          </Fab>
        </Grid>
      </form>
    </>
  )
}

export default SendMessageField
