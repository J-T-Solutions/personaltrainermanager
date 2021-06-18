import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { firebaseInstance } from '../../components/Firebase'
import { RootState } from '../../store'
import { AuthUser } from '../../interfaces'
import { Routes } from '../../constants/routes'

const history = createBrowserHistory()

interface IUserCredentials {
  email: string
  password: string
}
export interface IUserState {
  authUser: AuthUser | null
}

const initialState: IUserState = {
  authUser: null,
}

export const createUser = createAsyncThunk(
  'session/createUser',
  async (user: AuthUser) => {
    return firebaseInstance.user(user.uid).set({
      username: user.displayName,
      email: user.email,
      roles: {},
    })
  },
)

export const signInUser = createAsyncThunk(
  'session/signIn',
  async (userCredentials: IUserCredentials) => {
    const { user } = await firebaseInstance.doSignInWithEmailAndPassword(
      userCredentials.email,
      userCredentials.password,
    )
    return user
  },
)

export const signInWithGoogle = createAsyncThunk(
  'session/signInWithGoogle',
  async (param, { dispatch }) => {
    const { user } = await firebaseInstance.doSignInWithGoogle()
    if (user) {
      dispatch(createUser(user))
    }
    return user
  },
)

export const signInWithFacebook = createAsyncThunk(
  'session/signInWithFacebook',
  async (param, { dispatch }) => {
    const { user } = await firebaseInstance.doSignInWithFacebook()
    if (user) {
      dispatch(createUser(user))
    }
    return user
  },
)

export const signOutUser = createAsyncThunk('session/signOut', async () => {
  try {
    return await firebaseInstance.doSignOut()
  } catch (err) {
    console.log(err)
  } finally {
    history.push(Routes.SignIn)
  }
})

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload
    },
    setUserLogOutState: (state) => {
      state.authUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      // user signing
      .addCase(signInUser.fulfilled, (state, action) => {
        state.authUser = action.payload as AuthUser
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.authUser = action.payload as AuthUser
      })
      .addCase(signInWithFacebook.fulfilled, (state, action) => {
        state.authUser = action.payload as AuthUser
      })
      .addCase(signInWithGoogle.rejected, () => {
        // TODO: throw error or rejected action
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.authUser = null
      })
      // createUser
      .addCase(createUser.rejected, () => {
        // TODO: throw error or rejected action
      })
  },
})

export const { setAuthUser, setUserLogOutState } = sessionSlice.actions

export default sessionSlice.reducer

export const selectAuthUser = (state: RootState): AuthUser | null =>
  state.session.authUser
