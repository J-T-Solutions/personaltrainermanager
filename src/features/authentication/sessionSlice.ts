import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firebaseInstance } from "../../components/Firebase";
import app from "firebase/app";
import { RootState } from "../../store";

export interface IUserState {
  authUser: app.auth.UserCredential | undefined | null;
}

const initialState: IUserState = {
  authUser: null,
};

export const signInUser = createAsyncThunk(
  "session/signIn",
  async (userCredentials: { email: string; password: string }) => {
    try {
      const user = await firebaseInstance.doSignInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      );
      return user;
    } catch (err) {
      console.log(err);
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<app.auth.UserCredential>) => {
      state.authUser = action.payload;
    },
    setUserLogOutState: (state) => {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.authUser = action.payload;
    });
  },
});

export const { setAuthUser, setUserLogOutState } = sessionSlice.actions;

export default sessionSlice.reducer;

export const selectAuthUser = (state: RootState) => state.session.authUser;
