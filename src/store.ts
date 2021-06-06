import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./features/authentication/sessionSlice";

export const store = configureStore({
  reducer: {
    authUser: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
