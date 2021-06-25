import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firebaseInstance } from '../../components/Firebase'
import { RootState } from '../../store'
import { AuthUser } from '../../interfaces'

interface IUserCredentials {
  firstName: string
  email: string
  password: string
  role: string
}

interface IDbUser extends IUserCredentials {
  uid: string
}

export interface IUserState {
  authUser: AuthUser | null
}

const initialState: IUserState = {
  authUser: null,
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

export const signUpUser = createAsyncThunk(
  'session/signUp',
  async (userCredentials: IUserCredentials, { dispatch }) => {
    const { user } = await firebaseInstance.doCreateUserWithEmailAndPassword(
      userCredentials.email,
      userCredentials.password,
    )
    const dbUserPayload: IDbUser = {
      ...userCredentials,
      uid: user!.uid,
    }

    dispatch(createUser(dbUserPayload))
    console.log('###USER', user)
    return user
  },
)

export const signInUser = createAsyncThunk(
  'session/signIn',
  async (userCredentials: any) => {
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
  },
})

export const { setAuthUser, setUserLogOutState } = sessionSlice.actions

export default sessionSlice.reducer

export const selectAuthUser = (state: RootState): AuthUser | null =>
  state.session.authUser
