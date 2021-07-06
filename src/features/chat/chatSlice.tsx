import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from 'hooks'
import { firebaseInstance } from '../../components/Firebase'

const initialState: any = {
  chatMessages: {},
  myUid: {},
  chatFriendsUid: null,
  showChatMessages: {},
  checkChatInDb: false,
  commonChatUid: null,
}

// 3D5sQiY5Stgo8Mc5unF6Tzz0q602
// 2N84EB7VHAdQDDDwPs6h9TOI6BA2

// 3D5sQiY5Stgo8Mc5unF6Tzz0q602-2N84EB7VHAdQDDDwPs6h9TOI6BA2

export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async ({ user1, user2 }: any, { dispatch }) => {
    let chatId: string
    let validation: any = false
    if (user1.localeCompare(user2) === 1) {
      chatId = `${user1}-${user2}`
    } else {
      chatId = `${user2}-${user1}`
    }
    await firebaseInstance
      .userChats(user1)
      .once('value', (snapshot) => (validation = snapshot.hasChild(chatId)))

    if (validation) {
      firebaseInstance
        .chatMessages(chatId)
        .on('value', (snapshot) => dispatch(showChatMessages(snapshot.val())))
    } else {
      return
    }
  },
)

export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async ({ message, authUid, chatId }: any) => {
    firebaseInstance.chatMessages(chatId).push().set({
      message: message.message,
      messageDate: new Date().toDateString(),
      sentBy: authUid,
    })
  },
)

export const createUserChat = createAsyncThunk(
  'chat/sendChatMessage',
  async ({ authUid, friend, chatId }: any) => {
    await firebaseInstance.userChats(authUid).update({
      [chatId]: true,
    })
    await firebaseInstance.userChats(friend).update({
      [chatId]: true,
    })
  },
)

export const checkChatInDb = createAsyncThunk(
  'chat/checkChatInDb',
  async ({ authUid, friend }: any, { dispatch }) => {
    let chatId: string
    if (authUid.localeCompare(friend) === 1) {
      chatId = `${authUid}-${friend}`
    } else {
      chatId = `${friend}-${authUid}`
    }
    let verify
    dispatch(setCommonChatUid(chatId))
    await firebaseInstance.userChats(authUid).once('value', (snapshot) => {
      if (snapshot.child(chatId).exists()) {
        verify = true
      } else {
        verify = false
      }
    })
    return verify
  },
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setFriendsUid: (state, action) => {
      state.chatFriendsUid = action.payload
    },
    setCommonChatUid: (state, action) => {
      state.commonChatUid = action.payload
    },
    showChatMessages: (state, action) => {
      state.showChatMessages = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatMessages.fulfilled, (state, action) => {
      state.chatMessages = action.payload
    })
    builder.addCase(checkChatInDb.fulfilled, (state, action) => {
      state.checkChatInDb = action.payload
    })
  },
})

export const { setFriendsUid, showChatMessages, setCommonChatUid } =
  chatSlice.actions

export default chatSlice.reducer
