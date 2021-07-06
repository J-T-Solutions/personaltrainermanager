import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firebaseInstance } from '../../components/Firebase'
import { RootState } from '../../store'
import { AuthUser } from '../../interfaces'
import { IDbUser, IUserCredentials, ICreateUserPayload } from './interfaces'

export interface IUserState {
  authUser: AuthUser | null
  friendsList: any
}

const initialState: IUserState = {
  authUser: null,
  friendsList: {},
}

export const createUser = createAsyncThunk(
  'session/createUser',
  async (user: IDbUser) => {
    await firebaseInstance.user(user.uid).set({
      firstName: user.firstName,
      email: user.email,
      role: user.role,
    })
  },
)

export const getListOfFriends = createAsyncThunk(
  'session/getListOfFriends',
  async (authUser: AuthUser) => {
    const list = await firebaseInstance
      .friends(authUser.uid)
      .once('value', (snapshot) => snapshot.val())
    return list.val()
  },
)

export const signUpUser = createAsyncThunk(
  'session/signUp',
  async (userCredentials: ICreateUserPayload, { dispatch }) => {
    const { user } = await firebaseInstance.doCreateUserWithEmailAndPassword(
      userCredentials.email,
      userCredentials.password,
    )

    if (user) {
      const dbUserPayload: IDbUser = {
        ...userCredentials,
        uid: user.uid,
      }
      dispatch(createUser(dbUserPayload))
    }

    return user
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
    // TODO: implement creating dbUSer for googleAuth
    // if (user) {
    //   dispatch(createUser(user))
    // }
    return user
  },
)

export const signInWithFacebook = createAsyncThunk(
  'session/signInWithFacebook',
  async (param, { dispatch }) => {
    const { user } = await firebaseInstance.doSignInWithFacebook()
    // TODO: implement creating dbUSer for facebookAuth
    // if (user) {
    //   dispatch(createUser(user))
    // }
    return user
  },
)

export const signOutUser = createAsyncThunk('session/signOut', async () => {
  return await firebaseInstance.doSignOut()
})

export const resetPassword = createAsyncThunk(
  'session/passwordReset',
  async (email: string) => {
    return await firebaseInstance.doPasswordReset(email)
  },
)

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
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.authUser = action.payload as AuthUser
      })
      // .addCase(createUser.fulfilled, (state, action) => {
      //   state.authUser = action.payload as AuthUser
      // })
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
      .addCase(getListOfFriends.fulfilled, (state, action) => {
        state.friendsList = action.payload
      })
  },
})

export const { setAuthUser, setUserLogOutState } = sessionSlice.actions

export default sessionSlice.reducer

export const selectAuthUser = (state: RootState): AuthUser | null =>
  state.session.authUser
