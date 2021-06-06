import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import app from "firebase/app";

export interface IUserState {
  // TODO: type user properly
  authUser: any;
}

const initialState: IUserState = {
  authUser: null,
};

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
});

export const { setAuthUser, setUserLogOutState } = sessionSlice.actions;

export default sessionSlice.reducer;
