import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { firebaseInstance } from '../../components/Firebase'
import app from 'firebase/app'
import { RootState } from '../../store'
import { AuthUser } from '../../interfaces'
import { Routes } from '../../constants/routes'

const history = createBrowserHistory()

export interface IUserState {
  authUser: app.auth.UserCredential | undefined | null
}

const initialState: IUserState = {
  authUser: null,
}

export const signInUser = createAsyncThunk(
  'session/signIn',
  async (userCredentials: { email: string; password: string }) => {
    try {
      const user = await firebaseInstance.doSignInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password,
      )
      return user
    } catch (err) {
      console.log(err)
    } finally {
      history.push(Routes.Account)
    }
  },
)

export const signOutUser = createAsyncThunk('session/signOut', async () => {
  try {
    return await firebaseInstance.doSignOut()
  } catch (err) {
    console.log(err)
  } finally {
    history.push(Routes.SingOut)
  }
})

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAuthUser: (
      state,
      action: PayloadAction<app.auth.UserCredential | null>,
    ) => {
      state.authUser = action.payload
    },
    setUserLogOutState: (state) => {
      state.authUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.authUser = action.payload
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.authUser = null
      })
  },
})

export const { setAuthUser, setUserLogOutState } = sessionSlice.actions

export default sessionSlice.reducer

export const selectAuthUser = (state: RootState): AuthUser | undefined | null =>
  state.session.authUser
